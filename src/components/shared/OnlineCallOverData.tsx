import {
  Button, Drawer, makeStyles, Snackbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PhoneIcon from "@material-ui/icons/Phone";
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
import { MeetingSessionStatusCode } from "amazon-chime-sdk-js";
import React, {
  ReactElement, useContext, useEffect, useState,
} from "react";
import { useHistory } from "react-router-dom";
import "../../styles/Call.css";
import "../../styles/VideoCall.css";
import {
  AttendeeInfoType,
  AttendeeType,
  ConnectionState,
  LatLong,
  MeetingStateType,
} from "../../types";
import { joinMeeting } from "../calls";
import fetchMeetingAttendees from "../calls/fetchMeetingAttendee";
import OfflineContext from "../context/OfflineContext";
import usePhoneNumber from "../hooks/usePhoneNumber";
import Colors from "../styling/Colors";
import SnackBarActions from "../ui/Alert";
import Layout from "../ui/Layout";
import Chat from "./Chat";
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
  videoGrid: {
    gridTemplateColumns: "1fr 1fr !important",
    gridTemplateRows: "1fr 1fr !important",
    maxHeight: "500px",
  },
  scrollContainer: {
    overflowY: "auto",
  },
  callContainer: {
    color: "white",
    paddingTop: "10px",
    paddingBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  selectText: { fontFamily: "Montserrat", textAlign: "center" },
});

