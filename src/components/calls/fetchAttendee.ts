import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { GetAttendeeQuery, GetAttendeeQueryVariables } from "../../API";
import { getAttendee } from "../../graphql/queries";

const fetchAttendee = async (
  options: GetAttendeeQueryVariables
): Promise<GraphQLResult<GetAttendeeQuery>> => {
  return API.graphql(
    graphqlOperation(getAttendee, options)
  ) as GraphQLResult<GetAttendeeQuery>;
};

export default fetchAttendee;
