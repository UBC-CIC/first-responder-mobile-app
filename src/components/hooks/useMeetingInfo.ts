import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { MeetingStateType } from "../../types";
import { useQuery } from "./useQuery";

/** Gets phone number, meetingId, and attendeeId from either query params or the location state */
export const useMeetingInfo = () => {
  const history = useHistory<MeetingStateType>();
  const state = history.location?.state;
  const params = useQuery();

  const phoneBase64 = params.get("p");
  let phoneFromParams;
  if (phoneBase64) {
    phoneFromParams = `${Buffer.from(phoneBase64, "base64").toString("ascii")}`;
  }

  const meetingIdBase64 = params.get("m");
  let meetingIdFromParams;
  if (meetingIdBase64) {
    meetingIdFromParams = `${Buffer.from(meetingIdBase64, "base64").toString("ascii")}`;
  }
  const phone = phoneFromParams || state?.phoneNumber;
  const meetingId = meetingIdFromParams || state?.meetingId;
  const attendeeId = state?.attendeeId || uuid();
  const location = state?.location;
  return {
    phone, meetingId, attendeeId, location,
  };
};
