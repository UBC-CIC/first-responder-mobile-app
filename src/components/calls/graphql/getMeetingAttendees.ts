export const getMeetingAttendees = /* GraphQL */ `
  query GetMeetingDetail($meeting_id: String!) {
    getMeetingDetail(meeting_id: $meeting_id) {
      meeting_id
      create_date_time
      meeting_status
      attendees {
          attendee_id
          attendee_type
          first_name
          last_name
          phone_number
          user_role
      }
    }
  }
`;
