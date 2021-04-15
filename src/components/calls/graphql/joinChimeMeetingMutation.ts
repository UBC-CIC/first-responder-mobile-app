export const joinChimeMeeting = /* GraphQL */ `
  mutation JoinChimeMeeting(
    $externalAttendeeId: String
    $firstName: String
    $lastName: String
    $phoneNumber: String
    $region: String
    $role: String
    $title: String
    $attendeeType: String
    $organization: String
    $location: GeolocationCoordinatesInput
  ) {
    joinChimeMeeting(
      externalAttendeeId: $externalAttendeeId
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      region: $region
      role: $role
      title: $title
      attendeeType: $attendeeType
      organization: $organization
      location: $location
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
