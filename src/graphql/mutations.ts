/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const confirmPhoneNumber = /* GraphQL */ `
  mutation ConfirmPhoneNumber($phoneNumber: String, $secretCode: String) {
    confirmPhoneNumber(phoneNumber: $phoneNumber, secretCode: $secretCode)
  }
`;
export const createFirstResponderProfile = /* GraphQL */ `
  mutation CreateFirstResponderProfile(
    $input: CreateFirstResponderProfileInput!
  ) {
    createFirstResponderProfile(input: $input) {
      first_name
      last_name
      occupation
      phone_number
    }
  }
`;
export const createSpecialistProfile = /* GraphQL */ `
  mutation CreateSpecialistProfile($input: CreateSpecialistProfileInput!) {
    createSpecialistProfile(input: $input) {
      availability
      created_date_time
      email
      first_name
      is_paged
      last_name
      notes
      organization
      phone_number
      profile_picture
      updated_date_time
      user_role
      user_status
    }
  }
`;
export const deleteFirstResponderProfile = /* GraphQL */ `
  mutation DeleteFirstResponderProfile(
    $input: DeleteFirstResponderProfileInput!
  ) {
    deleteFirstResponderProfile(input: $input) {
      first_name
      last_name
      occupation
      phone_number
    }
  }
`;
export const deleteSpecialistProfile = /* GraphQL */ `
  mutation DeleteSpecialistProfile($input: DeleteSpecialistProfileInput!) {
    deleteSpecialistProfile(input: $input) {
      availability
      created_date_time
      email
      first_name
      is_paged
      last_name
      notes
      organization
      phone_number
      profile_picture
      updated_date_time
      user_role
      user_status
    }
  }
`;
export const joinChimeMeeting = /* GraphQL */ `
  mutation JoinChimeMeeting(
    $externalAttendeeId: String
    $name: String
    $phoneNumber: String
    $region: String
    $role: String
    $title: String
  ) {
    joinChimeMeeting(
      externalAttendeeId: $externalAttendeeId
      name: $name
      phoneNumber: $phoneNumber
      region: $region
      role: $role
      title: $title
    ) {
      Meeting {
      MediaPlacement {
        AudioFallbackUrl
        AudioHostUrl
        ScreenDataUrl
        ScreenSharingUrl
        ScreenViewingUrl
        SignalingUrl
        TurnControlUrl
      }
      ExternalMeetingId
      MediaRegion
      MeetingId
    }
    id
    Attendee {
      AttendeeId
      ExternalUserId
      JoinToken
    }
    }
  }
`;
export const updateFirstResponderProfile = /* GraphQL */ `
  mutation UpdateFirstResponderProfile(
    $input: UpdateFirstResponderProfileInput!
  ) {
    updateFirstResponderProfile(input: $input) {
      first_name
      last_name
      occupation
      phone_number
    }
  }
`;
export const updateSpecialistProfile = /* GraphQL */ `
  mutation UpdateSpecialistProfile($input: UpdateSpecialistProfileInput!) {
    updateSpecialistProfile(input: $input) {
      availability
      created_date_time
      email
      first_name
      is_paged
      last_name
      notes
      organization
      phone_number
      profile_picture
      updated_date_time
      user_role
      user_status
    }
  }
`;
export const createMeeting = /* GraphQL */ `
  mutation CreateMeeting($input: CreateMeetingInput!) {
    createMeeting(input: $input) {
      id
      ExternalMeetingId
      MediaPlacement {
        AudioFallbackUrl
        AudioHostUrl
        ScreenDataUrl
        ScreenSharingUrl
        ScreenViewingUrl
        SignalingUrl
        TurnControlUrl
      }
      MediaRegion
      MeetingId
    }
  }
`;
export const updateMeeting = /* GraphQL */ `
  mutation UpdateMeeting($input: UpdateMeetingInput!) {
    updateMeeting(input: $input) {
      id
      ExternalMeetingId
      MediaPlacement {
        AudioFallbackUrl
        AudioHostUrl
        ScreenDataUrl
        ScreenSharingUrl
        ScreenViewingUrl
        SignalingUrl
        TurnControlUrl
      }
      MediaRegion
      MeetingId
    }
  }
`;
export const deleteMeeting = /* GraphQL */ `
  mutation DeleteMeeting($input: DeleteMeetingInput!) {
    deleteMeeting(input: $input) {
      id
      ExternalMeetingId
      MediaPlacement {
        AudioFallbackUrl
        AudioHostUrl
        ScreenDataUrl
        ScreenSharingUrl
        ScreenViewingUrl
        SignalingUrl
        TurnControlUrl
      }
      MediaRegion
      MeetingId
    }
  }
`;
export const createAttendeeData = /* GraphQL */ `
  mutation CreateAttendeeData($input: CreateAttendeeDataInput!) {
    createAttendeeData(input: $input) {
      id
      externalUserId
      meetingID
      name
      role
    }
  }
`;
export const updateAttendeeData = /* GraphQL */ `
  mutation UpdateAttendeeData($input: UpdateAttendeeDataInput!) {
    updateAttendeeData(input: $input) {
      id
      externalUserId
      meetingID
      name
      role
    }
  }
`;
export const deleteAttendeeData = /* GraphQL */ `
  mutation DeleteAttendeeData($input: DeleteAttendeeDataInput!) {
    deleteAttendeeData(input: $input) {
      id
      externalUserId
      meetingID
      name
      role
    }
  }
`;
