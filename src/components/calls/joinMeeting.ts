import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import {
  JoinChimeMeetingMutation,
  JoinChimeMeetingMutationVariables,
} from "../../API";
import { joinChimeMeeting } from "../../graphql/mutations";

const joinMeeting = async (
  options: JoinChimeMeetingMutationVariables,
): Promise<GraphQLResult<JoinChimeMeetingMutation>> => API.graphql(
  graphqlOperation(joinChimeMeeting, options),
) as GraphQLResult<JoinChimeMeetingMutation>;

export default joinMeeting;
