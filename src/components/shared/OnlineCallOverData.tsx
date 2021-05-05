import {
  Button, makeStyles, Snackbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PhoneIcon from "@material-ui/icons/Phone";
import {
  useAudioVideo,
  useBandwidthMetrics,
  useLocalVideo,
  useMeetingManager,
  useRosterState,
  VideoTileGrid,
} from "amazon-chime-sdk-component-library-react";
import { MeetingSessionStatusCode } from "amazon-chime-sdk-js";
import React, {
  ReactElement, useEffect, useState,
} from "react";
import "../../styles/Call.css";
import "../../styles/VideoCall.css";
import {
  AttendeeType,
  ConnectionState,
  LatLong,
} from "../../types";
import { joinMeeting } from "../calls";
import fetchMeetingAttendees from "../calls/fetchMeetingAttendee";
import { useMeetingInfo } from "../hooks/useMeetingInfo";
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
  const { toggleVideo: toggleLocalVideo } = useLocalVideo();
  const classes = useStyles();
  const audioVideo = useAudioVideo();
  const meetingManager = useMeetingManager();
  const { roster } = useRosterState();
  const {
    phone, meetingId, attendeeId, location: locationInfo,
  } = useMeetingInfo();
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
  const [myAttendeeId, setMyAttendeeId] = useState("");
  /** On mount join meeting */
  useEffect(() => {
    const f = async () => {
      await handleCreateandJoinMeeting(
        phone as string,
        meetingId,
        attendeeId,
        locationInfo,
      );
    };
    f();
    meetingManager.getAttendee = async (chimeAttendeeId, externalUserId) => {
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

  /** Switches the view to an alert that links to  */
  const handleSuggestPSTN = () => {
    setSuggestionShown(true);
    handleDisableVideo();
    setConnectionState(ConnectionState.POOR);
  };

  /** Calls to lambda to join or create a meeting  */
  const handleCreateandJoinMeeting = async (
    phoneNumber: string,
    externalMeetingId: string,
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
          external_meeting_id: externalMeetingId,
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

  /** Handler for the useEffect  */
  const handleLeaveMeeting = () => {
    meetingManager.leave();
  };

  /** Wrapper for the Chime SDK toggle function. Does not enable camera if connection is poor */
  const handleToggleCamera = () => {
    if (connectionState === ConnectionState.POOR) {
      setWarningShown(true);
    } else {
      toggleVideo();
    }
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
    setWarningShown(true);
  };

  /** On click of warning, points user to either PSTNCreate or PSTNJoin depending on if the meeting was already created or not. */
  const handleSwitch = () => {
    if (inMeeting) {
      document.location.href = "tel:+18885998558";
    } else {
      document.location.href = "tel:+18883493697";
    }
  };
  /** If connection drops, show user a PSTN Suggestion */
  const handleChangeToOffline = () => {
    setSuggestionShown(true);
    audioVideo?.stop();
  };

  /** Handler for Snackbar UI */
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setWarningShown(false);
  };

  return (
    <Layout
      title="Online Conference"
      parent="/main"
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
            <Chat meetingId={meetingId} attendeeId={myAttendeeId} attendees={roster} />
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
