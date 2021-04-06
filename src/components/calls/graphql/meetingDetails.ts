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
        attendees {
          attendee_id
          attendee_join_type
          attendee_type
          name
          phone_number
          role
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
      end_date_time?: string | null,
      attendees?: Array< {
      __typename: "AttendeeDetail",
      attendee_id: string,
      attendee_join_type?: string | null,
      attendee_type?: string | null,
      name?: string | null,
      phone_number: string,
      role?: string | null,
    } | null > | null,
    } >,
    nextToken?: string | null,
  }
};
