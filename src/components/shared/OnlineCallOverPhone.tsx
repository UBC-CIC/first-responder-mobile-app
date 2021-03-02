import { Button } from "@material-ui/core";
import {
  MicSelection,
  SpeakerSelection,
  useAudioVideo,
  useLocalVideo,
  useMeetingManager,
  useRosterState,
  VideoTileGrid,
} from "amazon-chime-sdk-component-library-react";
import React, { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DeleteAttendeeInput } from "../../API";
import "../../styles/VideoCall.css";
import { AttendeeInfoType, AttendeeType, MeetingStateType } from "../../types";
import {
  fetchAttendee,
  joinMeeting,
  listMeetingAttendees,
  removeAttendee,
} from "../calls";
import Layout from "../styling/Layout";
import RosterDisplay from "./RosterDisplay";

const OnlineCallOverPhone = (): ReactElement => {
  const { toggleVideo } = useLocalVideo();
  const audioVideo = useAudioVideo();
  const meetingManager = useMeetingManager();
  const { roster } = useRosterState();
  const history = useHistory<MeetingStateType>();
  const state = history.location?.state;
  const [myAttendeeInfo, setMyAttendeeInfo] = useState<
    undefined | AttendeeInfoType
  >();

  useEffect(() => {
    console.log("calling +1 888 651 1946");
    document.location.href = "tel:1-888-651-1946";
  }, []);

  const [attendees, setAttendees] = useState([] as AttendeeType[]);
  /** On mount */
  useEffect(() => {
    handleCreateandJoinMeeting(
      state.meetingId,
      state.name,
      state.role,
      state.attendeeId
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
    console.log(roster);
  }, [roster]);

  /** On change of audio/video when call starts */
  useEffect(() => {
    const f = async () => {
      /** Get and Bind User Devices to Chime Infrastructure */
      if (!audioVideo) return;
      audioVideo.chooseAudioInputDevice(null);
      audioVideo.start();
      toggleVideo();
    };
    f();

    return () => {
      audioVideo?.stop();
    };
  }, [audioVideo]);

  const handleCreateandJoinMeeting = async (
    title: string,
    name: string,
    role: string,
    externalAttendeeId: string
  ) => {
    /** Get Meeting data from Lambda call to DynamoDB */
    try {
      const joinRes = await joinMeeting({
        title,
        name,
        role,
        externalAttendeeId,
      });

      console.log("joinres", joinRes);

      const meetingInfo = joinRes.data?.joinChimeMeeting?.Meeting;
      const attendeeInfo = {
        ...joinRes.data?.joinChimeMeeting?.Attendee,
        name,
      } as AttendeeInfoType;

      console.log("attendeeInfo", attendeeInfo);

      setMyAttendeeInfo(attendeeInfo);

      await meetingManager.join({ meetingInfo, attendeeInfo });
    } catch (e) {
      console.error(e);
    }
  };

  const handleLeaveMeeting = () => {
    console.log(myAttendeeInfo);

    // removeAttendee({input: {id: myAttendeeInfo?.AttendeeId}});
    console.log("removed", myAttendeeInfo?.AttendeeId);
  };

  return (
    <Layout title="Online Call over Phone">
      <div
        style={{
          objectFit: "contain",
          height: "70%",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
        <Button onClick={toggleVideo}>Toggle</Button>
        <SpeakerSelection />
        <RosterDisplay noMicIcon roster={roster} attendees={attendees} />
      </div>
    </Layout>
  );
};

export default OnlineCallOverPhone;
