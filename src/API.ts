/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateFirstResponderProfileInput = {
  first_name?: string | null,
  last_name?: string | null,
  occupation?: string | null,
  phone_number: string,
};

export type FirstResponderProfile = {
  __typename: "FirstResponderProfile",
  first_name?: string | null,
  last_name?: string | null,
  occupation?: string | null,
  phone_number?: string,
};

export type CreateSpecialistProfileInput = {
  availability?: string | null,
  created_date_time?: string | null,
  email?: string | null,
  first_name?: string | null,
  is_paged?: boolean | null,
  last_name?: string | null,
  notes?: string | null,
  organization?: string | null,
  phone_number: string,
  profile_picture?: string | null,
  updated_date_time?: string | null,
  user_role?: string | null,
  user_status?: string | null,
};

export type SpecialistProfile = {
  __typename: "SpecialistProfile",
  availability?: Availability,
  created_date_time?: string | null,
  email?: string | null,
  first_name?: string | null,
  is_paged?: boolean | null,
  last_name?: string | null,
  notes?: string | null,
  organization?: string | null,
  phone_number?: string,
  profile_picture?: string | null,
  updated_date_time?: string | null,
  user_role?: string | null,
  user_status?: string | null,
  location?: GeolocationCoordinates,
};

export type Availability = {
  __typename: "Availability",
  overrides?:  Array<Override | null > | null,
  schedules?:  Array<Schedule | null > | null,
};

export type Override = {
  __typename: "Override",
  end_time?: string | null,
  override_type?: string | null,
  start_time?: string | null,
};

export type Schedule = {
  __typename: "Schedule",
  availability_type?: string | null,
  day_of_week?: number | null,
  end_seconds_since_midnight?: number | null,
  start_seconds_since_midnight?: number | null,
  timezone?: string | null,
};

export type GeolocationCoordinates = {
  __typename: "GeolocationCoordinates",
  latitude?: number | null,
  longitude?: number | null,
};

export type DeleteFirstResponderProfileInput = {
  phone_number: string,
};

export type DeleteSpecialistProfileInput = {
  phone_number: string,
};

export type GeolocationCoordinatesInput = {
  latitude?: number | null,
  longitude?: number | null,
};

export type MeetingInfo = {
  __typename: "MeetingInfo",
  Attendee?: AttendeeInfo,
  Meeting?: MeetingData,
  id?: string,
};

export type AttendeeInfo = {
  __typename: "AttendeeInfo",
  AttendeeId?: string | null,
  ExternalUserId?: string | null,
  JoinToken?: string | null,
};

export type MeetingData = {
  __typename: "MeetingData",
  MeetingId?: string,
  ExternalMeetingId?: string | null,
  MediaPlacement?: MediaPlacement,
  MediaRegion?: string,
};

export type MediaPlacement = {
  __typename: "MediaPlacement",
  AudioFallbackUrl?: string | null,
  AudioHostUrl?: string | null,
  ScreenDataUrl?: string | null,
  ScreenSharingUrl?: string | null,
  ScreenViewingUrl?: string | null,
  SignalingUrl?: string | null,
  TurnControlUrl?: string | null,
};

export type UpdateFirstResponderProfileInput = {
  first_name?: string | null,
  last_name?: string | null,
  occupation?: string | null,
  phone_number: string,
};

export type UpdateSpecialistProfileInput = {
  availability?: string | null,
  created_date_time?: string | null,
  email?: string | null,
  first_name?: string | null,
  is_paged?: boolean | null,
  last_name?: string | null,
  notes?: string | null,
  organization?: string | null,
  phone_number: string,
  profile_picture?: string | null,
  updated_date_time?: string | null,
  user_role?: string | null,
  user_status?: string | null,
  location?: string | null,
};

export type CreateMeetingInput = {
  id: string,
};

export type Meeting = {
  __typename: "Meeting",
  id?: string,
  ExternalMeetingId?: string | null,
  MediaPlacement?: MediaPlacement,
  MediaRegion?: string,
  MeetingId?: string,
};

export type UpdateMeetingInput = {
  id: string,
};

export type DeleteMeetingInput = {
  id: string,
};

export type CreateAttendeeDataInput = {
  id: string,
  externalUserId?: string | null,
  meetingID?: string | null,
  name?: string | null,
  role?: string | null,
};

