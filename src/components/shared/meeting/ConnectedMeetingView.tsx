import { makeStyles } from "@material-ui/core";
import { VideoTileGrid } from "amazon-chime-sdk-component-library-react";
import React, { useState } from "react";
import Chat from "./Chat";
import MeetingControls from "./MeetingControls";
import NoVideoView from "./NoVideoView";
import RosterDisplay from "./RosterDisplay";
import "../../../styles/VideoCall.css";
import { AttendeeType, RosterType } from "../../../types";
import Notes from "./Notes";

type ConnectedMeetingViewProps = {
    roster: RosterType;
    attendees: AttendeeType[];
    externalMeetingId: string;
    myAttendeeId: string;
    meetingId: string;
};

const useStyles = makeStyles({
  videoGrid: {
    gridTemplateColumns: "1fr 1fr !important",
    gridTemplateRows: "1fr 1fr !important",
    maxHeight: "500px",
  },
});

const ConnectedMeetingView = ({
  roster,
  attendees,
  externalMeetingId,
  myAttendeeId,
  meetingId,
}:ConnectedMeetingViewProps) => {
  const classes = useStyles();
  const [notes, setNotes] = useState(false);
  return (
    <div className="video-container">
      <RosterDisplay roster={roster} attendees={attendees} />

      <VideoTileGrid
        className={classes.videoGrid}
        layout="standard"
        noRemoteVideoView={(
          <NoVideoView />
        )}
      />

      <Notes meetingId={meetingId} externalMeetingId={externalMeetingId} show={notes} setShow={setNotes} />

      <MeetingControls
        handleToggle={() => setNotes(true)}
        meetingId={externalMeetingId}
        handleEndMeeting={() => {}}
      />

      <div style={{ overflow: "auto", flex: 1 }}>
        <Chat meetingId={externalMeetingId} attendeeId={myAttendeeId} attendees={roster} />
      </div>
    </div>
  );
};

export default ConnectedMeetingView;
