import { Button, makeStyles, Snackbar } from "@material-ui/core";
import {
  MicSelection,
  SpeakerSelection,
  useAudioVideo,
  useBandwidthMetrics,
  useLocalVideo,
  useMeetingManager,
  useRosterState,
  VideoTileGrid,
} from "amazon-chime-sdk-component-library-react";
import React, { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/VideoCall.css";
import CloseIcon from "@material-ui/icons/Close";
import PhoneIcon from "@material-ui/icons/Phone";
import {
  AttendeeInfoType,
  AttendeeType,
  ConnectionState,
  MeetingStateType,
} from "../../types";
import { fetchAttendee, joinMeeting, listMeetingAttendees } from "../calls";
import usePhoneNumber from "../hooks/usePhoneNumber";
import Colors from "../styling/Colors";
import Layout from "../ui/Layout";
import SnackBarActions from "../ui/Alert";
import RosterDisplay from "./RosterDisplay";

const MAX_LOSS = 5;

const useStyles = makeStyles({
  snackBar: {
    backgroundColor: Colors.theme.warning,
    color: Colors.theme.onyx,
  },
  suggestion: {
    backgroundColor: Colors.theme.error,
    color: Colors.theme.platinum,
  },
});

const OnlineCallOverData = (): ReactElement => {
  const { toggleVideo: toggleLocalVideo } = useLocalVideo();
  const classes = useStyles();
  const audioVideo = useAudioVideo();
  const meetingManager = useMeetingManager();
  const { roster } = useRosterState();
  const history = useHistory<MeetingStateType>();
  const state = history.location?.state;
  const phone = usePhoneNumber() || state.meetingId;
  const metrics = useBandwidthMetrics();
  const [localVideoShown, setLocalVideoShown] = useState(false);
  const [attendees, setAttendees] = useState([] as AttendeeType[]);
  const [warningShown, setWarningShown] = React.useState(false);
  const [suggestionShown, setSuggestionShown] = React.useState(false);
  const [connectionState, setConnectionState] = useState<ConnectionState>(
    ConnectionState.UNKNOWN,
  );
  const [packetLoss, setPacketLoss] = useState(0);
  const [lossCount, setLossCount] = useState(0);

  /** On mount */
  useEffect(() => {
    console.log({ ...state, phone });
    const f = async () => {
      await handleCreateandJoinMeeting(
        state.meetingId,
        state.name,
        state.role,
        state.attendeeId,
        phone as string,
      );
    };
    f();
    meetingManager.getAttendee = async (chimeAttendeeId) => {
      try {
        const res = await fetchAttendee({ id: chimeAttendeeId });

        if (res.errors) {
          console.error(res.errors);
        }
        return Promise.resolve({ name: res.data?.getAttendeeData?.name });
      } catch (e) {
        console.error("Failed to get attendee's name: ", e);

        return {};
      }
    };

    return handleLeaveMeeting;
  }, []);

  /** On change of roster */
  useEffect(() => {
    const f = async () => {
      /** Get attendees from DB in order to tell their role */
      const newAtt = await listMeetingAttendees({
        filter: {
          meetingID: {
            eq: meetingManager.meetingId,
          },
        },
      });

      if (newAtt.data?.listAttendeeData?.items) {
        const items = newAtt.data.listAttendeeData?.items?.map(
          (item) => ({
            chimeAttendeeId: item?.id,
            ...item,
          } as AttendeeType),
        );
        setAttendees(items);
      }
    };
    if (meetingManager.meetingId) f();
  }, [roster]);

  /** On change of audio/video when call starts */
  useEffect(() => {
    const f = async () => {
      /** Get and Bind User Devices to Chime Infrastructure */
      if (!meetingManager) return;
      meetingManager.audioVideoObservers.metricsDidReceive = (metric) => {
        const loss = metric.getObservableMetrics()
          .audioPacketsReceivedFractionLoss;
        setPacketLoss(loss);
      };
      await meetingManager.start();
    };

    f();
  }, [audioVideo]);
  /** On change of Bandwidth upload speed */
  useEffect(() => {
    if (packetLoss > 0) {
      if (lossCount + 1 > MAX_LOSS) {
        handleSuggestPSTN();
      } else {
        setLossCount(lossCount + 1);
      }
    }

    if (metrics.availableOutgoingBandwidth == null || packetLoss > 0) {
      setConnectionState(ConnectionState.UNKNOWN);
    } else if (metrics.availableOutgoingBandwidth < 100 || packetLoss > 0) {
      handleDisableVideo();
      setConnectionState(ConnectionState.POOR);
    } else if (metrics.availableOutgoingBandwidth < 500) {
      setConnectionState(ConnectionState.FAIR);
    } else {
      setWarningShown(false);
      setConnectionState(ConnectionState.GOOD);
    }
  }, [metrics.availableOutgoingBandwidth, packetLoss]);

  const handleSuggestPSTN = () => {
    setSuggestionShown(true);
    handleDisableVideo();
    setConnectionState(ConnectionState.POOR);
  };

  const handleCreateandJoinMeeting = async (
    title: string,
    name: string,
    role: string,
    externalAttendeeId: string,
    phoneNumber: string,
  ) => {
    /** Get Meeting data from Lambda call to DynamoDB */
    try {
      console.log({
        title, name, role, externalAttendeeId, phoneNumber,
      });

      const joinRes = await joinMeeting({
        title,
        name,
        role,
        externalAttendeeId,
        phoneNumber,
      });

      console.log("success", joinRes);

      const meetingInfo = joinRes.data?.joinChimeMeeting?.Meeting;
      const attendeeInfo = {
        ...joinRes.data?.joinChimeMeeting?.Attendee,
        name,
      } as AttendeeInfoType;

      await meetingManager.join({ meetingInfo, attendeeInfo });
    } catch (e) {
      setSuggestionShown(true);
      console.error(e);
    }
  };

  const handleLeaveMeeting = () => {
    meetingManager.leave();
  };

  const handleToggleCamera = () => {
    if (connectionState === ConnectionState.POOR) {
      setWarningShown(true);
    } else {
      toggleVideo();
    }
  };

  const toggleVideo = (toSet?: boolean) => {
    if (toSet === undefined || toSet !== localVideoShown) toggleLocalVideo();
    setLocalVideoShown(toSet !== undefined ? toSet : !localVideoShown);
  };

  const handleDisableVideo = () => {
    console.log("disable video");
    toggleVideo(false);
    audioVideo
      ?.getAllRemoteVideoTiles()
      .forEach((tile) => audioVideo.pauseVideoTile(tile.id()));
    audioVideo?.stopLocalVideoTile();
    setWarningShown(true);
  };

  const handleSwitch = () => {
    if (meetingManager.meetingId) {
      console.log("calling +1 888 599 8558");
      document.location.href = "tel:+18885998558";
    } else {
      console.log("Creating New Meeting at +1 888 349 3697");
      document.location.href = "tel:+18883493697";
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setWarningShown(false);
  };

  return (
    <Layout title="Online Call" parent={state.parent}>
      <div style={{ color: "white" }}>
        Connection State:
        {" "}
        {ConnectionState[connectionState]}
      </div>
      {!suggestionShown ? (
        <div className="video-container">
          <VideoTileGrid
            layout="standard"
            // TODO Convert into smarter component
            noRemoteVideoView={
              (
                <div>
                  <div style={{ color: "white", minHeight: "300px" }}>
                    Nobody is sharing video at the moment
                  </div>
                </div>
              )
            }
          />
          <Button variant="contained" disabled={connectionState === ConnectionState.POOR} onClick={() => handleToggleCamera()}>Toggle Video</Button>
          <MicSelection />
          <SpeakerSelection />
          <RosterDisplay roster={roster} attendees={attendees} />
        </div>
      ) : (
        <Snackbar
          open={suggestionShown}
          onClose={handleClose}
          ContentProps={{ className: classes.suggestion }}
          action={(
            <SnackBarActions
              icon={<PhoneIcon fontSize="small" />}
              handleClose={() => {
                handleSwitch();
              }}
            />
          )}
          message="Click to switch to Voice over Telephone."
          onClick={() => {
            handleSwitch();
          }}
        />
      )}
      <Snackbar
        open={warningShown && !suggestionShown}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{ className: classes.snackBar }}
        action={(
          <SnackBarActions
            icon={<CloseIcon fontSize="small" />}
            handleClose={handleClose}
          />
        )}
        message="Current connection cannot support video."
      />
    </Layout>
  );
};

export default OnlineCallOverData;
