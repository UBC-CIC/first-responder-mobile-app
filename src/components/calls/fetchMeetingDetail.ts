import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import { GetMeetingDetailQuery, GetMeetingDetailQueryVariables } from "../../API";
import { getMeetingDetail } from "../../graphql/queries";

const fetchMeetingDetail = async (
  options: GetMeetingDetailQueryVariables,
): Promise<GraphQLResult<GetMeetingDetailQuery>> => API.graphql(
  graphqlOperation(getMeetingDetail, options),
) as GraphQLResult<GetMeetingDetailQuery>;

export default fetchMeetingDetail;
