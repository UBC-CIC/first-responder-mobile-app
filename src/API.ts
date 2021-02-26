/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type JoinInfo = {
  __typename: "JoinInfo",
  id?: string,
  Meeting?: MeetingData,
  Attendee?: AttendeeInfo,
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
  AudioHostUrl?: string,
  AudioFallbackUrl?: string,
  ScreenDataUrl?: string,
  ScreenSharingUrl?: string,
  ScreenViewingUrl?: string,
  SignalingUrl?: string,
  TurnControlUrl?: string,
};

export type AttendeeInfo = {
  __typename: "AttendeeInfo",
  ExternalUserId?: string | null,
  AttendeeId?: string | null,
  JoinToken?: string | null,
};

export type CreateMeetingInput = {
  id?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelMeetingConditionInput = {
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMeetingConditionInput | null > | null,
  or?: Array< ModelMeetingConditionInput | null > | null,
  not?: ModelMeetingConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Meeting = {
  __typename: "Meeting",
  id?: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UpdateMeetingInput = {
  id: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteMeetingInput = {
  id?: string | null,
};

export type CreateAttendeeInput = {
  id?: string | null,
  name: string,
  externalUserId?: string | null,
  meetingID: string,
  role: string,
};

export type ModelAttendeeConditionInput = {
  name?: ModelStringInput | null,
  externalUserId?: ModelStringInput | null,
  meetingID?: ModelIDInput | null,
  role?: ModelStringInput | null,
  and?: Array< ModelAttendeeConditionInput | null > | null,
  or?: Array< ModelAttendeeConditionInput | null > | null,
  not?: ModelAttendeeConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Attendee = {
  __typename: "Attendee",
  id?: string,
  name?: string,
  externalUserId?: string | null,
  meetingID?: string,
  role?: string,
};

export type UpdateAttendeeInput = {
  id: string,
  name?: string | null,
  externalUserId?: string | null,
  meetingID?: string | null,
  role?: string | null,
};

export type DeleteAttendeeInput = {
  id?: string | null,
};

export type CreatePhysicianProfileInput = {
  id?: string | null,
  FirstName: string,
  LastName: string,
  Organization?: string | null,
  Occupation?: string | null,
};

export type ModelPhysicianProfileConditionInput = {
  FirstName?: ModelStringInput | null,
  LastName?: ModelStringInput | null,
  Organization?: ModelStringInput | null,
  Occupation?: ModelStringInput | null,
  and?: Array< ModelPhysicianProfileConditionInput | null > | null,
  or?: Array< ModelPhysicianProfileConditionInput | null > | null,
  not?: ModelPhysicianProfileConditionInput | null,
};

export type PhysicianProfile = {
  __typename: "PhysicianProfile",
  id?: string,
  FirstName?: string,
  LastName?: string,
  Organization?: string | null,
  Occupation?: string | null,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
};

export type UpdatePhysicianProfileInput = {
  id: string,
  FirstName?: string | null,
  LastName?: string | null,
  Organization?: string | null,
  Occupation?: string | null,
};

export type DeletePhysicianProfileInput = {
  id?: string | null,
};

export type ModelMeetingFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelMeetingFilterInput | null > | null,
  or?: Array< ModelMeetingFilterInput | null > | null,
  not?: ModelMeetingFilterInput | null,
};

export type ModelMeetingConnection = {
  __typename: "ModelMeetingConnection",
  items?:  Array<Meeting | null > | null,
  nextToken?: string | null,
};

export type ModelAttendeeFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  externalUserId?: ModelStringInput | null,
  meetingID?: ModelIDInput | null,
  role?: ModelStringInput | null,
  and?: Array< ModelAttendeeFilterInput | null > | null,
  or?: Array< ModelAttendeeFilterInput | null > | null,
  not?: ModelAttendeeFilterInput | null,
};

export type ModelAttendeeConnection = {
  __typename: "ModelAttendeeConnection",
  items?:  Array<Attendee | null > | null,
  nextToken?: string | null,
};

export type ModelPhysicianProfileFilterInput = {
  id?: ModelIDInput | null,
  FirstName?: ModelStringInput | null,
  LastName?: ModelStringInput | null,
  Organization?: ModelStringInput | null,
  Occupation?: ModelStringInput | null,
  and?: Array< ModelPhysicianProfileFilterInput | null > | null,
  or?: Array< ModelPhysicianProfileFilterInput | null > | null,
  not?: ModelPhysicianProfileFilterInput | null,
};

export type ModelPhysicianProfileConnection = {
  __typename: "ModelPhysicianProfileConnection",
  items?:  Array<PhysicianProfile | null > | null,
  nextToken?: string | null,
};

export type CreateChimeMeetingMutationVariables = {
  title?: string | null,
};

export type CreateChimeMeetingMutation = {
  createChimeMeeting?:  {
    __typename: "JoinInfo",
    id: string,
    Meeting:  {
      __typename: "MeetingData",
      MeetingId: string,
      ExternalMeetingId?: string | null,
      MediaPlacement:  {
        __typename: "MediaPlacement",
        AudioHostUrl: string,
        AudioFallbackUrl: string,
        ScreenDataUrl: string,
        ScreenSharingUrl: string,
        ScreenViewingUrl: string,
        SignalingUrl: string,
        TurnControlUrl: string,
      },
      MediaRegion: string,
    },
    Attendee?:  {
      __typename: "AttendeeInfo",
      ExternalUserId?: string | null,
      AttendeeId?: string | null,
      JoinToken?: string | null,
    } | null,
  } | null,
};

export type JoinChimeMeetingMutationVariables = {
  title?: string | null,
  name?: string | null,
  region?: string | null,
  role?: string | null,
  externalAttendeeId?: string | null,
};

export type JoinChimeMeetingMutation = {
  joinChimeMeeting?:  {
    __typename: "JoinInfo",
    id: string,
    Meeting:  {
      __typename: "MeetingData",
      MeetingId: string,
      ExternalMeetingId?: string | null,
      MediaPlacement:  {
        __typename: "MediaPlacement",
        AudioHostUrl: string,
        AudioFallbackUrl: string,
        ScreenDataUrl: string,
        ScreenSharingUrl: string,
        ScreenViewingUrl: string,
        SignalingUrl: string,
        TurnControlUrl: string,
      },
      MediaRegion: string,
    },
    Attendee?:  {
      __typename: "AttendeeInfo",
      ExternalUserId?: string | null,
      AttendeeId?: string | null,
      JoinToken?: string | null,
    } | null,
  } | null,
};

export type CreateMeetingMutationVariables = {
  input?: CreateMeetingInput,
  condition?: ModelMeetingConditionInput | null,
};

export type CreateMeetingMutation = {
  createMeeting?:  {
    __typename: "Meeting",
    id: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateMeetingMutationVariables = {
  input?: UpdateMeetingInput,
  condition?: ModelMeetingConditionInput | null,
};

export type UpdateMeetingMutation = {
  updateMeeting?:  {
    __typename: "Meeting",
    id: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteMeetingMutationVariables = {
  input?: DeleteMeetingInput,
  condition?: ModelMeetingConditionInput | null,
};

export type DeleteMeetingMutation = {
  deleteMeeting?:  {
    __typename: "Meeting",
    id: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type CreateAttendeeMutationVariables = {
  input?: CreateAttendeeInput,
  condition?: ModelAttendeeConditionInput | null,
};

export type CreateAttendeeMutation = {
  createAttendee?:  {
    __typename: "Attendee",
    id: string,
    name: string,
    externalUserId?: string | null,
    meetingID: string,
    role: string,
  } | null,
};

export type UpdateAttendeeMutationVariables = {
  input?: UpdateAttendeeInput,
  condition?: ModelAttendeeConditionInput | null,
};

export type UpdateAttendeeMutation = {
  updateAttendee?:  {
    __typename: "Attendee",
    id: string,
    name: string,
    externalUserId?: string | null,
    meetingID: string,
    role: string,
  } | null,
};

export type DeleteAttendeeMutationVariables = {
  input?: DeleteAttendeeInput,
  condition?: ModelAttendeeConditionInput | null,
};

export type DeleteAttendeeMutation = {
  deleteAttendee?:  {
    __typename: "Attendee",
    id: string,
    name: string,
    externalUserId?: string | null,
    meetingID: string,
    role: string,
  } | null,
};

export type CreatePhysicianProfileMutationVariables = {
  input?: CreatePhysicianProfileInput,
  condition?: ModelPhysicianProfileConditionInput | null,
};

export type CreatePhysicianProfileMutation = {
  createPhysicianProfile?:  {
    __typename: "PhysicianProfile",
    id: string,
    FirstName: string,
    LastName: string,
    Organization?: string | null,
    Occupation?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdatePhysicianProfileMutationVariables = {
  input?: UpdatePhysicianProfileInput,
  condition?: ModelPhysicianProfileConditionInput | null,
};

export type UpdatePhysicianProfileMutation = {
  updatePhysicianProfile?:  {
    __typename: "PhysicianProfile",
    id: string,
    FirstName: string,
    LastName: string,
    Organization?: string | null,
    Occupation?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeletePhysicianProfileMutationVariables = {
  input?: DeletePhysicianProfileInput,
  condition?: ModelPhysicianProfileConditionInput | null,
};

export type DeletePhysicianProfileMutation = {
  deletePhysicianProfile?:  {
    __typename: "PhysicianProfile",
    id: string,
    FirstName: string,
    LastName: string,
    Organization?: string | null,
    Occupation?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type EchoQueryVariables = {
  msg?: string | null,
};

export type EchoQuery = {
  echo?: string | null,
};

export type Echo2QueryVariables = {
  msg?: string | null,
};

export type Echo2Query = {
  echo2?: string | null,
};

export type GetMeetingQueryVariables = {
  id?: string,
};

export type GetMeetingQuery = {
  getMeeting?:  {
    __typename: "Meeting",
    id: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type ListMeetingsQueryVariables = {
  filter?: ModelMeetingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMeetingsQuery = {
  listMeetings?:  {
    __typename: "ModelMeetingConnection",
    items?:  Array< {
      __typename: "Meeting",
      id: string,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetAttendeeQueryVariables = {
  id?: string,
};

export type GetAttendeeQuery = {
  getAttendee?:  {
    __typename: "Attendee",
    id: string,
    name: string,
    externalUserId?: string | null,
    meetingID: string,
    role: string,
  } | null,
};

export type ListAttendeesQueryVariables = {
  filter?: ModelAttendeeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAttendeesQuery = {
  listAttendees?:  {
    __typename: "ModelAttendeeConnection",
    items?:  Array< {
      __typename: "Attendee",
      id: string,
      name: string,
      externalUserId?: string | null,
      meetingID: string,
      role: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetPhysicianProfileQueryVariables = {
  id?: string,
};

export type GetPhysicianProfileQuery = {
  getPhysicianProfile?:  {
    __typename: "PhysicianProfile",
    id: string,
    FirstName: string,
    LastName: string,
    Organization?: string | null,
    Occupation?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListPhysicianProfilesQueryVariables = {
  filter?: ModelPhysicianProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPhysicianProfilesQuery = {
  listPhysicianProfiles?:  {
    __typename: "ModelPhysicianProfileConnection",
    items?:  Array< {
      __typename: "PhysicianProfile",
      id: string,
      FirstName: string,
      LastName: string,
      Organization?: string | null,
      Occupation?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateMeetingSubscription = {
  onCreateMeeting?:  {
    __typename: "Meeting",
    id: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateMeetingSubscription = {
  onUpdateMeeting?:  {
    __typename: "Meeting",
    id: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteMeetingSubscription = {
  onDeleteMeeting?:  {
    __typename: "Meeting",
    id: string,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnCreateAttendeeSubscription = {
  onCreateAttendee?:  {
    __typename: "Attendee",
    id: string,
    name: string,
    externalUserId?: string | null,
    meetingID: string,
    role: string,
  } | null,
};

export type OnUpdateAttendeeSubscription = {
  onUpdateAttendee?:  {
    __typename: "Attendee",
    id: string,
    name: string,
    externalUserId?: string | null,
    meetingID: string,
    role: string,
  } | null,
};

export type OnDeleteAttendeeSubscription = {
  onDeleteAttendee?:  {
    __typename: "Attendee",
    id: string,
    name: string,
    externalUserId?: string | null,
    meetingID: string,
    role: string,
  } | null,
};

export type OnCreatePhysicianProfileSubscriptionVariables = {
  owner?: string,
};

export type OnCreatePhysicianProfileSubscription = {
  onCreatePhysicianProfile?:  {
    __typename: "PhysicianProfile",
    id: string,
    FirstName: string,
    LastName: string,
    Organization?: string | null,
    Occupation?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdatePhysicianProfileSubscriptionVariables = {
  owner?: string,
};

export type OnUpdatePhysicianProfileSubscription = {
  onUpdatePhysicianProfile?:  {
    __typename: "PhysicianProfile",
    id: string,
    FirstName: string,
    LastName: string,
    Organization?: string | null,
    Occupation?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeletePhysicianProfileSubscriptionVariables = {
  owner?: string,
};

export type OnDeletePhysicianProfileSubscription = {
  onDeletePhysicianProfile?:  {
    __typename: "PhysicianProfile",
    id: string,
    FirstName: string,
    LastName: string,
    Organization?: string | null,
    Occupation?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
