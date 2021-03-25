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