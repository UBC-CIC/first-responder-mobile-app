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
  console.log(result);
  const meetingData = result.Item;
  try {
    await chime
      .getMeeting({
        MeetingId: meetingData.Meeting.MeetingId,
      })
      .promise();
  } catch (err) {
    return null;
  }
  return meetingData;
};

const putMeeting = async (title, meetingInfo) => {
  const { Meeting } = meetingInfo;
  console.log("meetingId", Meeting);
  await ddb
    .putItem({
      TableName: meetingsTableName,
      Item: {
        id: { S: title },
        MeetingId: { S: Meeting.MeetingId },
        ExternalMeetingId: { S: Meeting.ExternalMeetingId || "" },
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
          S: `${title}/${attendeeId}`,
        },
      },
    })
    .promise();
  if (!result.Item) {
    return "Unknown";
  }
  return result.Item.Name.S;
};

const putAttendee = async (title, attendeeId, name) => {
  await ddb
    .putItem({
      TableName: attendeesTableName,
      Item: {
        id: {
          S: `${title}/${attendeeId}`,
        },
        Name: { S: name },
        TTL: {
          N: "" + oneDayFromNow,
        },
      },
    })
    .promise();
};

exports.handler = async (event, context, callback) => {
  const title = event.arguments.title;
  const name = event.arguments.name;
  const region = event.arguments.region || "us-east-1";
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

  console.log(meetingInfo);

  console.info("Adding new attendee");
  const attendeeInfo = await chime
    .createAttendee({
      MeetingId: meetingInfo.Meeting.MeetingId,
      ExternalUserId: uuid(),
    })
    .promise();

  putAttendee(title, attendeeInfo.Attendee.AttendeeId, name);

  const joinInfo = {
    id: title,
    Meeting: meetingInfo.Meeting,
    Attendee: attendeeInfo.Attendee,
  };

  return joinInfo;
};
