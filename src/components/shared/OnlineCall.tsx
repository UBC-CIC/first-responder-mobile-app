import { GraphQLResult } from "@aws-amplify/api";
import { Button } from "@material-ui/core";
import {
  LocalVideo,
  MicSelection,
  RemoteVideo,
  SpeakerSelection,
  useAudioVideo,
  useLocalVideo,
  useMeetingManager,
  useRosterState,
  VideoTileGrid,
} from "amazon-chime-sdk-component-library-react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import React, { ReactElement, useEffect } from "react";
import {
  GetAttendeeQuery,
  GetAttendeeQueryVariables,
  JoinChimeMeetingMutation,
  JoinChimeMeetingMutationVariables,
} from "../../API";
import config from "../../aws-exports";
import { joinChimeMeeting } from "../../graphql/mutations";
import { getAttendee } from "../../graphql/queries";
import "../../styles/VideoCall.css";
import Layout from "../styling/Layout";
import RosterDisplay from "./RosterDisplay";
import { v4 as uuid } from "uuid";

Amplify.configure(config);

const OnlineCall = (): ReactElement => {
  const { toggleVideo } = useLocalVideo();
  const audioVideo = useAudioVideo();
  const meetingManager = useMeetingManager();
  const { roster } = useRosterState();
  // const meetingId = uuid();
  const meetingId = "theboys";

  const fetchAttendee = (options: GetAttendeeQueryVariables) => {
    return API.graphql(graphqlOperation(getAttendee, options)) as Promise<
      GraphQLResult<GetAttendeeQuery>
    >;
  };
  const joinMeeting = (options: JoinChimeMeetingMutationVariables) => {
    return API.graphql(
      graphqlOperation(joinChimeMeeting, options)
    ) as GraphQLResult<JoinChimeMeetingMutation>;
  };

  /** On mount */
  useEffect(() => {
    handleCreateandJoinMeeting(meetingId, "Trevor");
    meetingManager.getAttendee = async (chimeAttendeeId) => {
      try {
        const res = await fetchAttendee({ id: chimeAttendeeId });
        console.log(res);

        if (res.errors) {
          console.error(res.errors);
        }
        return Promise.resolve({ name: res.data?.getAttendee?.Name });
      } catch (e) {
        console.log("Failed to get attendee's name: ", e);

        return {};
      }
    };
  }, []);

  /** On change of roster */
  useEffect(() => {
    const attendees = Object.values(roster);
    console.log(attendees);
  }, [roster]);

  /** On change of audio/video when call starts */
  useEffect(() => {
    const f = async () => {
      /** Get and Bind User Devices to Chime Infrastructure */
      if (!audioVideo) return;
      try {
        const audioInputs: MediaDeviceInfo[] = await audioVideo.listAudioInputDevices();
        const videoInputs: MediaDeviceInfo[] = await audioVideo.listVideoInputDevices();
        await audioVideo.chooseVideoInputDevice(videoInputs[0].deviceId);
        await audioVideo.chooseAudioInputDevice(audioInputs[0].deviceId);
      } catch (err) {
        // handle error - unable to acquire audio device perhaps due to permissions blocking
      }
      const audioOutputElement = document.getElementById("meeting-audio");
      // const videoOutputElement = document.getElementById("meeting-video");

      // await audioVideo.bindVideoElement(
      //   0,
      //   videoOutputElement as HTMLVideoElement
      // );

      // await audioVideo.bindAudioElement(audioOutputElement as HTMLAudioElement);

      audioVideo.start();
      toggleVideo();
    };
    if (audioVideo) f();
  }, [audioVideo]);

  const handleCreateandJoinMeeting = async (title: string, name: string) => {
    /** Get Meeting data from Lambda call to DynamoDB */
    const joinRes = await joinMeeting({ title, name });

    const meetingInfo = joinRes.data?.joinChimeMeeting?.Meeting;
    const attendeeInfo = { ...joinRes.data?.joinChimeMeeting?.Attendee, name };
    console.log(meetingInfo, attendeeInfo);

    await meetingManager.join({ meetingInfo, attendeeInfo });
  };

  return (
    <Layout title="Online Call">
      <div
        style={{
          objectFit: "contain",
          height: "70%",
          // minHeight: "100px",
          // maxHeight: "300px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <VideoTileGrid
          layout="standard"
          noRemoteVideoView={
            // TODO Convert into smarter component
            <div>
              {/* <LocalVideo />{" "} */}
              <div style={{ color: "white", minHeight: "300px" }}>
                Nobody is sharing video at the moment
              </div>
            </div>
          }
        />
        {/* <VideoTileGrid></VideoTileGrid>
        <LocalVideo
        // css={
        // "object-fit: contain; width: 100%; height: 100%; position: relative !important;  "
        // }
        />
        <RemoteVideo tileId={0} /> */}
        <Button onClick={toggleVideo}>Toggle</Button>
        <audio id="meeting-audio" style={{ display: "none" }}></audio>
        <MicSelection />
        <SpeakerSelection />
        <RosterDisplay />
      </div>
    </Layout>
  );
};

export default OnlineCall;
