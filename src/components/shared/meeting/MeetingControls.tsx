import { SpeakerNotes } from "@material-ui/icons";
import {
  AudioInputControl,
  AudioOutputControl,
  ControlBar,
  ControlBarButton,
  VideoInputControl,
} from "amazon-chime-sdk-component-library-react";
import React from "react";
import "../../../styles/ControlStyle.css";
import EndMeetingControl from "./EndMeetingControl";

const MeetingControls = ({
  meetingId,
  handleEndMeeting,
  handleToggle,
}: {
  meetingId: string;
  handleEndMeeting: () => void;
  handleToggle: () => void;
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
      <ControlBarButton
        className="mobile-toggle"
        icon={<SpeakerNotes />}
        onClick={handleToggle}
        label="Notes"
      />
      <EndMeetingControl
        meetingId={meetingId}
        handleEndMeeting={handleEndMeeting}
      />
    </ControlBar>
  </div>
);

export default MeetingControls;
