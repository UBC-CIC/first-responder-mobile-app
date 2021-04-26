export const listMeetingDetails = /* GraphQL */ `
  query ListMeetingDetails(
    $filter: TableMeetingDetailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeetingDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        meeting_id
        meeting_status
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
        }
      }
      nextToken
    }
  }
`;

export type ListMeetingDetailsQuery = {
  listMeetingDetails?: {
    __typename: "MeetingDetailConnection",
    items?: Array< {
      __typename: "MeetingDetail",
      meeting_id: string,
      create_date_time?: string | null,
      meeting_status?: string | null,
      external_meeting_id?: string | null,
      end_date_time?: string | null,
      meeting_title?: string | null,
      meeting_comments?: string | null,
      attendees?: Array< {
      __typename: "AttendeeDetail",
      attendee_id: string,
      attendee_join_type?: string | null,
      attendee_type?: string | null,
      first_name?: string | null,
      last_name?: string | null,
      phone_number: string,
      user_role?: string | null,
      organization?: string | null,
    } > | null,
    } >,
    nextToken?: string | null,
  }
};
