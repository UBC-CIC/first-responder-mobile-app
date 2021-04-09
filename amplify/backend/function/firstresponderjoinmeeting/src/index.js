// TODO put this shared code into a lambda layer
var AWS = require("aws-sdk");
var ddb = new AWS.DynamoDB();
const chime = new AWS.Chime({ region: "us-east-1" });
chime.endpoint = new AWS.Endpoint(
  "https://service.chime.aws.amazon.com/console"
);

const oneDayFromNow = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

// Read resource names from the environment
const meetingsTableName = process.env.MEETINGS_TABLE_NAME;
const attendeesTableName = process.env.ATTENDEES_TABLE_NAME;

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const doesAttendeeExistInMeeting = async (meetingId, attendeeId) => {
  const result = await ddb
    .getItem({
      TableName: "meeting-detail",
      Key: {
        meeting_id: {
          S: meetingId,
        },
      },
    })
    .promise();
  if (!result.Item) return false;
  if (!result.Item.attendees) return false;
  const attendees = AWS.DynamoDB.Converter.output(result.Item.attendees);
  console.log(attendees);
  const match = attendees.find(
    (attendee) => attendee.attendee_id === attendeeId
  );
  if (match) return true;
  return false;
};

const getMeeting = async (meetingId) => {
  const result = await ddb
    .getItem({
      TableName: meetingsTableName,
      Key: {
        id: {
          S: meetingId,
        },
      },
    })
    .promise();
  if (!result.Item) {
    return null;
  }
  let meetingData = result.Item;
  const mid = meetingData.MeetingId.S;
  console.log("DATA:", mid);
  try {
    meetingData = await chime
      .getMeeting({
        MeetingId: mid,
      })
      .promise();
  } catch (err) {
    return null;
  }
  console.log("Joining existing meeting, id: ", meetingData.Meeting.MeetingId);
  return meetingData;
};

const appendAttendeeList = async (
  meetingInfo,
  phoneNumber,
  attendeeId,
  attendeeType,
  firstName,
  lastName,
  role,
  organization
) => {
  const { Meeting } = meetingInfo;
  const alreadyExists = await doesAttendeeExistInMeeting(
    Meeting.MeetingId,
    attendeeId
  );
  if (alreadyExists) return;
  if (!organization) organization = "";
  const attendee = {
    M: {
      attendee_id: { S: attendeeId },
      phone_number: { S: phoneNumber },
      attendee_type: { S: attendeeType },
      attendee_join_type: { S: "DATA" },
      first_name: { S: firstName },
      last_name: { S: lastName },
      user_role: { S: role },
      organization: { S: organization },
    },
  };

  let p1 = ddb
    .updateItem({
      TableName: "meeting-detail",
      Key: { meeting_id: { S: Meeting.MeetingId } },
      ReturnValues: "ALL_NEW",
      UpdateExpression:
        "set #attendees = list_append(if_not_exists(#attendees, :empty_list), :attendee)",
      ExpressionAttributeNames: {
        "#attendees": "attendees",
      },
      ExpressionAttributeValues: {
        ":attendee": { L: [attendee] },
        ":empty_list": { L: [] },
      },
    })
    .promise();

  let p2 = ddb
    .updateItem({
      TableName: "meeting-detail",
      Key: { meeting_id: { S: Meeting.MeetingId } },
      ReturnValues: "ALL_NEW",
      UpdateExpression:
        "set #create_date_time = if_not_exists(#create_date_time, :now)",
      ExpressionAttributeNames: {
        "#create_date_time": "create_date_time",
      },
      ExpressionAttributeValues: {
        ":now": { S: new Date(Date.now()).toISOString() },
      },
    })
    .promise();

  let p3 = ddb
    .updateItem({
      TableName: "meeting-detail",
      Key: { meeting_id: { S: Meeting.MeetingId } },
      ReturnValues: "ALL_NEW",
      UpdateExpression:
        "set #meeting_status = if_not_exists(#meeting_status, :active)",
      ExpressionAttributeNames: {
        "#meeting_status": "meeting_status",
      },
      ExpressionAttributeValues: {
        ":active": { S: "ACTIVE" },
      },
    })
    .promise();

  await Promise.all([p1, p2, p3]);
};

const putMeeting = async (title, meetingInfo, phoneNumber, attendeeId) => {
  const { Meeting } = meetingInfo;
  console.log("NUMBER: ", phoneNumber);
  await ddb
    .putItem({
      TableName: meetingsTableName,
      Item: {
        id: { S: Meeting.MeetingId },
        MeetingId: { S: Meeting.MeetingId },
        ExternalMeetingId: { S: title },
        MediaRegion: { S: Meeting.MediaRegion },
        MediaPlacement: { S: JSON.stringify(Meeting.MediaPlacement) },
        TTL: {
          N: "" + oneDayFromNow,
        },
        phoneNumber: { S: phoneNumber },
      },
    })
    .promise();
};

const getAttendee = async (title, attendeeId) => {
  const result = await ddb
    .getItem({
      TableName: attendeesTableName,
      Key: {
        id: {
          S: `${attendeeId}`,
        },
      },
    })
    .promise();
  if (!result.Item) {
    return "Unknown";
  }
  return result.Item.name.S;
};

const putAttendee = async (title, attendeeId, name, meetingID, role) => {
  await ddb
    .putItem({
      TableName: attendeesTableName,
      Item: {
        id: {
          S: `${attendeeId}`,
        },
        createdAt: {
          N: "" + Date.now(),
        },
        updatedAt: {
          N: "" + Date.now(),
        },
        name: { S: name },
        meetingID: { S: meetingID },
        role: { S: role },
        TTL: {
          N: "" + oneDayFromNow,
        },
      },
    })
    .promise();
};

exports.handler = async (event, context, callback) => {
  const {
    title,
    firstName,
    lastName,
    role,
    externalAttendeeId,
    region = "ca-central-1",
    phoneNumber,
    attendeeType,
    organization = "",
  } = event.arguments;

  console.log("Unique Meeting ID: ", title);
  let meetingInfo = await getMeeting(title);
  if (!meetingInfo) {
    const request = {
      ClientRequestToken: uuid(),
      MediaRegion: region,
    };
    console.info("Creating new meeting: " + JSON.stringify(request));
    meetingInfo = await chime.createMeeting(request).promise();
    await putMeeting(title, meetingInfo, phoneNumber);
  }

  console.info("Adding new attendee");
  const attendeeInfo = await chime
    .createAttendee({
      MeetingId: meetingInfo.Meeting.MeetingId,
      ExternalUserId: externalAttendeeId,
    })
    .promise();

  const name = firstName + " " + lastName;

  await putAttendee(
    title,
    attendeeInfo.Attendee.AttendeeId,
    name,
    meetingInfo.Meeting.MeetingId,
    role
  );
  await appendAttendeeList(
    meetingInfo,
    phoneNumber,
    attendeeInfo.Attendee.AttendeeId,
    attendeeType,
    firstName,
    lastName,
    role,
    organization
  );

  const joinInfo = {
    id: title,
    Meeting: meetingInfo.Meeting,
    Attendee: attendeeInfo.Attendee,
  };

  return joinInfo;
};
