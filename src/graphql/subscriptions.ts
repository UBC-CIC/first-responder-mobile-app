/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFirstResponderProfile = /* GraphQL */ `
  subscription OnCreateFirstResponderProfile(
    $first_name: String
    $last_name: String
    $occupation: String
    $phone_number: String
  ) {
    onCreateFirstResponderProfile(
      first_name: $first_name
      last_name: $last_name
      occupation: $occupation
      phone_number: $phone_number
    ) {
      first_name
      last_name
      occupation
      phone_number
    }
  }
`;
export const onCreateSpecialistProfile = /* GraphQL */ `
  subscription OnCreateSpecialistProfile(
    $email: String
    $first_name: String
    $last_name: String
    $phone_number: String
    $user_status: String
  ) {
    onCreateSpecialistProfile(
      email: $email
      first_name: $first_name
      last_name: $last_name
      phone_number: $phone_number
      user_status: $user_status
    ) {
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
export const onDeleteFirstResponderProfile = /* GraphQL */ `
  subscription OnDeleteFirstResponderProfile(
    $first_name: String
    $last_name: String
    $occupation: String
    $phone_number: String
  ) {
    onDeleteFirstResponderProfile(
      first_name: $first_name
      last_name: $last_name
      occupation: $occupation
      phone_number: $phone_number
    ) {
      first_name
      last_name
      occupation
      phone_number
    }
  }
`;
export const onDeleteSpecialistProfile = /* GraphQL */ `
  subscription OnDeleteSpecialistProfile(
    $email: String
    $first_name: String
    $last_name: String
    $phone_number: String
    $user_status: String
  ) {
    onDeleteSpecialistProfile(
      email: $email
      first_name: $first_name
      last_name: $last_name
      phone_number: $phone_number
      user_status: $user_status
    ) {
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
export const onUpdateFirstResponderProfile = /* GraphQL */ `
  subscription OnUpdateFirstResponderProfile(
    $first_name: String
    $last_name: String
    $occupation: String
    $phone_number: String
  ) {
    onUpdateFirstResponderProfile(
      first_name: $first_name
      last_name: $last_name
      occupation: $occupation
      phone_number: $phone_number
    ) {
      first_name
      last_name
      occupation
      phone_number
    }
  }
`;
export const onUpdateSpecialistProfile = /* GraphQL */ `
  subscription OnUpdateSpecialistProfile(
    $email: String
    $first_name: String
    $last_name: String
    $phone_number: String
    $user_status: String
  ) {
    onUpdateSpecialistProfile(
      email: $email
      first_name: $first_name
      last_name: $last_name
      phone_number: $phone_number
      user_status: $user_status
    ) {
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
export const onCreateMeeting = /* GraphQL */ `
  subscription OnCreateMeeting($id: String) {
    onCreateMeeting(id: $id) {
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
export const onUpdateMeeting = /* GraphQL */ `
  subscription OnUpdateMeeting($id: String) {
    onUpdateMeeting(id: $id) {
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
export const onDeleteMeeting = /* GraphQL */ `
  subscription OnDeleteMeeting($id: String) {
    onDeleteMeeting(id: $id) {
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
export const onCreateMeetingDetail = /* GraphQL */ `
  subscription OnCreateMeetingDetail(
    $meeting_id: String
    $create_date_time: String
    $meeting_status: String
    $end_date_time: String
  ) {
    onCreateMeetingDetail(
      meeting_id: $meeting_id
      create_date_time: $create_date_time
      meeting_status: $meeting_status
      end_date_time: $end_date_time
    ) {
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
export const onUpdateMeetingDetail = /* GraphQL */ `
  subscription OnUpdateMeetingDetail {
    onUpdateMeetingDetail {
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
export const onDeleteMeetingDetail = /* GraphQL */ `
  subscription OnDeleteMeetingDetail(
    $meeting_id: String
    $create_date_time: String
    $meeting_status: String
    $end_date_time: String
  ) {
    onDeleteMeetingDetail(
      meeting_id: $meeting_id
      create_date_time: $create_date_time
      meeting_status: $meeting_status
      end_date_time: $end_date_time
    ) {
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
