import { MeetingDetail } from "../../API";
import listAllMeetingDetails from "./listMeetingDetails";

export const getRelevantMeetings = async (phoneNumber: string): Promise<undefined | MeetingDetail[]> => {
  console.log(phoneNumber);

  const res = await listAllMeetingDetails({
    filter: {
      meeting_status: {
        eq: "ACTIVE",
      },
    },
    limit: 500,
  });
  if (!res.data?.listMeetingDetails?.items) {
    console.error(res.errors);
  } else {
    if (!res.data?.listMeetingDetails?.items) return;
    const meetings: MeetingDetail[] = res.data?.listMeetingDetails?.items;
    const filteredMeetings = meetings?.filter((meeting) => !!meeting?.attendees?.find((attendee) => attendee?.phone_number === phoneNumber));
    return filteredMeetings;
  }
};
