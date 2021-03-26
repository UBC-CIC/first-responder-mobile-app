import { API, graphqlOperation } from "aws-amplify";
import { DeleteAttendeeDataMutationVariables } from "../../API";
import { deleteAttendeeData } from "../../graphql/mutations";

const removeAttendee = async (
  options: DeleteAttendeeDataMutationVariables,
): Promise<void> => {
  API.graphql(
    graphqlOperation(deleteAttendeeData, options),
  );
};

export default removeAttendee;
