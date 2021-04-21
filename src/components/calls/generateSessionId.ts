import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { GenerateMeetingIdMutation } from "../../API";
import { generateMeetingId } from "../../graphql/mutations";

const generateSessionId = async (): Promise<string> => {
  const res = await API.graphql({ ...graphqlOperation(generateMeetingId), authMode: GRAPHQL_AUTH_MODE.API_KEY }) as GraphQLResult<GenerateMeetingIdMutation>;
  console.log(res);

  if (res.data?.generateMeetingId) {
    console.log("GENERATED SESSION ID: ", res.data.generateMeetingId);

    return res.data?.generateMeetingId;
  }

  console.error(res.errors);
  return uuid();
};

export default generateSessionId;
