/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMeetingInput = {
  id?: string | null,
};

export type ModelMeetingConditionInput = {
  and?: Array< ModelMeetingConditionInput | null > | null,
  or?: Array< ModelMeetingConditionInput | null > | null,
  not?: ModelMeetingConditionInput | null,
};

export type UpdateMeetingInput = {
  id: string,
};

export type DeleteMeetingInput = {
  id?: string | null,
};

export type CreateAttendeeInput = {
  id?: string | null,
  name: string,
  meetingID: string,
};

export type ModelAttendeeConditionInput = {
  name?: ModelStringInput | null,
  meetingID?: ModelIDInput | null,
  and?: Array< ModelAttendeeConditionInput | null > | null,
  or?: Array< ModelAttendeeConditionInput | null > | null,
  not?: ModelAttendeeConditionInput | null,
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

export type UpdateAttendeeInput = {
  id: string,
  name?: string | null,
  meetingID?: string | null,
};

export type DeleteAttendeeInput = {
  id?: string | null,
};

export type ModelMeetingFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelMeetingFilterInput | null > | null,
  or?: Array< ModelMeetingFilterInput | null > | null,
  not?: ModelMeetingFilterInput | null,
};

export type ModelAttendeeFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  meetingID?: ModelIDInput | null,
  and?: Array< ModelAttendeeFilterInput | null > | null,
  or?: Array< ModelAttendeeFilterInput | null > | null,
  not?: ModelAttendeeFilterInput | null,
};

export type CreateChimeMeetingMutationVariables = {
  title?: string | null,
};

