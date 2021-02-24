import { API, graphqlOperation } from "aws-amplify";
import { joinChimeMeeting } from "../../graphql/mutations";
import { GraphQLResult } from "@aws-amplify/api";
import {
  JoinChimeMeetingMutation,
  JoinChimeMeetingMutationVariables,
} from "../../API";

const joinMeeting = async (
  options: JoinChimeMeetingMutationVariables
): Promise<GraphQLResult<JoinChimeMeetingMutation>> => {
  return API.graphql(
    graphqlOperation(joinChimeMeeting, options)
  ) as GraphQLResult<JoinChimeMeetingMutation>;
};

export default joinMeeting;
