import { makeStyles } from "@material-ui/core";
import { VideoTileGrid } from "amazon-chime-sdk-component-library-react";
import React from "react";
import Chat from "./Chat";
import MeetingControls from "./MeetingControls";
import NoVideoView from "./NoVideoView";
import RosterDisplay from "./RosterDisplay";
import "../../../styles/VideoCall.css";
import { AttendeeType, RosterType } from "../../../types";

type ConnectedMeetingViewProps = {
    roster: RosterType;
    attendees: AttendeeType[];
    meetingId: string;
    myAttendeeId: string;
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
  meetingId,
  myAttendeeId,
}:ConnectedMeetingViewProps) => {
  const classes = useStyles();

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

      <MeetingControls
        meetingId={meetingId}
        handleEndMeeting={() => {}}
      />

      <div style={{ overflow: "auto", flex: 1 }}>
        <Chat meetingId={meetingId} attendeeId={myAttendeeId} attendees={roster} />
      </div>
    </div>
  );
};

export default ConnectedMeetingView;
