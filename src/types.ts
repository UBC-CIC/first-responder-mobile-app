/* eslint-disable @typescript-eslint/no-explicit-any */
import { RosterAttendeeType } from "amazon-chime-sdk-component-library-react/lib/types";
import { AttendeeInfo, CreateFirstResponderProfileInput, CreateSpecialistProfileInput } from "./API";

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

export type { CreateSpecialistProfileInput as SpecialistProfileType };

export type { CreateFirstResponderProfileInput as FirstResponderProfileType };

// eslint-disable-next-line no-shadow
export enum ConnectionState {
  POOR,
  FAIR,
  GOOD,
  UNKNOWN
}

export type UserAvalabilityOverride = {
    "start_time": string; // ISO8601 formatted time (e.g. "2020-01-04T00:23:00Z")
    "end_time": string; // ISO8601 formatted time (e.g. "2020-01-04T00:23:00Z")
    "override_type": UserStatus;
};

export type UserAvalabilitySchedule = {
    "day_of_week": number; // day of week can be 0-6, where 0 is Sunday, 1 is Monday, etc..
    "start_seconds_since_midnight": number; // e.g. 3660 = 01:01:00 since midnight
    "end_seconds_since_midnight": number; // e.g. 3660 = 01:01:00 since midnight
    "timezone": string, // the IANA formated timezone (e.g. "America/Vancouver")
    "availability_type": UserStatus;
};

export type UserAvailability = {
    "overrides": Array<UserAvalabilityOverride>;
    "schedules": Array<UserAvalabilitySchedule>;
};

// eslint-disable-next-line no-shadow
export enum UserStatus {
    AVAILABLE = "AVAILABLE", // User is available per their schedule
    NOT_AVAILABLE = "NOT_AVAILABLE", // User is not available per their schedule
    OFFLINE = "OFFLINE", // User has manually went offline
}

export type FullAvailabilityType = {
  overrides: any;
  schedules: FormattedTimeBlock[];
}

export type FormattedTimeBlock = {
  availability_type: AVAILABILITY_TYPE;
  day_of_week: number;
  end_seconds_since_midnight:number;
  start_seconds_since_midnight:number;
  timezone: string;
};

export type AVAILABILITY_TYPE =
  "NOT_AVAILABLE" |
  "AVAILABLE"
