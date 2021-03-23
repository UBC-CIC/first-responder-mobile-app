import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import { getFirstResponderProfile, GetFirstResponderProfileQuery, GetFirstResponderProfileQueryVariables } from "../../FirstResponderProfileAPI";
import { FirstResponderProfileType } from "../../types";

const fetchFirstResponderProfile = async (options: GetFirstResponderProfileQueryVariables):Promise<FirstResponderProfileType | undefined> => {
  const response = (await API.graphql({
    ...graphqlOperation(getFirstResponderProfile, options),
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  })) as GraphQLResult<GetFirstResponderProfileQuery>;
  if (response.errors) {
    console.log(response.errors);
  } else {
    if (response.data?.getFirstResponderProfile) {
      const profile =
          response.data?.getFirstResponderProfile as FirstResponderProfileType;
      return profile;
    }
  }
};

export default fetchFirstResponderProfile;