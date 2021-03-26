import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { listAttendeeData } from "../../graphql/queries";
import { ListAttendeeDataQuery, ListAttendeeDataQueryVariables } from "../../API";

const listMeetingAttendeeData = async (
  options: ListAttendeeDataQueryVariables,
): Promise<GraphQLResult<ListAttendeeDataQuery>> => API.graphql(
  graphqlOperation(listAttendeeData, options),
) as GraphQLResult<ListAttendeeDataQuery>;

export default listMeetingAttendeeData;
