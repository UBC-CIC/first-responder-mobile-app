import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import { GetFirstResponderProfileQuery, GetFirstResponderProfileQueryVariables } from "../../API";
import { getFirstResponderProfile } from "../../graphql/queries";
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
          response.data?.getFirstResponderProfile;
      return {
        Occupation: profile.Occupation,
        FirstName: profile.FirstName,
        LastName: profile.LastName,
        id: profile.LastName,
      } as FirstResponderProfileType;
    }
  }
};

export default fetchFirstResponderProfile;