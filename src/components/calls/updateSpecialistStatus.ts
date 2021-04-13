import { API, Auth, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { updateSpecialistProfile as updateSpecialistProfileGraphql } from "./graphql/specialistProfile";
import { UpdateSpecialistProfileInput, UpdateSpecialistProfileMutation, UpdateSpecialistProfileMutationVariables } from "../../API";
import { CognitoUser } from "../../types";

const updateSpecialistStatus = async (value: boolean, phone_number: string): Promise<GraphQLResult<UpdateSpecialistProfileMutation>> => {
  if (value) {
    return API.graphql(
      graphqlOperation(updateSpecialistProfileGraphql, {
        input: {
          user_status: "AVAILABLE",
          phone_number,
        } as UpdateSpecialistProfileInput,
      }),
    ) as GraphQLResult<UpdateSpecialistProfileMutation>;
  }

  return API.graphql(
    graphqlOperation(updateSpecialistProfileGraphql, {
      input: {
        user_status: "OFFLINE",
        phone_number,
      },
    }),
  ) as GraphQLResult<UpdateSpecialistProfileMutation>;
};

export default updateSpecialistStatus;
