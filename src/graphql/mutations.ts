/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChimeMeeting = /* GraphQL */ `
  mutation CreateChimeMeeting($title: String) {
    createChimeMeeting(title: $title) {
      id
      Meeting {
        MeetingId
        ExternalMeetingId
        MediaPlacement {
          AudioHostUrl
          AudioFallbackUrl
          ScreenDataUrl
          ScreenSharingUrl
          ScreenViewingUrl
          SignalingUrl
          TurnControlUrl
        }
        MediaRegion
      }
      Attendee {
        ExternalUserId
        AttendeeId
        JoinToken
      }
    }
  }
`;
export const joinChimeMeeting = /* GraphQL */ `
  mutation JoinChimeMeeting(
    $title: String
    $name: String
    $region: String
    $role: String
    $externalAttendeeId: String
    $phoneNumber: String
  ) {
    joinChimeMeeting(
      title: $title
      name: $name
      region: $region
      role: $role
      externalAttendeeId: $externalAttendeeId
      phoneNumber: $phoneNumber
    ) {
      id
      Meeting {
        MeetingId
        ExternalMeetingId
        MediaPlacement {
          AudioHostUrl
          AudioFallbackUrl
          ScreenDataUrl
          ScreenSharingUrl
          ScreenViewingUrl
          SignalingUrl
          TurnControlUrl
        }
        MediaRegion
      }
      Attendee {
        ExternalUserId
        AttendeeId
        JoinToken
      }
    }
  }
`;
export const createMeeting = /* GraphQL */ `
  mutation CreateMeeting(
    $input: CreateMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    createMeeting(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateMeeting = /* GraphQL */ `
  mutation UpdateMeeting(
    $input: UpdateMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    updateMeeting(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteMeeting = /* GraphQL */ `
  mutation DeleteMeeting(
    $input: DeleteMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    deleteMeeting(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
    }
  }
`;
export const createAttendee = /* GraphQL */ `
  mutation CreateAttendee(
    $input: CreateAttendeeInput!
    $condition: ModelAttendeeConditionInput
  ) {
    createAttendee(input: $input, condition: $condition) {
      id
      name
      externalUserId
      meetingID
      role
    }
  }
`;
export const updateAttendee = /* GraphQL */ `
  mutation UpdateAttendee(
    $input: UpdateAttendeeInput!
    $condition: ModelAttendeeConditionInput
  ) {
    updateAttendee(input: $input, condition: $condition) {
      id
      name
      externalUserId
      meetingID
      role
    }
  }
`;
export const deleteAttendee = /* GraphQL */ `
  mutation DeleteAttendee(
    $input: DeleteAttendeeInput!
    $condition: ModelAttendeeConditionInput
  ) {
    deleteAttendee(input: $input, condition: $condition) {
      id
      name
      externalUserId
      meetingID
      role
    }
  }
`;
export const createPhysicianProfile = /* GraphQL */ `
  mutation CreatePhysicianProfile(
    $input: CreatePhysicianProfileInput!
    $condition: ModelPhysicianProfileConditionInput
  ) {
    createPhysicianProfile(input: $input, condition: $condition) {
      id
      FirstName
      LastName
      Organization
      Occupation
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updatePhysicianProfile = /* GraphQL */ `
  mutation UpdatePhysicianProfile(
    $input: UpdatePhysicianProfileInput!
    $condition: ModelPhysicianProfileConditionInput
  ) {
    updatePhysicianProfile(input: $input, condition: $condition) {
      id
      FirstName
      LastName
      Organization
      Occupation
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deletePhysicianProfile = /* GraphQL */ `
  mutation DeletePhysicianProfile(
    $input: DeletePhysicianProfileInput!
    $condition: ModelPhysicianProfileConditionInput
  ) {
    deletePhysicianProfile(input: $input, condition: $condition) {
      id
      FirstName
      LastName
      Organization
      Occupation
      createdAt
      updatedAt
      owner
    }
  }
`;
