import {
  Roster,
  RosterAttendee,
  RosterGroup,
  RosterHeader,
} from "amazon-chime-sdk-component-library-react";
import { RosterType } from "amazon-chime-sdk-component-library-react/lib/types";
import { ReactElement } from "react";
import { AttendeeType } from "../../types";

const RosterDisplay = ({
  attendees,
  roster,
  noMicIcon,
}: {
  attendees: AttendeeType[];
  roster: RosterType;
  noMicIcon?: boolean;
}): ReactElement => {
  const attendeeItems = attendees.map((attendee) => {
    const { chimeAttendeeId, role } = attendee;
    if (!roster[chimeAttendeeId]) return;
    if (noMicIcon && role === "First Responder") {
      return (
        <RosterAttendee
          subtitle={role}
          key={chimeAttendeeId}
          attendeeId={chimeAttendeeId}
          microphone={<div />}
        />
      );
    }
    return (
      <RosterAttendee
        subtitle={role}
        key={chimeAttendeeId}
        attendeeId={chimeAttendeeId}
      />
    );
  });

  const rosterJSON = JSON.parse(JSON.stringify(roster));

  return (
    <Roster>
      <RosterHeader title="Present" badge={Object.keys(rosterJSON).length} />
      <RosterGroup>{attendeeItems}</RosterGroup>
    </Roster>
  );
};
export default RosterDisplay;
