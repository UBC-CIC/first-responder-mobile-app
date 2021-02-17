import {
  Roster,
  RosterGroup,
  RosterHeader,
  RosterCell,
  useRosterState,
  RosterAttendee,
} from "amazon-chime-sdk-component-library-react";
import { ReactElement, useEffect } from "react";

// const RosterDisplay = (): ReactElement => {
//   const { roster } = useRosterState();
//   useEffect(() => {
//     console.log("From roster: ", roster);
//   });
//   return (
//     <Roster>
//       <RosterHeader
//         title="Present"
//         badge={2}
//         onClose={() => {
//           return;
//         }}
//         searchValue="Michael"
//         onSearch={() => {
//           return;
//         }}
//       />
//       <RosterGroup>
//         <RosterCell
//           name="Michael Scott"
//           subtitle="Regional Manager"
//           muted={false}
//           videoEnabled={true}
//         />
//         <RosterCell
//           name="Michael Scarn"
//           subtitle="FBI agent"
//           muted={true}
//           videoEnabled={false}
//         />
//       </RosterGroup>
//       <RosterGroup title="Disconnected" badge={2}>
//         <RosterCell name="Dwight" subtitle="Assistant regional manager" />
//         <RosterCell name="Mike the Magic" subtitle="Magician" />
//       </RosterGroup>
//     </Roster>
//   );
// };
// export default RosterDisplay;

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
