import { MeetingDetail } from "../../API";
import { onCreateMeetingDetail } from "../../graphql/subscriptions";
import { subscribeGraphQL } from "./subscribeGraphQL";

export const relevantMeetingSubscription = () => {
  subscribeGraphQL<MeetingDetail>(onCreateMeetingDetail, (value) => {
    console.log(value);
  });
};
