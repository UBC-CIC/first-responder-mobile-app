import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import {  SpecialistProfileType } from "../../types";
import {
  GetSpecialistProfileQuery,
  GetSpecialistProfileQueryVariables,
} from "../../API";
import { getSpecialistProfile } from "../../graphql/queries";

const fetchPhysicianProfile = async (
  options: GetSpecialistProfileQueryVariables
): Promise<SpecialistProfileType | undefined> => {
  const response = (await API.graphql({
    ...graphqlOperation(getSpecialistProfile, options),
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  })) as GraphQLResult<GetSpecialistProfileQuery>;
  if (response.errors) {
    console.log(response.errors);
  } else {
    if (response.data?.getSpecialistProfile) {
      const profile = response.data?.getSpecialistProfile as SpecialistProfileType;
      return profile;
    }
  }
};

export default fetchPhysicianProfile;
