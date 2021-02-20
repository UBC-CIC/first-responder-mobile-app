import {
  Roster,
  RosterGroup,
  RosterHeader,
  RosterCell,
  useRosterState,
  RosterAttendee,
} from "amazon-chime-sdk-component-library-react";
import { ReactElement, useEffect } from "react";

const RosterDisplay = () => {
  const { roster } = useRosterState();
  const attendees = Object.values(roster);

  const attendeeItems = attendees.map((attendee) => {
    const { chimeAttendeeId, name } = attendee;
    return (
      <RosterAttendee
        subtitle="First Responder"
        muted={true}
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
        onClose={() => {
          return;
        }}
        onSearch={() => {
          return;
        }}
      />
      <RosterGroup>{attendeeItems}</RosterGroup>
    </Roster>
  );
};
export default RosterDisplay;
