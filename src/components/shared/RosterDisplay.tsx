import {
  Roster,
  RosterAttendee,
  RosterGroup,
  RosterHeader,
} from "amazon-chime-sdk-component-library-react";
import { ReactElement } from "react";
import { AttendeeType } from "../../types";

const RosterDisplay = ({
  attendees,
}: {
  attendees: AttendeeType[];
}): ReactElement => {
  const attendeeItems = attendees.map((attendee) => {
    const { chimeAttendeeId, name, role } = attendee;
    return (
      <RosterAttendee
        subtitle={role}
        key={chimeAttendeeId}
        attendeeId={chimeAttendeeId}
      />
    );
  });

  return (
    <Roster>
      <RosterHeader
        title="Present"
        badge={attendees.length}
      />
      <RosterGroup>{attendeeItems}</RosterGroup>
    </Roster>
  );
};
export default RosterDisplay;
