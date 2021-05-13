/** Roster Logic and Display */
import {
  MicrophoneActivity,
  Roster,
  RosterAttendee,
  RosterGroup,
  RosterHeader,
} from "amazon-chime-sdk-component-library-react";
import React, { ReactElement, useEffect, useState } from "react";
import { AttendeeType, RosterType } from "../../../types";

/** Displays attendees in UI, with name and role
 * if available in the meeting-detail.attendees column in DDB  */
const RosterDisplay = ({
  attendees,
  roster,
  noMicIcon,
}: {
  attendees: AttendeeType[];
  roster: RosterType;
  noMicIcon?: boolean;
}): ReactElement => {
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    setRerender(!rerender);
  }, [roster, attendees]);
  const attendeeItems = attendees.map((attendee) => {
    const { chimeAttendeeId, user_role } = attendee;

    if (!roster[chimeAttendeeId] || !chimeAttendeeId) return null;

    return (
      <RosterAttendee
        subtitle={user_role || ""}
        key={chimeAttendeeId}
        attendeeId={chimeAttendeeId}
        microphone={<MicrophoneActivity attendeeId={chimeAttendeeId} />}
      />
    );
  });

  const attendeeItemsLeft = attendees.map((attendee) => {
    const {
      chimeAttendeeId, user_role, first_name, last_name,
    } = attendee as any;

    if (!roster[chimeAttendeeId]) {
      return (
        <RosterAttendee
          subtitle={first_name ? `${first_name} ${last_name}` : user_role || ""}
          key={chimeAttendeeId}
          attendeeId={chimeAttendeeId}
          microphone={<div />}
        />
      );
    } return undefined;
  }).filter(Boolean);

  const rosterJSON = JSON.parse(JSON.stringify(roster));

  return (
    <Roster>
      <RosterHeader title="Present" badge={Object.values(rosterJSON).length} />
      <RosterGroup>{attendeeItems}</RosterGroup>
      {attendeeItemsLeft.length > 0 && (
        <>
          <RosterHeader title="Left" />
          <RosterGroup>{attendeeItemsLeft}</RosterGroup>
        </>
      )}
    </Roster>
  );
};
export default RosterDisplay;
