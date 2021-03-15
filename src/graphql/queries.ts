/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMeeting = /* GraphQL */ `
  query GetMeeting($id: ID!) {
    getMeeting(id: $id) {
      id
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
      name
      externalUserId
      meetingID
      role
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
        name
        externalUserId
        meetingID
        role
      }
      nextToken
    }
  }
`;
export const getFirstResponderProfile = /* GraphQL */ `
  query GetFirstResponderProfile($id: ID!) {
    getFirstResponderProfile(id: $id) {
      id
      phoneNumber
      FirstName
      LastName
      Occupation
      createdAt
      updatedAt
    }
  }
`;
export const listFirstResponderProfiles = /* GraphQL */ `
  query ListFirstResponderProfiles(
    $filter: ModelFirstResponderProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFirstResponderProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        phoneNumber
        FirstName
        LastName
        Occupation
        createdAt
        updatedAt
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
      Occupation
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
        Occupation
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
