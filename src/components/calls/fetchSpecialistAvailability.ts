import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { GetSpecialistProfileQueryVariables } from "../../API";
import { getSpecialistProfile, GetSpecialistProfileQuery } from "./graphql/specialistAvailability";

const fetchSpecialistAvailability = async (
  options: GetSpecialistProfileQueryVariables,
): Promise<GraphQLResult<GetSpecialistProfileQuery>> => API.graphql(
  graphqlOperation(getSpecialistProfile, options),
) as GraphQLResult<GetSpecialistProfileQuery>;

export default fetchSpecialistAvailability;
