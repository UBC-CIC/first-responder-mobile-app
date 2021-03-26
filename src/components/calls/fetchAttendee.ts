import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { GetAttendeeDataQuery, GetAttendeeDataQueryVariables } from "../../API";
import { getAttendeeData } from "../../graphql/queries";

const fetchAttendee = async (
  options: GetAttendeeDataQueryVariables,
): Promise<GraphQLResult<GetAttendeeDataQuery>> => API.graphql(
  graphqlOperation(getAttendeeData, options),
) as GraphQLResult<GetAttendeeDataQuery>;

export default fetchAttendee;
