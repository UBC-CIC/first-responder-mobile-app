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
});

const OnlineCallOverData = (): ReactElement => {
  const { toggleVideo: toggleLocalVideo } = useLocalVideo();
  const classes = useStyles();
  const audioVideo = useAudioVideo();
  const meetingManager = useMeetingManager();
  const { roster } = useRosterState();
  const phone = usePhoneNumber();
  const history = useHistory<MeetingStateType>();
  const state = history.location?.state;
  const metrics = useBandwidthMetrics();
  const [localVideoShown, setLocalVideoShown] = useState(false);
  const [attendees, setAttendees] = useState([] as AttendeeType[]);
  const [snackbarShown, setSnackbarShown] = React.useState(false);
  const [connectionState, setConnectionState] = useState<ConnectionState>(
    ConnectionState.UNKNOWN
  );
  const [packetLoss, setPacketLoss] = useState(0);
  const [lossCount, setLossCount] = useState(0);

  /** On mount */
  useEffect(() => {
    handleCreateandJoinMeeting(
      state.meetingId,
      state.name,
      state.role,
      state.attendeeId,
      phone as string
    );
    meetingManager.getAttendee = async (chimeAttendeeId) => {
      try {
        const res = await fetchAttendee({ id: chimeAttendeeId });

        if (res.errors) {
          console.error(res.errors);
        }
        return Promise.resolve({ name: res.data?.getAttendee?.name });
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

      if (newAtt.data?.listAttendees?.items) {
        const items = newAtt.data.listAttendees?.items?.map(
          (item) =>
            ({
              chimeAttendeeId: item?.id,
              ...item,
            } as AttendeeType)
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
      meetingManager.start();
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
      setConnectionState(ConnectionState.POOR);
    } else if (metrics.availableOutgoingBandwidth < 100 || packetLoss > 0) {
      handleDisableVideo();
      setConnectionState(ConnectionState.POOR);
    } else if (metrics.availableOutgoingBandwidth < 500) {
      setConnectionState(ConnectionState.FAIR);
    } else {
      setSnackbarShown(false);
      setConnectionState(ConnectionState.GOOD);
    }
  }, [metrics.availableOutgoingBandwidth, packetLoss]);

  const handleSuggestPSTN = () => {
    console.log("I suggest using PSTN");
    handleDisableVideo();
    setConnectionState(ConnectionState.POOR);
  };

  const handleCreateandJoinMeeting = async (
    title: string,
    name: string,
    role: string,
    externalAttendeeId: string,
    phoneNumber: string
  ) => {
    /** Get Meeting data from Lambda call to DynamoDB */
    try {
      const joinRes = await joinMeeting({
        title,
        name,
        role,
        externalAttendeeId,
        phoneNumber,
      });

      const meetingInfo = joinRes.data?.joinChimeMeeting?.Meeting;
      const attendeeInfo = {
        ...joinRes.data?.joinChimeMeeting?.Attendee,
        name,
      } as AttendeeInfoType;

      await meetingManager.join({ meetingInfo, attendeeInfo });
    } catch (e) {
      console.error(e);
    }
  };

  const handleLeaveMeeting = () => {
    meetingManager.leave();
  };

  const handleToggleCamera = () => {
    if (connectionState === ConnectionState.POOR) {
      setSnackbarShown(true);
    } else {
      toggleVideo();
    }
  };

  const toggleVideo = (toSet?: boolean) => {
    if (toSet === undefined || toSet != localVideoShown) toggleLocalVideo();
    setLocalVideoShown(toSet || !localVideoShown);
  };

  const handleDisableVideo = () => {
    console.log("disable video");
    audioVideo
      ?.getAllRemoteVideoTiles()
      .forEach((tile) => audioVideo.pauseVideoTile(tile.id()));
    audioVideo?.stopLocalVideoTile();
    setSnackbarShown(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarShown(false);
  };

  return (
    <Layout title="Online Call" parent={state.parent}>
      <div style={{ color: "white" }}>
        Connection State: {ConnectionState[connectionState]}
      </div>
      <div className="video-container">
        <VideoTileGrid
          layout="standard"
          noRemoteVideoView={
            // TODO Convert into smarter component
            <div>
              <div style={{ color: "white", minHeight: "300px" }}>
                Nobody is sharing video at the moment
              </div>
            </div>
          }
        />
        <Button onClick={() => handleToggleCamera()}>Toggle</Button>
        <MicSelection />
        <SpeakerSelection />
        <RosterDisplay roster={roster} attendees={attendees} />
      </div>
      <Snackbar
        open={snackbarShown}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{ className: classes.snackBar }}
        action={<SnackBarActions handleClose={handleClose} />}
        message="Current connection cannot support video."
      ></Snackbar>
    </Layout>
  );
};

export default OnlineCallOverData;
