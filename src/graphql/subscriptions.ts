/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMeeting = /* GraphQL */ `
  subscription OnCreateMeeting {
    onCreateMeeting {
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMeeting = /* GraphQL */ `
  subscription OnUpdateMeeting {
    onUpdateMeeting {
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMeeting = /* GraphQL */ `
  subscription OnDeleteMeeting {
    onDeleteMeeting {
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAttendee = /* GraphQL */ `
  subscription OnCreateAttendee {
    onCreateAttendee {
      id
      name
      externalUserId
      meetingID
      role
    }
  }
`;
export const onUpdateAttendee = /* GraphQL */ `
  subscription OnUpdateAttendee {
    onUpdateAttendee {
      id
      name
      externalUserId
      meetingID
      role
    }
  }
`;
export const onDeleteAttendee = /* GraphQL */ `
  subscription OnDeleteAttendee {
    onDeleteAttendee {
      id
      name
      externalUserId
      meetingID
      role
    }
  }
`;
export const onCreatePhysicianProfile = /* GraphQL */ `
  subscription OnCreatePhysicianProfile($owner: String!) {
    onCreatePhysicianProfile(owner: $owner) {
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
export const onUpdatePhysicianProfile = /* GraphQL */ `
  subscription OnUpdatePhysicianProfile($owner: String!) {
    onUpdatePhysicianProfile(owner: $owner) {
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
export const onDeletePhysicianProfile = /* GraphQL */ `
  subscription OnDeletePhysicianProfile($owner: String!) {
    onDeletePhysicianProfile(owner: $owner) {
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
