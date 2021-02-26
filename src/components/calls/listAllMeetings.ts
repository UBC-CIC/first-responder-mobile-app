import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import { ListMeetingsQuery, ListMeetingsQueryVariables } from "../../API";
import { listMeetings } from "../../graphql/queries";

const listAllMeetings = async (
  options?: ListMeetingsQueryVariables
): Promise<GraphQLResult<ListMeetingsQuery>> =>
  API.graphql(
    graphqlOperation(listMeetings, options)
  ) as GraphQLResult<ListMeetingsQuery>;

export default listAllMeetings;
