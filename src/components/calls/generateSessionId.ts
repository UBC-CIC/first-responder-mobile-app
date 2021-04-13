import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { GenerateMeetingIdMutation } from "../../API";
import { generateMeetingId } from "../../graphql/mutations";

const generateSessionId = async (): Promise<string> => {
  const res = await API.graphql(graphqlOperation(generateMeetingId)) as GraphQLResult<GenerateMeetingIdMutation>;
  console.log(res);

  if (res.data?.generateMeetingId) {
    console.log("GENERATED SESSION ID: ", res.data.generateMeetingId);

    return res.data?.generateMeetingId;
  }

  console.error(res.errors);
  return uuid();
};

export default generateSessionId;