export type CreateChimeMeetingMutation = {
  createChimeMeeting:  {
    __typename: "JoinInfo",
    id: string,
    Meeting:  {
      __typename: "MeetingData",
      MeetingId: string,
      ExternalMeetingId: string | null,
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
    Attendee:  {
      __typename: "AttendeeInfo",
      ExternalUserId: string | null,
      AttendeeId: string | null,
      JoinToken: string | null,
    } | null,
  } | null,
};

export type JoinChimeMeetingMutationVariables = {
  title?: string | null,
  name?: string | null,
  region?: string | null,
};

export type JoinChimeMeetingMutation = {
  joinChimeMeeting:  {
    __typename: "JoinInfo",
    id: string,
    Meeting:  {
      __typename: "MeetingData",
      MeetingId: string,
      ExternalMeetingId: string | null,
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
    Attendee:  {
      __typename: "AttendeeInfo",
      ExternalUserId: string | null,
      AttendeeId: string | null,
      JoinToken: string | null,
    } | null,
  } | null,
};

export type CreateMeetingMutationVariables = {
  input: CreateMeetingInput,
  condition?: ModelMeetingConditionInput | null,
};

export type CreateMeetingMutation = {
  createMeeting:  {
    __typename: "Meeting",
    id: string,
    attendees:  {
      __typename: "ModelAttendeeConnection",
      items:  Array< {
        __typename: "Attendee",
        id: string,
        name: string,
        meetingID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMeetingMutationVariables = {
  input: UpdateMeetingInput,
  condition?: ModelMeetingConditionInput | null,
};

export type UpdateMeetingMutation = {
  updateMeeting:  {
    __typename: "Meeting",
    id: string,
    attendees:  {
      __typename: "ModelAttendeeConnection",
      items:  Array< {
        __typename: "Attendee",
        id: string,
        name: string,
        meetingID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMeetingMutationVariables = {
  input: DeleteMeetingInput,
  condition?: ModelMeetingConditionInput | null,
};

export type DeleteMeetingMutation = {
  deleteMeeting:  {
    __typename: "Meeting",
    id: string,
    attendees:  {
      __typename: "ModelAttendeeConnection",
      items:  Array< {
        __typename: "Attendee",
        id: string,
        name: string,
        meetingID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAttendeeMutationVariables = {
  input: CreateAttendeeInput,
  condition?: ModelAttendeeConditionInput | null,
};

export type CreateAttendeeMutation = {
  createAttendee:  {
    __typename: "Attendee",
    id: string,
    name: string,
    meetingID: string,
    meeting:  {
      __typename: "Meeting",
      id: string,
      attendees:  {
        __typename: "ModelAttendeeConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAttendeeMutationVariables = {
  input: UpdateAttendeeInput,
  condition?: ModelAttendeeConditionInput | null,
};

export type UpdateAttendeeMutation = {
  updateAttendee:  {
    __typename: "Attendee",
    id: string,
    name: string,
    meetingID: string,
    meeting:  {
      __typename: "Meeting",
      id: string,
      attendees:  {
        __typename: "ModelAttendeeConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAttendeeMutationVariables = {
  input: DeleteAttendeeInput,
  condition?: ModelAttendeeConditionInput | null,
};

export type DeleteAttendeeMutation = {
  deleteAttendee:  {
    __typename: "Attendee",
    id: string,
    name: string,
    meetingID: string,
    meeting:  {
      __typename: "Meeting",
      id: string,
      attendees:  {
        __typename: "ModelAttendeeConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type EchoQueryVariables = {
  msg?: string | null,
};

export type EchoQuery = {
  echo: string | null,
};

export type Echo2QueryVariables = {
  msg?: string | null,
};

export type Echo2Query = {
  echo2: string | null,
};

export type GetMeetingQueryVariables = {
  id: string,
};

export type GetMeetingQuery = {
  getMeeting:  {
    __typename: "Meeting",
    id: string,
    attendees:  {
      __typename: "ModelAttendeeConnection",
      items:  Array< {
        __typename: "Attendee",
        id: string,
        name: string,
        meetingID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMeetingsQueryVariables = {
  filter?: ModelMeetingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMeetingsQuery = {
  listMeetings:  {
    __typename: "ModelMeetingConnection",
    items:  Array< {
      __typename: "Meeting",
      id: string,
      attendees:  {
        __typename: "ModelAttendeeConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetAttendeeQueryVariables = {
  id: string,
};

export type GetAttendeeQuery = {
  getAttendee:  {
    __typename: "Attendee",
    id: string,
    name: string,
    meetingID: string,
    meeting:  {
      __typename: "Meeting",
      id: string,
      attendees:  {
        __typename: "ModelAttendeeConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAttendeesQueryVariables = {
  filter?: ModelAttendeeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAttendeesQuery = {
  listAttendees:  {
    __typename: "ModelAttendeeConnection",
    items:  Array< {
      __typename: "Attendee",
      id: string,
      name: string,
      meetingID: string,
      meeting:  {
        __typename: "Meeting",
        id: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateMeetingSubscription = {
  onCreateMeeting:  {
    __typename: "Meeting",
    id: string,
    attendees:  {
      __typename: "ModelAttendeeConnection",
      items:  Array< {
        __typename: "Attendee",
        id: string,
        name: string,
        meetingID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMeetingSubscription = {
  onUpdateMeeting:  {
    __typename: "Meeting",
    id: string,
    attendees:  {
      __typename: "ModelAttendeeConnection",
      items:  Array< {
        __typename: "Attendee",
        id: string,
        name: string,
        meetingID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMeetingSubscription = {
  onDeleteMeeting:  {
    __typename: "Meeting",
    id: string,
    attendees:  {
      __typename: "ModelAttendeeConnection",
      items:  Array< {
        __typename: "Attendee",
        id: string,
        name: string,
        meetingID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAttendeeSubscription = {
  onCreateAttendee:  {
    __typename: "Attendee",
    id: string,
    name: string,
    meetingID: string,
    meeting:  {
      __typename: "Meeting",
      id: string,
      attendees:  {
        __typename: "ModelAttendeeConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAttendeeSubscription = {
  onUpdateAttendee:  {
    __typename: "Attendee",
    id: string,
    name: string,
    meetingID: string,
    meeting:  {
      __typename: "Meeting",
      id: string,
      attendees:  {
        __typename: "ModelAttendeeConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAttendeeSubscription = {
  onDeleteAttendee:  {
    __typename: "Attendee",
    id: string,
    name: string,
    meetingID: string,
    meeting:  {
      __typename: "Meeting",
      id: string,
      attendees:  {
        __typename: "ModelAttendeeConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
