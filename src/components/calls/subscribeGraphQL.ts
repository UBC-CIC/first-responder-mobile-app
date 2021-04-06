import { API, graphqlOperation } from "aws-amplify";
import { SubscriptionValue } from "../../types";

export function subscribeGraphQL<T>(subscription: any, callback: (value: T) => void) {
  // @ts-ignore
  return API.graphql(graphqlOperation(subscription)).subscribe({
    next: (response: SubscriptionValue<T>) => {
      callback(response.value.data);
    },
  });
}
