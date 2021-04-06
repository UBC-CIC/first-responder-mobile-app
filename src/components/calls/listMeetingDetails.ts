import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import { ListMeetingDetailsQueryVariables } from "../../API";
import { listMeetingDetails, ListMeetingDetailsQuery } from "./graphql/meetingDetails";

const listAllMeetingDetails = async (
  options?: ListMeetingDetailsQueryVariables,
): Promise<GraphQLResult<ListMeetingDetailsQuery>> => API.graphql(
  graphqlOperation(listMeetingDetails, options),
) as GraphQLResult<ListMeetingDetailsQuery>;

export default listAllMeetingDetails;
