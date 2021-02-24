import { API, graphqlOperation } from "aws-amplify";
import { listAttendees } from "../../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";
import { ListAttendeesQuery, ListAttendeesQueryVariables } from "../../API";

const listMeetingAttendees = async (
  options: ListAttendeesQueryVariables
): Promise<GraphQLResult<ListAttendeesQuery>> =>
  API.graphql(
    graphqlOperation(listAttendees, options)
  ) as GraphQLResult<ListAttendeesQuery>;

export default listMeetingAttendees;
