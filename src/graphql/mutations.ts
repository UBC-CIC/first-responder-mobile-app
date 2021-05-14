/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      location {
        latitude
        longitude
      }
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
      location {
        latitude
        longitude
      }
    }
  }
`;
export const joinChimeMeeting = /* GraphQL */ `
  mutation JoinChimeMeeting($input: JoinChimeMeetingInput!) {
    joinChimeMeeting(input: $input) {
      meeting_id
      attendee_id
      external_user_id
      join_token
      media_placement {
        AudioFallbackUrl
        AudioHostUrl
        ScreenDataUrl
        ScreenSharingUrl
        ScreenViewingUrl
        SignalingUrl
        TurnControlUrl
      }
      media_region
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
      location {
        latitude
        longitude
      }
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
export const createMeetingDetail = /* GraphQL */ `
  mutation CreateMeetingDetail($input: CreateMeetingDetailInput!) {
    createMeetingDetail(input: $input) {
      meeting_id
      create_date_time
      meeting_status
      end_date_time
      external_meeting_id
      meeting_comments
      meeting_title
      attendees {
        attendee_id
        attendee_join_type
        attendee_type
        first_name
        last_name
        phone_number
        user_role
        organization
      }
    }
  }
`;
export const updateMeetingDetail = /* GraphQL */ `
  mutation UpdateMeetingDetail($input: UpdateMeetingDetailInput!) {
    updateMeetingDetail(input: $input) {
      meeting_id
      create_date_time
      meeting_status
      end_date_time
      external_meeting_id
      meeting_comments
      meeting_title
      attendees {
        attendee_id
        attendee_join_type
        attendee_type
        first_name
        last_name
        phone_number
        user_role
        organization
      }
    }
  }
`;
export const deleteMeetingDetail = /* GraphQL */ `
  mutation DeleteMeetingDetail($input: DeleteMeetingDetailInput!) {
    deleteMeetingDetail(input: $input) {
      meeting_id
      create_date_time
      meeting_status
      end_date_time
      external_meeting_id
      meeting_comments
      meeting_title
      attendees {
        attendee_id
        attendee_join_type
        attendee_type
        first_name
        last_name
        phone_number
        user_role
        organization
      }
    }
  }
`;
export const generateMeetingId = /* GraphQL */ `
  mutation GenerateMeetingId {
    generateMeetingId
  }
`;
