/* eslint-disable @typescript-eslint/no-explicit-any */
import { RosterAttendeeType } from "amazon-chime-sdk-component-library-react/lib/types";
import { AttendeeInfo } from "./API";
import {CreatePhysicianProfileInput} from "./API";
import {CreateFirstResponderProfileInput} from "./API";

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
    endpoint: string;
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
  parent: string;
  offline?: boolean;
};

export type AlertsStateType= {
  meetings?: MeetingType[];
}
export type AttendeeInfoType = AttendeeInfo & {name: string};

export type AttendeeType = RosterAttendeeType & { role: string };

export type {CreatePhysicianProfileInput as PhysicianProfileType};

export type {CreateFirstResponderProfileInput as FirstResponderProfileType};

export enum ConnectionState {
  POOR,
  FAIR,
  GOOD,
  UNKNOWN
}

export type UserProfileType = {
  email: string,
  user_status?: string | null,
  first_name?: string | null,
  last_name?: string | null,
  phone_number?: string | null,
  user_role?: string | null,
  organization?: string | null,
  profile_picture?: string | null,
  notes?: string | null,
  is_paged?: boolean | null,
  availability?: string | null,
  created_date_time?: string | null,
  updated_date_time?: string | null,
  createdAt?: string,
  updatedAt?: string,
};