import { createContext } from "react";

type AttendeeContextType = {
  chimeAttendeeId?: string | undefined;
};

const context = createContext<AttendeeContextType>({
  chimeAttendeeId: "",
});

export default function getMeetingStatusContext(): React.Context<AttendeeContextType> {
  return context;
}
