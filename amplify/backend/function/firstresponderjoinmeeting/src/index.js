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
  const match = attendees.find(
    (attendee) => attendee.attendee_id === attendeeId
  );
  if (match) return true;
  return false;
};


/* returns null if meeting with key meetingId does not exist, otherwise returns a Meeting from the meeting-data table */ 
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
  let formattedData = AWS.DynamoDB.Converter.unmarshall(meetingData);
  return formattedData;
};

const appendAttendeeList = async (
  meetingInfo,
  phoneNumber,
  attendeeId,
  attendeeType,
  firstName,
  lastName,
  role,
  organization,
  externalMeetingId
) => {
  const { Meeting } = meetingInfo;
  const alreadyExists = await doesAttendeeExistInMeeting(
    Meeting.MeetingId,
    attendeeId
  );
  if (alreadyExists) {
    console.info("Attendee already exists in call. Not adding new attendee.")
    return;
    }
    console.info("Adding new attendee");
  if (!organization) organization = "";
  const attendee = {
    M: {
      attendee_id: { S: attendeeId },
      phone_number: { S: phoneNumber },
      attendee_type: { S: attendeeType },
      attendee_state: { S: "IN_CALL" },
      attendee_join_type: { S: "DATA" },
      first_name: { S: firstName },
      last_name: { S: lastName },
      user_role: { S: role },
      organization: { S: organization },
    },
  };

  const updateParams = {
    TableName: "meeting-detail",
    Key: { meeting_id: { S: Meeting.MeetingId } },
    ReturnValues: "ALL_NEW",
    UpdateExpression:
        "set #attendees = list_append(if_not_exists(#attendees, :empty_list), :attendee), #create_date_time = if_not_exists(#create_date_time, :now), #meeting_status = if_not_exists(#meeting_status, :active), #external_meeting_id = if_not_exists(#external_meeting_id, :title)",
    ExpressionAttributeNames: {
        "#attendees": "attendees",
        "#create_date_time": "create_date_time",
        "#meeting_status": "meeting_status",
        "#external_meeting_id": "external_meeting_id",
      },
      ExpressionAttributeValues: {
        ":attendee": { L: [attendee] },
        ":empty_list": { L: [] },
        ":now": { S: new Date(Date.now()).toISOString() },
        ":active": { S: "ACTIVE" },
        ":title": { S: externalMeetingId },
      },
  }
  await ddb
    .updateItem(updateParams)
    .promise();
};

const putMeeting = async (externalMeetingId, meetingInfo, attendeeId) => {
  const { Meeting } = meetingInfo;
  await ddb
    .putItem({
      TableName: meetingsTableName,
      Item: {
        id: { S: externalMeetingId },
        MeetingId: { S: Meeting.MeetingId },
        MediaRegion: { S: Meeting.MediaRegion },
        MediaPlacement: { S: JSON.stringify(Meeting.MediaPlacement) },
        TTL: {
          N: "" + oneDayFromNow,
        },
      },
    })
    .promise();
};

exports.handler = async (event, context, callback) => {
  const {
    title, // externalMeetingId, unique 8 digits
    firstName, // Name for UI Display
    lastName, // ``
    role, // Role for UI Display
    externalAttendeeId,
    region = "ca-central-1",
    phoneNumber, 
    attendeeType, // Specialist, First Responder, Service Desk, Unknown
    organization = "", // Organization for Service Desk UI
  } = event.arguments;

  console.log("External Meeting ID: ", title);
  const meeting = await getMeeting(title);
  // If a meeting exists, join it.
  let meetingInfo;
  if (meeting) {
     try {
        meetingInfo = await chime.getMeeting({ MeetingId: meeting.MeetingId }).promise();
        console.log("Joining existing, valid chime meeting.")
     }
     catch(e) {
       console.log("Found meeting, but chime has expired it")
     }
  }
  // if it doesn't, create one.
  if (!meetingInfo) {
    const request = {
      ClientRequestToken: uuid(),
      MediaRegion: region,
      ExternalMeetingId: title,
    };
    console.info("No existing meeting found, creating a new one.");
    meetingInfo = await chime.createMeeting(request).promise();
    await putMeeting(title, meetingInfo);
  }
  
  console.log("Meeting Info: ", meetingInfo.Meeting);

  const attendeeInfo = await chime
    .createAttendee({
      MeetingId: meetingInfo.Meeting.MeetingId,
      ExternalUserId: externalAttendeeId,
    })
    .promise();

  const name = firstName + " " + lastName;

  await appendAttendeeList(
    meetingInfo, // Chime API Return Value
    phoneNumber,
    attendeeInfo.Attendee.AttendeeId, // Chime API Attendee ID
    attendeeType, // FIRST_RESPONDER, SPECIALIST, SERVICE_DESK, UNKNOWN, 
    firstName,
    lastName,
    role,
    organization,
    title
  );

  const joinInfo = {
    id: title,
    Meeting: meetingInfo.Meeting,
    Attendee: attendeeInfo.Attendee,
  };

  return joinInfo;
};