export type AttendeeData = {
  __typename: "AttendeeData",
  id?: string,
  externalUserId?: string | null,
  meetingID?: string | null,
  name?: string | null,
  role?: string | null,
};

export type UpdateAttendeeDataInput = {
  id: string,
  externalUserId?: string | null,
  meetingID?: string | null,
  name?: string | null,
  role?: string | null,
};

export type DeleteAttendeeDataInput = {
  id: string,
};

export type CreateMeetingDetailInput = {
  meeting_id: string,
  create_date_time?: string | null,
  meeting_status?: string | null,
  end_date_time?: string | null,
};

export type MeetingDetail = {
  __typename: "MeetingDetail",
  meeting_id?: string,
  create_date_time?: string | null,
  meeting_status?: string | null,
  end_date_time?: string | null,
  external_meeting_id?: string | null,
  meeting_comments?: string | null,
  meeting_title?: string | null,
  attendees?:  Array<AttendeeDetail > | null,
};

export type AttendeeDetail = {
  __typename: "AttendeeDetail",
  attendee_id?: string,
  attendee_join_type?: string | null,
  attendee_type?: string | null,
  first_name?: string | null,
  last_name?: string | null,
  phone_number?: string,
  user_role?: string | null,
  organization?: string | null,
};

export type UpdateMeetingDetailInput = {
  meeting_id: string,
  create_date_time?: string | null,
  meeting_status?: string | null,
  end_date_time?: string | null,
};

export type DeleteMeetingDetailInput = {
  meeting_id: string,
};

export type TableFirstResponderProfileFilterInput = {
  first_name?: TableStringFilterInput | null,
  last_name?: TableStringFilterInput | null,
  occupation?: TableStringFilterInput | null,
  phone_number?: TableStringFilterInput | null,
};

export type TableStringFilterInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
};

export type FirstResponderProfileConnection = {
  __typename: "FirstResponderProfileConnection",
  items?:  Array<FirstResponderProfile | null > | null,
  nextToken?: string | null,
};

export type TableSpecialistProfileFilterInput = {
  availability?: string | null,
  created_date_time?: TableStringFilterInput | null,
  email?: TableStringFilterInput | null,
  first_name?: TableStringFilterInput | null,
  is_paged?: TableBooleanFilterInput | null,
  last_name?: TableStringFilterInput | null,
  notes?: TableStringFilterInput | null,
  organization?: TableStringFilterInput | null,
  phone_number?: TableStringFilterInput | null,
  profile_picture?: TableStringFilterInput | null,
  updated_date_time?: TableStringFilterInput | null,
  user_role?: TableStringFilterInput | null,
  user_status?: TableStringFilterInput | null,
};

export type TableBooleanFilterInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type SpecialistProfileConnection = {
  __typename: "SpecialistProfileConnection",
  items?:  Array<SpecialistProfile | null > | null,
  nextToken?: string | null,
};

export type TableMeetingFilterInput = {
  id?: TableStringFilterInput | null,
};

export type MeetingConnection = {
  __typename: "MeetingConnection",
  items?:  Array<Meeting | null > | null,
  nextToken?: string | null,
};

export type TableAttendeeDataFilterInput = {
  id?: TableStringFilterInput | null,
  externalUserId?: TableStringFilterInput | null,
  meetingID?: TableStringFilterInput | null,
  name?: TableStringFilterInput | null,
  role?: TableStringFilterInput | null,
};

export type AttendeeDataConnection = {
  __typename: "AttendeeDataConnection",
  items?:  Array<AttendeeData | null > | null,
  nextToken?: string | null,
};

export type TableMeetingDetailFilterInput = {
  meeting_id?: TableStringFilterInput | null,
  create_date_time?: TableStringFilterInput | null,
  meeting_status?: TableStringFilterInput | null,
  end_date_time?: TableStringFilterInput | null,
};

export type MeetingDetailConnection = {
  __typename: "MeetingDetailConnection",
  items?:  Array<MeetingDetail | null > | null,
  nextToken?: string | null,
};

export type CreateFirstResponderProfileMutationVariables = {
  input?: CreateFirstResponderProfileInput,
};

