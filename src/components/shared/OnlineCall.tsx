import { Button } from "@material-ui/core";
import React, { ReactElement } from "react";
import { createChimeMeeting, joinChimeMeeting } from "../../graphql/mutations";
import Layout from "../styling/Layout";
import { API, graphqlOperation } from "aws-amplify";
import Amplify from "aws-amplify";
import config from "../../aws-exports";
import { GraphQLResult } from "@aws-amplify/api";
import {
  CreateChimeMeetingMutation,
  JoinChimeMeetingMutationVariables,
} from "../../API";
import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration,
} from "amazon-chime-sdk-js";

Amplify.configure(config);
const OnlineCall = (): ReactElement => {
  const createMeeting = () => {
    return API.graphql(
      graphqlOperation(createChimeMeeting, { title: "theboys" })
    ) as GraphQLResult<CreateChimeMeetingMutation>;
  };

  const joinMeeting = (options: JoinChimeMeetingMutationVariables) => {
    return API.graphql(
      graphqlOperation(joinChimeMeeting, options)
    ) as GraphQLResult<CreateChimeMeetingMutation>;
  };

  const handleCreateMeeting = async () => {
    console.log("hello");
    // const createRes = await createMeeting();
    // if (createRes.errors) {
    // console.log(createRes.errors);
    // } else {
    // const joinInfo = createRes?.data?.createChimeMeeting?.Meeting;
    const joinRes = await joinMeeting({ title: "theboys", name: "Trevor" });
    console.log(joinRes);
    const logger = new ConsoleLogger("MeetingLogs", LogLevel.INFO);
    const deviceController = new DefaultDeviceController(logger);
    // const configuration = new MeetingSessionConfiguration(
    // meetingResponse,
    // attendeeResponse
    // );
    // }
  };

  return (
    <Layout title="Online Call">
      <Button onClick={() => handleCreateMeeting()}>Create Meeting</Button>
    </Layout>
  );
};

export default OnlineCall;
