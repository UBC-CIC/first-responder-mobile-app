import { RosterAttendeeType } from "amazon-chime-sdk-component-library-react/lib/types";
import { AttendeeInfo } from "./API";

export type CognitoUser = {
  Session: any;
  attributes: {
    email: string;
    email_verified: true;
    phone_number: string;
    phone_number_verified: false;
    sub: string;
  };
  authenticationFlowType: string;
  client: {
    endpoint: "https://cognito-idp.us-east-1.amazonaws.com/";
    fetchOptions: any;
  };
  keyPrefix: string;
  pool: any;
  signInUserSession: any;
  storage: any;
  userDataKey: string;
  username: string;
};


export type MeetingType = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  attendees?: any;
};

export type MeetingStateType = {
  meetingId: string;
  name: string;
  role: string;
  attendeeId: string;
};

export type AlertsStateType= {
  meetings?: MeetingType[];
}
export type AttendeeInfoType = AttendeeInfo & {name: string};

export type AttendeeType = RosterAttendeeType & { role: string };