export type CreateFirstResponderProfileMutation = {
  createFirstResponderProfile?:  {
    __typename: "FirstResponderProfile",
    first_name?: string | null,
    last_name?: string | null,
    occupation?: string | null,
    phone_number: string,
  } | null,
};

export type CreateSpecialistProfileMutationVariables = {
  input?: CreateSpecialistProfileInput,
};

export type CreateSpecialistProfileMutation = {
  createSpecialistProfile?:  {
    __typename: "SpecialistProfile",
    created_date_time?: string | null,
    email?: string | null,
    first_name?: string | null,
    is_paged?: boolean | null,
    last_name?: string | null,
    notes?: string | null,
    organization?: string | null,
    phone_number: string,
    profile_picture?: string | null,
    updated_date_time?: string | null,
    user_role?: string | null,
    user_status?: string | null,
    location?:  {
      __typename: "GeolocationCoordinates",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
  } | null,
};

export type DeleteFirstResponderProfileMutationVariables = {
  input?: DeleteFirstResponderProfileInput,
};

export type DeleteFirstResponderProfileMutation = {
  deleteFirstResponderProfile?:  {
    __typename: "FirstResponderProfile",
    first_name?: string | null,
    last_name?: string | null,
    occupation?: string | null,
    phone_number: string,
  } | null,
};

export type DeleteSpecialistProfileMutationVariables = {
  input?: DeleteSpecialistProfileInput,
};

export type DeleteSpecialistProfileMutation = {
  deleteSpecialistProfile?:  {
    __typename: "SpecialistProfile",
    created_date_time?: string | null,
    email?: string | null,
    first_name?: string | null,
    is_paged?: boolean | null,
    last_name?: string | null,
    notes?: string | null,
    organization?: string | null,
    phone_number: string,
    profile_picture?: string | null,
    updated_date_time?: string | null,
    user_role?: string | null,
    user_status?: string | null,
    location?:  {
      __typename: "GeolocationCoordinates",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
  } | null,
};

export type JoinChimeMeetingMutationVariables = {
  externalAttendeeId?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  phoneNumber?: string | null,
  region?: string | null,
  role?: string | null,
  title?: string | null,
  attendeeType?: string | null,
  organization?: string | null,
  location?: GeolocationCoordinatesInput | null,
};

export type JoinChimeMeetingMutation = {
  joinChimeMeeting?:  {
    __typename: "MeetingInfo",
    Attendee?:  {
      __typename: "AttendeeInfo",
      AttendeeId?: string | null,
      ExternalUserId?: string | null,
      JoinToken?: string | null,
    } | null,
    Meeting:  {
      __typename: "MeetingData",
      MeetingId: string,
      ExternalMeetingId?: string | null,
      MediaRegion: string,
    },
    id: string,
  } | null,
};

export type UpdateFirstResponderProfileMutationVariables = {
  input?: UpdateFirstResponderProfileInput,
};

export type UpdateFirstResponderProfileMutation = {
  updateFirstResponderProfile?:  {
    __typename: "FirstResponderProfile",
    first_name?: string | null,
    last_name?: string | null,
    occupation?: string | null,
    phone_number: string,
  } | null,
};

export type UpdateSpecialistProfileMutationVariables = {
  input?: UpdateSpecialistProfileInput,
};

export type UpdateSpecialistProfileMutation = {
  updateSpecialistProfile?:  {
    __typename: "SpecialistProfile",
    created_date_time?: string | null,
    email?: string | null,
    first_name?: string | null,
    is_paged?: boolean | null,
    last_name?: string | null,
    notes?: string | null,
    organization?: string | null,
    phone_number: string,
    profile_picture?: string | null,
    updated_date_time?: string | null,
    user_role?: string | null,
    user_status?: string | null,
    location?:  {
      __typename: "GeolocationCoordinates",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
  } | null,
};

export type CreateMeetingMutationVariables = {
  input?: CreateMeetingInput,
};

export type CreateMeetingMutation = {
  createMeeting?:  {
    __typename: "Meeting",
    id: string,
    ExternalMeetingId?: string | null,
    MediaPlacement?:  {
      __typename: "MediaPlacement",
      AudioFallbackUrl?: string | null,
      AudioHostUrl?: string | null,
      ScreenDataUrl?: string | null,
      ScreenSharingUrl?: string | null,
      ScreenViewingUrl?: string | null,
      SignalingUrl?: string | null,
      TurnControlUrl?: string | null,
    } | null,
    MediaRegion: string,
    MeetingId: string,
  } | null,
};

export type UpdateMeetingMutationVariables = {
  input?: UpdateMeetingInput,
};

export type UpdateMeetingMutation = {
  updateMeeting?:  {
    __typename: "Meeting",
    id: string,
    ExternalMeetingId?: string | null,
    MediaPlacement?:  {
      __typename: "MediaPlacement",
      AudioFallbackUrl?: string | null,
      AudioHostUrl?: string | null,
      ScreenDataUrl?: string | null,
      ScreenSharingUrl?: string | null,
      ScreenViewingUrl?: string | null,
      SignalingUrl?: string | null,
      TurnControlUrl?: string | null,
    } | null,
    MediaRegion: string,
    MeetingId: string,
  } | null,
};

export type DeleteMeetingMutationVariables = {
  input?: DeleteMeetingInput,
};

export type DeleteMeetingMutation = {
  deleteMeeting?:  {
    __typename: "Meeting",
    id: string,
    ExternalMeetingId?: string | null,
    MediaPlacement?:  {
      __typename: "MediaPlacement",
      AudioFallbackUrl?: string | null,
      AudioHostUrl?: string | null,
      ScreenDataUrl?: string | null,
      ScreenSharingUrl?: string | null,
      ScreenViewingUrl?: string | null,
      SignalingUrl?: string | null,
      TurnControlUrl?: string | null,
    } | null,
    MediaRegion: string,
    MeetingId: string,
  } | null,
};

export type CreateAttendeeDataMutationVariables = {
  input?: CreateAttendeeDataInput,
};

export type CreateAttendeeDataMutation = {
  createAttendeeData?:  {
    __typename: "AttendeeData",
    id: string,
    externalUserId?: string | null,
    meetingID?: string | null,
    name?: string | null,
    role?: string | null,
  } | null,
};

export type UpdateAttendeeDataMutationVariables = {
  input?: UpdateAttendeeDataInput,
};

export type UpdateAttendeeDataMutation = {
  updateAttendeeData?:  {
    __typename: "AttendeeData",
    id: string,
    externalUserId?: string | null,
    meetingID?: string | null,
    name?: string | null,
    role?: string | null,
  } | null,
};

export type DeleteAttendeeDataMutationVariables = {
  input?: DeleteAttendeeDataInput,
};

export type DeleteAttendeeDataMutation = {
  deleteAttendeeData?:  {
    __typename: "AttendeeData",
    id: string,
    externalUserId?: string | null,
    meetingID?: string | null,
    name?: string | null,
    role?: string | null,
  } | null,
};

export type CreateMeetingDetailMutationVariables = {
  input?: CreateMeetingDetailInput,
};

export type CreateMeetingDetailMutation = {
  createMeetingDetail?:  {
    __typename: "MeetingDetail",
    meeting_id: string,
    create_date_time?: string | null,
    meeting_status?: string | null,
    end_date_time?: string | null,
    external_meeting_id?: string | null,
    meeting_comments?: string | null,
    meeting_title?: string | null,
    attendees?:  Array< {
      __typename: "AttendeeDetail",
      attendee_id: string,
      attendee_join_type?: string | null,
      attendee_type?: string | null,
      first_name?: string | null,
      last_name?: string | null,
      phone_number: string,
      user_role?: string | null,
      organization?: string | null,
    } > | null,
  } | null,
};

export type UpdateMeetingDetailMutationVariables = {
  input?: UpdateMeetingDetailInput,
};

export type UpdateMeetingDetailMutation = {
  updateMeetingDetail?:  {
    __typename: "MeetingDetail",
    meeting_id: string,
    create_date_time?: string | null,
    meeting_status?: string | null,
    end_date_time?: string | null,
    external_meeting_id?: string | null,
    meeting_comments?: string | null,
    meeting_title?: string | null,
    attendees?:  Array< {
      __typename: "AttendeeDetail",
      attendee_id: string,
      attendee_join_type?: string | null,
      attendee_type?: string | null,
      first_name?: string | null,
      last_name?: string | null,
      phone_number: string,
      user_role?: string | null,
      organization?: string | null,
    } > | null,
  } | null,
};

export type DeleteMeetingDetailMutationVariables = {
  input?: DeleteMeetingDetailInput,
};

export type DeleteMeetingDetailMutation = {
  deleteMeetingDetail?:  {
    __typename: "MeetingDetail",
    meeting_id: string,
    create_date_time?: string | null,
    meeting_status?: string | null,
    end_date_time?: string | null,
    external_meeting_id?: string | null,
    meeting_comments?: string | null,
    meeting_title?: string | null,
    attendees?:  Array< {
      __typename: "AttendeeDetail",
      attendee_id: string,
      attendee_join_type?: string | null,
      attendee_type?: string | null,
      first_name?: string | null,
      last_name?: string | null,
      phone_number: string,
      user_role?: string | null,
      organization?: string | null,
    } > | null,
  } | null,
};

export type GenerateMeetingIdMutation = {
  generateMeetingId?: string | null,
};

export type GetFirstResponderProfileQueryVariables = {
  phone_number?: string,
};

export type GetFirstResponderProfileQuery = {
  getFirstResponderProfile?:  {
    __typename: "FirstResponderProfile",
    first_name?: string | null,
    last_name?: string | null,
    occupation?: string | null,
    phone_number: string,
  } | null,
};

export type GetSpecialistProfileQueryVariables = {
  phone_number?: string,
};

export type GetSpecialistProfileQuery = {
  getSpecialistProfile?:  {
    __typename: "SpecialistProfile",
    created_date_time?: string | null,
    email?: string | null,
    first_name?: string | null,
    is_paged?: boolean | null,
    last_name?: string | null,
    notes?: string | null,
    organization?: string | null,
    phone_number: string,
    profile_picture?: string | null,
    updated_date_time?: string | null,
    user_role?: string | null,
    user_status?: string | null,
    location?:  {
      __typename: "GeolocationCoordinates",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
  } | null,
};

export type ListFirstResponderProfilesQueryVariables = {
  filter?: TableFirstResponderProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFirstResponderProfilesQuery = {
  listFirstResponderProfiles?:  {
    __typename: "FirstResponderProfileConnection",
    items?:  Array< {
      __typename: "FirstResponderProfile",
      first_name?: string | null,
      last_name?: string | null,
      occupation?: string | null,
      phone_number: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListSpecialistProfilesQueryVariables = {
  filter?: TableSpecialistProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSpecialistProfilesQuery = {
  listSpecialistProfiles?:  {
    __typename: "SpecialistProfileConnection",
    items?:  Array< {
      __typename: "SpecialistProfile",
      created_date_time?: string | null,
      email?: string | null,
      first_name?: string | null,
      is_paged?: boolean | null,
      last_name?: string | null,
      notes?: string | null,
      organization?: string | null,
      phone_number: string,
      profile_picture?: string | null,
      updated_date_time?: string | null,
      user_role?: string | null,
      user_status?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type QuerySpecialistProfilesByUserStatusGsiQueryVariables = {
  after?: string | null,
  first?: number | null,
  user_status?: string,
};

export type QuerySpecialistProfilesByUserStatusGsiQuery = {
  querySpecialistProfilesByUserStatusGsi?:  {
    __typename: "SpecialistProfileConnection",
    items?:  Array< {
      __typename: "SpecialistProfile",
      created_date_time?: string | null,
      email?: string | null,
      first_name?: string | null,
      is_paged?: boolean | null,
      last_name?: string | null,
      notes?: string | null,
      organization?: string | null,
      phone_number: string,
      profile_picture?: string | null,
      updated_date_time?: string | null,
      user_role?: string | null,
      user_status?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetMeetingQueryVariables = {
  id?: string,
};

export type GetMeetingQuery = {
  getMeeting?:  {
    __typename: "Meeting",
    id: string,
    ExternalMeetingId?: string | null,
    MediaPlacement?:  {
      __typename: "MediaPlacement",
      AudioFallbackUrl?: string | null,
      AudioHostUrl?: string | null,
      ScreenDataUrl?: string | null,
      ScreenSharingUrl?: string | null,
      ScreenViewingUrl?: string | null,
      SignalingUrl?: string | null,
      TurnControlUrl?: string | null,
    } | null,
    MediaRegion: string,
    MeetingId: string,
  } | null,
};

export type ListMeetingsQueryVariables = {
  filter?: TableMeetingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMeetingsQuery = {
  listMeetings?:  {
    __typename: "MeetingConnection",
    items?:  Array< {
      __typename: "Meeting",
      id: string,
      ExternalMeetingId?: string | null,
      MediaRegion: string,
      MeetingId: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetAttendeeDataQueryVariables = {
  id?: string,
};

export type GetAttendeeDataQuery = {
  getAttendeeData?:  {
    __typename: "AttendeeData",
    id: string,
    externalUserId?: string | null,
    meetingID?: string | null,
    name?: string | null,
    role?: string | null,
  } | null,
};

export type ListAttendeeDataQueryVariables = {
  filter?: TableAttendeeDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAttendeeDataQuery = {
  listAttendeeData?:  {
    __typename: "AttendeeDataConnection",
    items?:  Array< {
      __typename: "AttendeeData",
      id: string,
      externalUserId?: string | null,
      meetingID?: string | null,
      name?: string | null,
      role?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetMeetingDetailQueryVariables = {
  meeting_id?: string,
};

export type GetMeetingDetailQuery = {
  getMeetingDetail?:  {
    __typename: "MeetingDetail",
    meeting_id: string,
    create_date_time?: string | null,
    meeting_status?: string | null,
    end_date_time?: string | null,
    external_meeting_id?: string | null,
    meeting_comments?: string | null,
    meeting_title?: string | null,
    attendees?:  Array< {
      __typename: "AttendeeDetail",
      attendee_id: string,
      attendee_join_type?: string | null,
      attendee_type?: string | null,
      first_name?: string | null,
      last_name?: string | null,
      phone_number: string,
      user_role?: string | null,
      organization?: string | null,
    } > | null,
  } | null,
};

export type ListMeetingDetailsQueryVariables = {
  filter?: TableMeetingDetailFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMeetingDetailsQuery = {
  listMeetingDetails?:  {
    __typename: "MeetingDetailConnection",
    items?:  Array< {
      __typename: "MeetingDetail",
      meeting_id: string,
      create_date_time?: string | null,
      meeting_status?: string | null,
      end_date_time?: string | null,
      external_meeting_id?: string | null,
      meeting_comments?: string | null,
      meeting_title?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type QueryMeetingDetailsByMeetingStatusGsiQueryVariables = {
  meeting_status?: string,
  first?: number | null,
  after?: string | null,
};

export type QueryMeetingDetailsByMeetingStatusGsiQuery = {
  queryMeetingDetailsByMeetingStatusGsi?:  {
    __typename: "MeetingDetailConnection",
    items?:  Array< {
      __typename: "MeetingDetail",
      meeting_id: string,
      create_date_time?: string | null,
      meeting_status?: string | null,
      end_date_time?: string | null,
      external_meeting_id?: string | null,
      meeting_comments?: string | null,
      meeting_title?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateFirstResponderProfileSubscriptionVariables = {
  first_name?: string | null,
  last_name?: string | null,
  occupation?: string | null,
  phone_number?: string | null,
};

export type OnCreateFirstResponderProfileSubscription = {
  onCreateFirstResponderProfile?:  {
    __typename: "FirstResponderProfile",
    first_name?: string | null,
    last_name?: string | null,
    occupation?: string | null,
    phone_number: string,
  } | null,
};

export type OnCreateSpecialistProfileSubscriptionVariables = {
  email?: string | null,
  first_name?: string | null,
  last_name?: string | null,
  phone_number?: string | null,
  user_status?: string | null,
};

export type OnCreateSpecialistProfileSubscription = {
  onCreateSpecialistProfile?:  {
    __typename: "SpecialistProfile",
    created_date_time?: string | null,
    email?: string | null,
    first_name?: string | null,
    is_paged?: boolean | null,
    last_name?: string | null,
    notes?: string | null,
    organization?: string | null,
    phone_number: string,
    profile_picture?: string | null,
    updated_date_time?: string | null,
    user_role?: string | null,
    user_status?: string | null,
    location?:  {
      __typename: "GeolocationCoordinates",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
  } | null,
};

export type OnDeleteFirstResponderProfileSubscriptionVariables = {
  first_name?: string | null,
  last_name?: string | null,
  occupation?: string | null,
  phone_number?: string | null,
};

export type OnDeleteFirstResponderProfileSubscription = {
  onDeleteFirstResponderProfile?:  {
    __typename: "FirstResponderProfile",
    first_name?: string | null,
    last_name?: string | null,
    occupation?: string | null,
    phone_number: string,
  } | null,
};

export type OnDeleteSpecialistProfileSubscriptionVariables = {
  email?: string | null,
  first_name?: string | null,
  last_name?: string | null,
  phone_number?: string | null,
  user_status?: string | null,
};

export type OnDeleteSpecialistProfileSubscription = {
  onDeleteSpecialistProfile?:  {
    __typename: "SpecialistProfile",
    created_date_time?: string | null,
    email?: string | null,
    first_name?: string | null,
    is_paged?: boolean | null,
    last_name?: string | null,
    notes?: string | null,
    organization?: string | null,
    phone_number: string,
    profile_picture?: string | null,
    updated_date_time?: string | null,
    user_role?: string | null,
    user_status?: string | null,
    location?:  {
      __typename: "GeolocationCoordinates",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
  } | null,
};

export type OnUpdateFirstResponderProfileSubscriptionVariables = {
  first_name?: string | null,
  last_name?: string | null,
  occupation?: string | null,
  phone_number?: string | null,
};

export type OnUpdateFirstResponderProfileSubscription = {
  onUpdateFirstResponderProfile?:  {
    __typename: "FirstResponderProfile",
    first_name?: string | null,
    last_name?: string | null,
    occupation?: string | null,
    phone_number: string,
  } | null,
};

export type OnUpdateSpecialistProfileSubscriptionVariables = {
  email?: string | null,
  first_name?: string | null,
  last_name?: string | null,
  phone_number?: string | null,
  user_status?: string | null,
};

export type OnUpdateSpecialistProfileSubscription = {
  onUpdateSpecialistProfile?:  {
    __typename: "SpecialistProfile",
    created_date_time?: string | null,
    email?: string | null,
    first_name?: string | null,
    is_paged?: boolean | null,
    last_name?: string | null,
    notes?: string | null,
    organization?: string | null,
    phone_number: string,
    profile_picture?: string | null,
    updated_date_time?: string | null,
    user_role?: string | null,
    user_status?: string | null,
    location?:  {
      __typename: "GeolocationCoordinates",
      latitude?: number | null,
      longitude?: number | null,
    } | null,
  } | null,
};

export type OnCreateMeetingSubscriptionVariables = {
  id?: string | null,
};

export type OnCreateMeetingSubscription = {
  onCreateMeeting?:  {
    __typename: "Meeting",
    id: string,
    ExternalMeetingId?: string | null,
    MediaPlacement?:  {
      __typename: "MediaPlacement",
      AudioFallbackUrl?: string | null,
      AudioHostUrl?: string | null,
      ScreenDataUrl?: string | null,
      ScreenSharingUrl?: string | null,
      ScreenViewingUrl?: string | null,
      SignalingUrl?: string | null,
      TurnControlUrl?: string | null,
    } | null,
    MediaRegion: string,
    MeetingId: string,
  } | null,
};

export type OnUpdateMeetingSubscriptionVariables = {
  id?: string | null,
};

export type OnUpdateMeetingSubscription = {
  onUpdateMeeting?:  {
    __typename: "Meeting",
    id: string,
    ExternalMeetingId?: string | null,
    MediaPlacement?:  {
      __typename: "MediaPlacement",
      AudioFallbackUrl?: string | null,
      AudioHostUrl?: string | null,
      ScreenDataUrl?: string | null,
      ScreenSharingUrl?: string | null,
      ScreenViewingUrl?: string | null,
      SignalingUrl?: string | null,
      TurnControlUrl?: string | null,
    } | null,
    MediaRegion: string,
    MeetingId: string,
  } | null,
};

export type OnDeleteMeetingSubscriptionVariables = {
  id?: string | null,
};

export type OnDeleteMeetingSubscription = {
  onDeleteMeeting?:  {
    __typename: "Meeting",
    id: string,
    ExternalMeetingId?: string | null,
    MediaPlacement?:  {
      __typename: "MediaPlacement",
      AudioFallbackUrl?: string | null,
      AudioHostUrl?: string | null,
      ScreenDataUrl?: string | null,
      ScreenSharingUrl?: string | null,
      ScreenViewingUrl?: string | null,
      SignalingUrl?: string | null,
      TurnControlUrl?: string | null,
    } | null,
    MediaRegion: string,
    MeetingId: string,
  } | null,
};

export type OnCreateAttendeeDataSubscriptionVariables = {
  id?: string | null,
  externalUserId?: string | null,
  meetingID?: string | null,
  name?: string | null,
  role?: string | null,
};

export type OnCreateAttendeeDataSubscription = {
  onCreateAttendeeData?:  {
    __typename: "AttendeeData",
    id: string,
    externalUserId?: string | null,
    meetingID?: string | null,
    name?: string | null,
    role?: string | null,
  } | null,
};

export type OnUpdateAttendeeDataSubscriptionVariables = {
  id?: string | null,
  externalUserId?: string | null,
  meetingID?: string | null,
  name?: string | null,
  role?: string | null,
};

export type OnUpdateAttendeeDataSubscription = {
  onUpdateAttendeeData?:  {
    __typename: "AttendeeData",
    id: string,
    externalUserId?: string | null,
    meetingID?: string | null,
    name?: string | null,
    role?: string | null,
  } | null,
};

export type OnDeleteAttendeeDataSubscriptionVariables = {
  id?: string | null,
  externalUserId?: string | null,
  meetingID?: string | null,
  name?: string | null,
  role?: string | null,
};

export type OnDeleteAttendeeDataSubscription = {
  onDeleteAttendeeData?:  {
    __typename: "AttendeeData",
    id: string,
    externalUserId?: string | null,
    meetingID?: string | null,
    name?: string | null,
    role?: string | null,
  } | null,
};

export type OnCreateMeetingDetailSubscriptionVariables = {
  meeting_id?: string | null,
  create_date_time?: string | null,
  meeting_status?: string | null,
  end_date_time?: string | null,
};

export type OnCreateMeetingDetailSubscription = {
  onCreateMeetingDetail?:  {
    __typename: "MeetingDetail",
    meeting_id: string,
    create_date_time?: string | null,
    meeting_status?: string | null,
    end_date_time?: string | null,
    external_meeting_id?: string | null,
    meeting_comments?: string | null,
    meeting_title?: string | null,
    attendees?:  Array< {
      __typename: "AttendeeDetail",
      attendee_id: string,
      attendee_join_type?: string | null,
      attendee_type?: string | null,
      first_name?: string | null,
      last_name?: string | null,
      phone_number: string,
      user_role?: string | null,
      organization?: string | null,
    } > | null,
  } | null,
};

export type OnUpdateMeetingDetailSubscription = {
  onUpdateMeetingDetail?:  {
    __typename: "MeetingDetail",
    meeting_id: string,
    create_date_time?: string | null,
    meeting_status?: string | null,
    end_date_time?: string | null,
    external_meeting_id?: string | null,
    meeting_comments?: string | null,
    meeting_title?: string | null,
    attendees?:  Array< {
      __typename: "AttendeeDetail",
      attendee_id: string,
      attendee_join_type?: string | null,
      attendee_type?: string | null,
      first_name?: string | null,
      last_name?: string | null,
      phone_number: string,
      user_role?: string | null,
      organization?: string | null,
    } > | null,
  } | null,
};

export type OnDeleteMeetingDetailSubscriptionVariables = {
  meeting_id?: string | null,
  create_date_time?: string | null,
  meeting_status?: string | null,
  end_date_time?: string | null,
};

export type OnDeleteMeetingDetailSubscription = {
  onDeleteMeetingDetail?:  {
    __typename: "MeetingDetail",
    meeting_id: string,
    create_date_time?: string | null,
    meeting_status?: string | null,
    end_date_time?: string | null,
    external_meeting_id?: string | null,
    meeting_comments?: string | null,
    meeting_title?: string | null,
    attendees?:  Array< {
      __typename: "AttendeeDetail",
      attendee_id: string,
      attendee_join_type?: string | null,
      attendee_type?: string | null,
      first_name?: string | null,
      last_name?: string | null,
      phone_number: string,
      user_role?: string | null,
      organization?: string | null,
    } > | null,
  } | null,
};
