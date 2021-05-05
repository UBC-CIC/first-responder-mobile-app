import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import {
  JoinChimeMeetingMutation,
  JoinChimeMeetingMutationVariables,
} from "../../API";
import { joinChimeMeeting } from "../../graphql/mutations";

const joinMeeting = async (
  options: JoinChimeMeetingMutationVariables,
): Promise<GraphQLResult<JoinChimeMeetingMutation>> => API.graphql({ ...graphqlOperation(joinChimeMeeting, options), authMode: GRAPHQL_AUTH_MODE.API_KEY }) as GraphQLResult<JoinChimeMeetingMutation>;

export default joinMeeting;