const OnlineCallOverData = (): ReactElement => {
  const { offline, setOffline } = useContext(OfflineContext);
  const { toggleVideo: toggleLocalVideo } = useLocalVideo();
  const classes = useStyles();
  const audioVideo = useAudioVideo();
  const meetingManager = useMeetingManager();
  const { roster } = useRosterState();
  const history = useHistory<MeetingStateType>();
  const state = history.location?.state;
  const phone = state?.phoneNumber || usePhoneNumber();
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
  const [inMeeting, setInMeeting] = useState(false);
  const attendeeType = localStorage.getItem("firstresponderphonenumber")
    ? "FIRST_RESPONDER"
    : "SPECIALIST";

  /** On mount join meeting */
  useEffect(() => {
    const f = async () => {
      console.log(state.location);

      await handleCreateandJoinMeeting(
        state.meetingId,
        state.firstName,
        state.lastName,
        state.role,
        state.attendeeId,
        phone as string,
        attendeeType,
        state.organization,
        state.location,
      );
    };
    f();
    meetingManager.getAttendee = async (chimeAttendeeId) => {
      try {
        if (!meetingManager.meetingId) {
          return Promise.resolve({ name: "Attendee" });
        }
        const res = await fetchMeetingAttendees({ meeting_id: meetingManager.meetingId });

        if (res.errors) {
          console.error(res.errors);
          return Promise.resolve({ name: "Attendee" });
        }
        const fetchedAttendees = res.data?.getMeetingDetail?.attendees;

        if (!fetchedAttendees) { return Promise.resolve({ name: "Attendee" }); }

        const match = fetchedAttendees.find((attendee) => attendee?.attendee_id === chimeAttendeeId);
        if (!match) return Promise.resolve({ name: "Attendee" });
        if (match.first_name) {
          const fullName = `${match.first_name} ${match.last_name}`;
          if (match) return Promise.resolve({ name: fullName });
        }
        return Promise.resolve({ name: "Attendee" });
      } catch (e) {
        console.error("Failed to get attendee's name: ", e);

        return Promise.resolve({ name: "Attendee" });
      }
    };

    return handleLeaveMeeting;
  }, []);

  /** On change of roster, update roster with name and role */
  useEffect(() => {
    const f = async () => {
      /** Get attendees from DB in order to tell their role */
      if (!meetingManager.meetingId) return;
      const newAtt = await fetchMeetingAttendees({
        meeting_id: meetingManager.meetingId,
      });

      if (newAtt.data?.getMeetingDetail?.attendees) {
        const items = newAtt.data.getMeetingDetail?.attendees?.map(
          (attendee) => ({
            chimeAttendeeId: attendee?.attendee_id,
            ...attendee,
          } as AttendeeType),
        );
        setAttendees(items);
        setInMeeting(true);
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

      /* Handle End of Meeting / Kicked from Meeting */
      meetingManager.audioVideoDidStop = (sessionStatus) => {
        const sessionStatusCode = sessionStatus.statusCode();
        if (sessionStatusCode === MeetingSessionStatusCode.MeetingEnded) {
          /*
        - You (or someone else) have called the DeleteMeeting API action in your server application.
        - You attempted to join a deleted meeting.
        - No audio connections are present in the meeting for more than five minutes.
        - Fewer than two audio connections are present in the meeting for more than 30 minutes.
        - Screen share viewer connections are inactive for more than 30 minutes.
        - The meeting time exceeds 24 hours.
        See https://docs.aws.amazon.com/chime/latest/dg/mtgs-sdk-mtgs.html for details.
      */
          console.log("The session has ended");
        } else {
          console.log("Stopped with a session status code: ", sessionStatusCode, ":", MeetingSessionStatusCode[sessionStatusCode]);
        }
      };
      await meetingManager.start().catch((e) => console.error(e));
    };

    f();
  }, [audioVideo]);
  /** On change of Bandwidth upload speed, handle if connection is weak */
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
    meetingId: string,
    firstName: string,
    lastName: string,
    role: string,
    externalAttendeeId: string,
    phoneNumber: string,
    type: string,
    organization?: string,
    location?: LatLong,
  ) => {
    /** Get Meeting data from Lambda call to DynamoDB */
    try {
      const submitLocation = location || {
        latitude: null,
        longitude: null,
      };
      console.log(submitLocation);

      const joinRes = await joinMeeting({
        title: meetingId,
        firstName,
        lastName,
        role,
        externalAttendeeId,
        phoneNumber,
        attendeeType: type,
        organization,
        location: submitLocation,
      });

      const fullName = `${firstName} ${lastName}`;

      const meetingInfo = joinRes.data?.joinChimeMeeting?.Meeting;
      const attendeeInfo = {
        ...joinRes.data?.joinChimeMeeting?.Attendee,
        name: fullName,
      } as AttendeeInfoType;

      await meetingManager
        .join({ meetingInfo, attendeeInfo })
        .then(() => {
          if (joinRes.data) {
            console.log("success", joinRes);
          } else {
            console.error(joinRes.errors);
          }
        })
        .catch((e) => console.log(e));
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
    if (inMeeting) {
      console.log("calling +1 888 599 8558");
      document.location.href = "tel:+18885998558";
    } else {
      console.log("Creating New Meeting at +1 888 349 3697");
      document.location.href = "tel:+18883493697";
    }
  };

  const handleChangeToOffline = () => {
    console.log(inMeeting);
    // setOffline(true);
    setSuggestionShown(true);
    audioVideo?.stop();
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setWarningShown(false);
  };

  return (
    <Layout
      title="Online Call"
      parent={state.parent}
      onChangeToOffline={() => handleChangeToOffline()}
    >
      {!suggestionShown ? (
        <div className="video-container">
          <RosterDisplay roster={roster} attendees={attendees} />

          <VideoTileGrid
            className={classes.videoGrid}
            layout="standard"
            // TODO Convert into smarter component
            noRemoteVideoView={(
              <div>
                <div style={{ color: "white", minHeight: "300px" }}>
                  Nobody is sharing video at the moment
                </div>
              </div>
            )}
          />

          <Button
            variant="contained"
            disabled={connectionState === ConnectionState.POOR}
            onClick={() => handleToggleCamera()}
          >
            Toggle Video
          </Button>
          <div style={{ overflow: "auto", flex: 1 }}>
            <Chat meetingId={state.meetingId} attendeeId={state.attendeeId} attendees={roster} />
          </div>
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
        open={warningShown && !suggestionShown && inMeeting}
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
