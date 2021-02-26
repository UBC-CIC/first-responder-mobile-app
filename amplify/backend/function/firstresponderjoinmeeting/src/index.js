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

const putMeeting = async (title, meetingInfo) => {
  const { Meeting } = meetingInfo;
  await ddb
    .putItem({
      TableName: meetingsTableName,
      Item: {
        id: { S: title },
        MeetingId: { S: Meeting.MeetingId },
        ExternalMeetingId: { S: title },
        MediaRegion: { S: Meeting.MediaRegion },
        MediaPlacement: { S: JSON.stringify(Meeting.MediaPlacement) },
        TTL: {
          N: "" + oneDayFromNow,
        },
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
    name,
    role,
    externalAttendeeId,
    region = "us-east-1",
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
    await putMeeting(title, meetingInfo);
  }

  console.info("Adding new attendee");
  const attendeeInfo = await chime
    .createAttendee({
      MeetingId: meetingInfo.Meeting.MeetingId,
      ExternalUserId: externalAttendeeId,
    })
    .promise();

  await putAttendee(
    title,
    attendeeInfo.Attendee.AttendeeId,
    name,
    meetingInfo.Meeting.MeetingId,
    role
  );

  const joinInfo = {
    id: title,
    Meeting: meetingInfo.Meeting,
    Attendee: attendeeInfo.Attendee,
  };

  return joinInfo;
};
