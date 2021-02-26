import { API, graphqlOperation } from "aws-amplify";
import { DeleteAttendeeMutationVariables, GetAttendeeQuery, GetAttendeeQueryVariables } from "../../API";
import { deleteAttendee } from "../../graphql/mutations";

const removeAttendee = async (
  options: DeleteAttendeeMutationVariables
): Promise<void> => {
  API.graphql(
    graphqlOperation(deleteAttendee, options)
  );
};

export default removeAttendee;
