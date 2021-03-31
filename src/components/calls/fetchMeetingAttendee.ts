import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import { GetMeetingDetailQuery, GetMeetingDetailQueryVariables } from "../../API";
import { getMeetingAttendees } from "./graphql/getMeetingAttendees";

const fetchMeetingAttendees = async (
  options: GetMeetingDetailQueryVariables,
): Promise<GraphQLResult<GetMeetingDetailQuery>> => API.graphql(
  graphqlOperation(getMeetingAttendees, options),
) as GraphQLResult<GetMeetingDetailQuery>;

export default fetchMeetingAttendees;
