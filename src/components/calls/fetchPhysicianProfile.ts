import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import {
  GetPhysicianProfileQuery,
  GetPhysicianProfileQueryVariables,
} from "../../API";
import { PhysicianProfileType, UserProfileType } from "../../types";
import {
  getUserProfile,
  GetUserProfileQuery,
  GetUserProfileQueryVariables,
} from "../../UserProfileAPI";

const fetchPhysicianProfile = async (
  options: GetUserProfileQueryVariables
): Promise<UserProfileType | undefined> => {
  const response = (await API.graphql({
    ...graphqlOperation(getUserProfile, options),
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  })) as GraphQLResult<GetUserProfileQuery>;
  if (response.errors) {
    console.log(response.errors);
  } else {
    if (response.data?.getUserProfile) {
      const profile = response.data?.getUserProfile as UserProfileType;
      return profile;
    }
  }
};

export default fetchPhysicianProfile;
