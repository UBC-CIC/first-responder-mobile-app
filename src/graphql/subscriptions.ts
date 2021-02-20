/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMeeting = /* GraphQL */ `
  subscription OnCreateMeeting {
    onCreateMeeting {
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
export const onUpdateMeeting = /* GraphQL */ `
  subscription OnUpdateMeeting {
    onUpdateMeeting {
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
export const onDeleteMeeting = /* GraphQL */ `
  subscription OnDeleteMeeting {
    onDeleteMeeting {
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
export const onCreateAttendee = /* GraphQL */ `
  subscription OnCreateAttendee {
    onCreateAttendee {
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
export const onUpdateAttendee = /* GraphQL */ `
  subscription OnUpdateAttendee {
    onUpdateAttendee {
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
export const onDeleteAttendee = /* GraphQL */ `
  subscription OnDeleteAttendee {
    onDeleteAttendee {
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
export const onCreatePhysicianProfile = /* GraphQL */ `
  subscription OnCreatePhysicianProfile($owner: String!) {
    onCreatePhysicianProfile(owner: $owner) {
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
export const onUpdatePhysicianProfile = /* GraphQL */ `
  subscription OnUpdatePhysicianProfile($owner: String!) {
    onUpdatePhysicianProfile(owner: $owner) {
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
export const onDeletePhysicianProfile = /* GraphQL */ `
  subscription OnDeletePhysicianProfile($owner: String!) {
    onDeletePhysicianProfile(owner: $owner) {
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
