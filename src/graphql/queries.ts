/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const echo = /* GraphQL */ `
  query Echo($msg: String) {
    echo(msg: $msg)
  }
`;
export const echo2 = /* GraphQL */ `
  query Echo2($msg: String) {
    echo2(msg: $msg)
  }
`;
export const getMeeting = /* GraphQL */ `
  query GetMeeting($id: ID!) {
    getMeeting(id: $id) {
      id
      attendees {
        items {
          id
          Name
          externalUserId
          meetingID
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listMeetings = /* GraphQL */ `
  query ListMeetings(
    $filter: ModelMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeetings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        attendees {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAttendee = /* GraphQL */ `
  query GetAttendee($id: ID!) {
    getAttendee(id: $id) {
      id
      Name
      externalUserId
      meetingID
      meeting {
        id
        attendees {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const listAttendees = /* GraphQL */ `
  query ListAttendees(
    $filter: ModelAttendeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttendees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Name
        externalUserId
        meetingID
        meeting {
          id
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getPhysicianProfile = /* GraphQL */ `
  query GetPhysicianProfile($id: ID!) {
    getPhysicianProfile(id: $id) {
      id
      FirstName
      LastName
      Organization
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPhysicianProfiles = /* GraphQL */ `
  query ListPhysicianProfiles(
    $filter: ModelPhysicianProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPhysicianProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        FirstName
        LastName
        Organization
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
