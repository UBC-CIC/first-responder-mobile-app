import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import { GetPhysicianProfileQuery, GetPhysicianProfileQueryVariables } from "../../API";
import { getPhysicianProfile } from "../../graphql/queries";
import { PhysicianProfileType } from "../../types";

const fetchPhysicianProfile = async (options: GetPhysicianProfileQueryVariables):Promise<PhysicianProfileType | undefined> => {
  const response = (await API.graphql({
    ...graphqlOperation(getPhysicianProfile, options),
    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
  })) as GraphQLResult<GetPhysicianProfileQuery>;
  if (response.errors) {
    console.log(response.errors);
  } else {
    if (response.data?.getPhysicianProfile) {
      const profile =
          response.data?.getPhysicianProfile;
      return {
        Occupation: profile.Occupation,
        Organization: profile.Organization,
        FirstName: profile.FirstName,
        LastName: profile.LastName,
        id: profile.LastName
      } as PhysicianProfileType;
    }
  }
};

export default fetchPhysicianProfile;