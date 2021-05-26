import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { updateSpecialistProfile as updateSpecialistAvailabilityGraphql, UpdateSpecialistProfileMutation, UpdateSpecialistProfileMutationVariables } from "./graphql/specialistAvailability";

const updateSpecialistAvailability = async (
  options: UpdateSpecialistProfileMutationVariables,
): Promise<GraphQLResult<UpdateSpecialistProfileMutation>> => API.graphql(
  graphqlOperation(updateSpecialistAvailabilityGraphql, options),
) as GraphQLResult<UpdateSpecialistProfileMutation>;

export default updateSpecialistAvailability;
