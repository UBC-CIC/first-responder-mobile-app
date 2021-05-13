import {
  AudioInputControl,
  AudioOutputControl,
  ControlBar,
  VideoInputControl,
} from "amazon-chime-sdk-component-library-react";
import React from "react";
import "../../../styles/ControlStyle.css";
import EndMeetingControl from "./EndMeetingControl";

const MeetingControls = ({
  meetingId,
  handleEndMeeting,
}: {
  meetingId: string;
  handleEndMeeting: () => void;
}) => (
  <div className="controller active controls">
    <ControlBar
      responsive
      className="controls-menu"
      layout="undocked-horizontal"
      showLabels
    >
      <AudioInputControl />
      <AudioOutputControl />
      <VideoInputControl />
      <EndMeetingControl
        meetingId={meetingId}
        handleEndMeeting={handleEndMeeting}
      />
    </ControlBar>
  </div>
);

export default MeetingControls;
