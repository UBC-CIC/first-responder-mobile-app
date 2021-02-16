import { Button } from "@material-ui/core";
import React, { ReactElement, useState } from "react";
import { createChimeMeeting, joinChimeMeeting } from "../../graphql/mutations";
import Layout from "../styling/Layout";
import { API, graphqlOperation } from "aws-amplify";
import Amplify from "aws-amplify";
import config from "../../aws-exports";
import { GraphQLResult } from "@aws-amplify/api";
import {
  CreateChimeMeetingMutation,
  JoinChimeMeetingMutation,
  JoinChimeMeetingMutationVariables,
} from "../../API";
import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration,
  RemovableAnalyserNode,
} from "amazon-chime-sdk-js";

import { MicrophoneActivity } from "amazon-chime-sdk-component-library-react";
Amplify.configure(config);
const OnlineCall = (): ReactElement => {
  const [meetingSession, setMeetingSession] = useState<DefaultMeetingSession>();
  const [analyser, setAnalyser] = useState<RemovableAnalyserNode | null>();
  const [frequencyData, setFrequencyData] = useState(new Float32Array());
  const createMeeting = () => {
    return API.graphql(
      graphqlOperation(createChimeMeeting, { title: "theboys" })
    ) as GraphQLResult<CreateChimeMeetingMutation>;
  };

  const joinMeeting = (options: JoinChimeMeetingMutationVariables) => {
    return API.graphql(
      graphqlOperation(joinChimeMeeting, options)
    ) as GraphQLResult<JoinChimeMeetingMutation>;
  };

  const handleCreateandJoinMeeting = async (title: string, name: string) => {
    const joinRes = await joinMeeting({ title, name });
    console.log(joinRes);
    const logger = new ConsoleLogger("MeetingLogs", LogLevel.INFO);
    const deviceController = new DefaultDeviceController(logger);
    const meeting = joinRes.data?.joinChimeMeeting?.Meeting;
    const attendee = joinRes.data?.joinChimeMeeting?.Attendee;
    const configuration = new MeetingSessionConfiguration(meeting, attendee);
    const meet = new DefaultMeetingSession(
      configuration,
      logger,
      deviceController
    );
    setMeetingSession(meet);
    try {
      const audioInputs: MediaDeviceInfo[] = await meet.audioVideo.listAudioInputDevices();
      const videoInputs: MediaDeviceInfo[] = await meet.audioVideo.listVideoInputDevices();
      await meet.audioVideo.chooseVideoInputDevice(videoInputs[0].deviceId);
      await meet.audioVideo.chooseAudioInputDevice(audioInputs[0].deviceId);

      const audioNode = meet.audioVideo.createAnalyserNodeForAudioInput();
      setAnalyser(audioNode);
    } catch (err) {
      // handle error - unable to acquire audio device perhaps due to permissions blocking
    }
    const audioOutputElement = document.getElementById("meeting-audio");
    const videoOutputElement = document.getElementById("meeting-video");

    console.log(videoOutputElement?.id);
    console.log(audioOutputElement?.id);

    // await meet.audioVideo.bindVideoElement(
    //   0,
    //   videoOutputElement as HTMLVideoElement
    // );

    // meet.audioVideo.startVideoPreviewForVideoInput(
    //   videoOutputElement as HTMLVideoElement
    // );
    await meet.audioVideo.bindAudioElement(
      audioOutputElement as HTMLAudioElement
    );

    meet.audioVideo.start();
  };

  return (
    <Layout title="Online Call">
      <Button onClick={() => handleCreateandJoinMeeting("theboys", "Trevor")}>
        Create Meeting
      </Button>
      <video
        id="meeting-video"
        style={{
          zIndex: 100,
          border: "1px solid black",
          width: "100%",
        }}
      ></video>
      <audio
        id="meeting-audio"
        style={{ width: "100%", border: "1px solid black" }}
      ></audio>
      <Button
        onClick={async () =>
          console.log(await meetingSession?.audioVideo.listAudioInputDevices())
        }
      >
        List Audio Devices
      </Button>
      <Button
        onClick={() => {
          const floats: Float32Array = new Float32Array(
            analyser?.frequencyBinCount || 0
          );
          analyser?.getFloatFrequencyData(floats);
          console.log(floats);
          setFrequencyData(floats);
        }}
      >
        freqData
      </Button>
    </Layout>
  );
};

export default OnlineCall;
