import { MeetingDetail } from "../../API";
import { onCreateMeetingDetail, onUpdateMeetingDetail } from "../../graphql/subscriptions";
import { subscribeGraphQL } from "./subscribeGraphQL";

export const relevantMeetingSubscription = () => {
  subscribeGraphQL<MeetingDetail>(onCreateMeetingDetail, (value) => {
    console.log(value);
  });
};
