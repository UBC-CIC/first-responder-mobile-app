import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { updateSpecialistProfile as updateSpecialistAvailabilityGraphql, UpdateSpecialistProfileMutation } from "./graphql/specialistAvailability";
import { UpdateSpecialistProfileMutationVariables } from "../../API";

const updateSpecialistAvailability = async (
  options: UpdateSpecialistProfileMutationVariables
): Promise<GraphQLResult<UpdateSpecialistProfileMutation>> => {
  return API.graphql(
    graphqlOperation(updateSpecialistAvailabilityGraphql, options)
  ) as GraphQLResult<UpdateSpecialistProfileMutation>;
};

export default updateSpecialistAvailability;
