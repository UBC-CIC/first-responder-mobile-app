/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFirstResponderProfile = /* GraphQL */ `
  query GetFirstResponderProfile($phone_number: String!) {
    getFirstResponderProfile(phone_number: $phone_number) {
      first_name
      last_name
      occupation
      phone_number
    }
  }
`;
export const getSpecialistProfile = /* GraphQL */ `
  query GetSpecialistProfile($phone_number: String!) {
    getSpecialistProfile(phone_number: $phone_number) {
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
export const listFirstResponderProfiles = /* GraphQL */ `
  query ListFirstResponderProfiles(
    $filter: TableFirstResponderProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFirstResponderProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        first_name
        last_name
        occupation
        phone_number
      }
      nextToken
    }
  }
`;
export const listSpecialistProfiles = /* GraphQL */ `
  query ListSpecialistProfiles(
    $filter: TableSpecialistProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpecialistProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const querySpecialistProfilesByUserStatusGsi = /* GraphQL */ `
  query QuerySpecialistProfilesByUserStatusGsi(
    $after: String
    $first: Int
    $user_status: String!
  ) {
    querySpecialistProfilesByUserStatusGsi(
      after: $after
      first: $first
      user_status: $user_status
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getMeeting = /* GraphQL */ `
  query GetMeeting($id: String!) {
    getMeeting(id: $id) {
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
export const listMeetings = /* GraphQL */ `
  query ListMeetings(
    $filter: TableMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeetings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ExternalMeetingId
        MediaRegion
        MeetingId
      }
      nextToken
    }
  }
`;
export const getAttendeeData = /* GraphQL */ `
  query GetAttendeeData($id: String!) {
    getAttendeeData(id: $id) {
      id
      externalUserId
      meetingID
      name
      role
    }
  }
`;
export const listAttendeeData = /* GraphQL */ `
  query ListAttendeeData(
    $filter: TableAttendeeDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttendeeData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        externalUserId
        meetingID
        name
        role
      }
      nextToken
    }
  }
`;
export const getMeetingDetail = /* GraphQL */ `
  query GetMeetingDetail($meeting_id: String!) {
    getMeetingDetail(meeting_id: $meeting_id) {
      meeting_id
      create_date_time
      meeting_status
      end_date_time
      attendees {
        attendee_id
        attendee_join_type
        attendee_type
        name
        phone_number
        role
      }
    }
  }
`;
export const listMeetingDetails = /* GraphQL */ `
  query ListMeetingDetails(
    $filter: TableMeetingDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeetingDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        meeting_id
        create_date_time
        meeting_status
        end_date_time
      }
      nextToken
    }
  }
`;
export const queryMeetingDetailsByMeetingStatusGsi = /* GraphQL */ `
  query QueryMeetingDetailsByMeetingStatusGsi(
    $meeting_status: String!
    $first: Int
    $after: String
  ) {
    queryMeetingDetailsByMeetingStatusGsi(
      meeting_status: $meeting_status
      first: $first
      after: $after
    ) {
      items {
        meeting_id
        create_date_time
        meeting_status
        end_date_time
      }
      nextToken
    }
  }
`;
