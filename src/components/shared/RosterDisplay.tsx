import {
  Roster,
  RosterAttendee,
  RosterGroup,
  RosterHeader,
} from "amazon-chime-sdk-component-library-react";
import { ReactElement, useEffect, useState } from "react";
import { FR_NAME } from "../../Constants";
import { AttendeeType, RosterType } from "../../types";

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
    console.log(attendees);
    console.log(Object.values(roster));
    setRerender(!rerender);
  }, [roster, attendees]);
  const attendeeItems = attendees.map((attendee) => {
    const { chimeAttendeeId, user_role } = attendee;

    const matchedAttendee = Object.values(roster).find((currAttendee) => currAttendee.chimeAttendeeId === chimeAttendeeId);
    const matchedChimeID = matchedAttendee?.chimeAttendeeId;

    if (noMicIcon && user_role === FR_NAME.full) {
      return (
        <RosterAttendee
          subtitle={user_role}
          key={matchedChimeID}
          attendeeId={matchedChimeID as string}
          microphone={<div />}
        />
      );
    }
    return (
      <RosterAttendee
        subtitle={user_role}
        key={matchedChimeID}
        attendeeId={matchedChimeID as string}
      />
    );
  });

  const rosterJSON = JSON.parse(JSON.stringify(roster));
  // console.log("ROSTER GOT ATTENDEES: ", attendees);

  return (
    <Roster>
      <RosterHeader title="Present" badge={Object.values(rosterJSON).length} />
      <RosterGroup>{attendeeItems}</RosterGroup>
    </Roster>
  );
};
export default RosterDisplay;
