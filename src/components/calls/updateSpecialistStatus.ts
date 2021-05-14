import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from "aws-amplify";
import { UpdateSpecialistProfileInput, UpdateSpecialistProfileMutation } from "../../API";
import { updateSpecialistProfile as updateSpecialistProfileGraphql } from "./graphql/specialistProfile";

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
