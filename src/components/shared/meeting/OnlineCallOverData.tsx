/** Meeting Logic and Handler */
import { makeStyles, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {
  useAudioVideo,
  useBandwidthMetrics,
  useLocalVideo,
  useMeetingManager,
  useRosterState,
} from "amazon-chime-sdk-component-library-react";
import { MeetingSessionStatusCode } from "amazon-chime-sdk-js";
import React, {
  ReactElement, useEffect, useState,
} from "react";
import "../../../styles/Call.css";
import "../../../styles/VideoCall.css";
import {
  AttendeeType,

  LatLong,
} from "../../../types";
import { joinMeeting } from "../../calls";
import fetchMeetingAttendees from "../../calls/fetchMeetingAttendee";
import { useMeetingInfo } from "../../hooks/useMeetingInfo";
import Colors from "../../styling/Colors";
import SnackBarActions from "../../ui/Alert";
import Layout from "../../ui/Layout";
import ConnectedMeetingView from "./ConnectedMeetingView";
import MeetingEnded from "./MeetingEnded";
import PoorConnectionView from "./PoorConnectionView";

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

// eslint-disable-next-line no-shadow
export enum MeetingState {
  STARTING,
  CONNECTED,
  POOR,
  ENDED,
}

/** Controller and UI for Online Video Call. Renders Chat, Roster, Video,
 * and Input/Output selection. If a call has been started, and internet drops,
 * suggests the user to join a phone call over PSTN. If the call has not been started
 * and the internet drops, prompts the user to create a meeting over PSTN. Tracks the
 * quality of the call using audio packets. TODO: Add UI for being removed / call ending.
 */
const OnlineCallOverData = (): ReactElement => {
  const { toggleVideo: toggleLocalVideo } = useLocalVideo();
  const classes = useStyles();
  const audioVideo = useAudioVideo();
  const meetingManager = useMeetingManager();
  const { roster } = useRosterState();
  const {
    phone, meetingId: externalMeetingId, attendeeId, location: locationInfo,
  } = useMeetingInfo();
  const metrics = useBandwidthMetrics();
  const [localVideoShown, setLocalVideoShown] = useState(false);
  const [attendees, setAttendees] = useState([] as AttendeeType[]);
  const [warningShown, setWarningShown] = React.useState(false);
  const [packetLoss, setPacketLoss] = useState(0);
  const [lossCount, setLossCount] = useState(0);
  const [inMeeting, setInMeeting] = useState(false);
  const [myAttendeeId, setMyAttendeeId] = useState("");
  const [meetingState, setMeetingState] = useState(MeetingState.STARTING);

  /** On mount join meeting */
  useEffect(() => {
    const f = async () => {
      await handleCreateandJoinMeeting(
        phone as string,
        externalMeetingId,
        attendeeId,
        locationInfo,
      );
    };
    f();
    meetingManager.getAttendee = async (chimeAttendeeId) => {
      try {
        if (!meetingManager.meetingId) {
          console.error("Failed to get meeting Id");

          return Promise.resolve({ name: "Attendee" });
        }
        const res = await fetchMeetingAttendees({ meeting_id: meetingManager.meetingId });

        if (res.errors) {
          console.error(res.errors);
          return Promise.resolve({ name: "Attendee" });
        }
        const fetchedAttendees = res.data?.getMeetingDetail?.attendees;

        if (!fetchedAttendees) {
          console.error("No fetched attendees");

          return Promise.resolve({ name: "Attendee" });
        }

        let match = fetchedAttendees.find((attendee) => attendee?.attendee_id === chimeAttendeeId);

        if (!match) { match = attendees.find((attendee) => attendee.chimeAttendeeId === chimeAttendeeId) as any; }
        if (!match) {
          console.error("No match found");

          return Promise.resolve({ name: "Attendee" });
        }
        if (match.first_name) {
          const fullName = `${match.first_name} ${match.last_name}`;

          return Promise.resolve({ name: fullName });
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
      }
    };
    if (meetingManager.meetingId) f();
  }, [meetingManager.meetingId, roster]);

  /** On change of audio/video when call starts */
  useEffect(() => {
    const f = async () => {
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
          console.log("The session has ended");
          setMeetingState(MeetingState.ENDED);
        } else {
          setMeetingState(MeetingState.ENDED);
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
    if (!metrics.availableOutgoingBandwidth) return;
    if (metrics.availableOutgoingBandwidth < 100 || packetLoss > 0) {
      handleDisableVideo();
    } else {
      setWarningShown(false);
    }
  }, [metrics.availableOutgoingBandwidth, packetLoss]);

  /** Switches the view to an alert that links to  */
  const handleSuggestPSTN = () => {
    setMeetingState(MeetingState.POOR);
    handleDisableVideo();
  };

  /** Calls to lambda to join or create a meeting  */
  const handleCreateandJoinMeeting = async (
    phoneNumber: string,
    emid: string,
    externalAttendeeId: string,
    location?: LatLong,
  ) => {
    /** Get Meeting data from Lambda call to DynamoDB */
    try {
      const submitLocation = location || {
        latitude: null,
        longitude: null,
      };

      const joinRes = await joinMeeting({
        input: {
          phone_number: phoneNumber,
          external_attendee_id: externalAttendeeId,
          external_meeting_id: emid,
          location: submitLocation,
        },
      });

      const joinInfo = joinRes.data?.joinChimeMeeting;

      const meetingInfo = {
        MeetingId: joinInfo?.meeting_id,
        MediaPlacement: joinInfo?.media_placement,
        MediaRegion: joinInfo?.media_region,
      };

      const attendeeInfo = {
        AttendeeId: joinInfo?.attendee_id,
        ExternalUserId: joinInfo?.external_user_id,
        JoinToken: joinInfo?.join_token,
      } as any;

      setMyAttendeeId(joinInfo?.attendee_id as string);
      await meetingManager
        .join({ meetingInfo, attendeeInfo })
        .then(() => {
          if (joinInfo) {
            console.log("success", joinInfo);
            setInMeeting(true);
            setMeetingState(MeetingState.CONNECTED);
          } else {
            console.error(joinRes.errors);
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      setMeetingState(MeetingState.POOR);
      console.error(e);
    }
  };

  /** Handler for the useEffect  */
  const handleLeaveMeeting = () => {
    meetingManager.leave();
  };

  /** Toggle Camera Button event handler */
  const toggleVideo = (toSet?: boolean) => {
    if (toSet === undefined || toSet !== localVideoShown) toggleLocalVideo();
    setLocalVideoShown(toSet !== undefined ? toSet : !localVideoShown);
  };

  /** Disbles camera and warns user that connection cannot support video  */
  const handleDisableVideo = () => {
    toggleVideo(false);
    audioVideo
      ?.getAllRemoteVideoTiles()
      .forEach((tile) => audioVideo.pauseVideoTile(tile.id()));
    audioVideo?.stopLocalVideoTile();
    if (meetingState === MeetingState.CONNECTED) { setWarningShown(true); }
  };

  /** On click of warning, points user to either PSTNCreate or PSTNJoin depending on if the meeting was already created or not. */
  const handleSwitch = () => {
    if (inMeeting) {
      document.location.href = `tel:${process.env.REACT_APP_JOIN_PHONE_NUMBER}`;
    } else {
      document.location.href = `tel:${process.env.REACT_APP_CREATE_PHONE_NUMBER}`;
    }
  };

  /** If connection drops, show user a PSTN Suggestion */
  const handleChangeToOffline = () => {
    setMeetingState(MeetingState.POOR);
    audioVideo?.stop();
  };

  /** Handler for Snackbar UI */
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setWarningShown(false);
  };

  /** State Machine for Rendering correct components */
  const renderMeetingFromState = () => {
    if (!navigator.onLine) {
      setMeetingState(() => MeetingState.POOR);
    }
    switch (meetingState) {
    case MeetingState.POOR:
      return (
        <PoorConnectionView
          handleClose={handleClose}
          handleSwitch={handleSwitch}
          poorConnection
        />
      );
    case MeetingState.ENDED:
      return <MeetingEnded />;
    case MeetingState.STARTING:
    case MeetingState.CONNECTED:
      return (
        <ConnectedMeetingView
          roster={roster}
          meetingId={meetingManager.meetingId || ""}
          myAttendeeId={myAttendeeId}
          externalMeetingId={externalMeetingId}
          attendees={attendees}
        />
      );
    default:
      return <div> error view</div>;
    }
  };

  return (
    <Layout
      title="Online Conference"
      parent="/main"
      hideBackButton={meetingState === MeetingState.CONNECTED}
      onChangeToOffline={() => handleChangeToOffline()}
    >
      {renderMeetingFromState()}
      <Snackbar
        open={warningShown && meetingState !== MeetingState.POOR}
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
