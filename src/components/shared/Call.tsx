import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { MeetingStateType } from "../../types";
import Layout from "../styling/Layout";
import OfflineCall from "./OfflineCall";
import OnlineCallOverData from "./OnlineCallOverData";
import OnlineCallOverPhone from "./OnlineCallOverPhone";

const Call = (): ReactElement => {
  const history = useHistory<MeetingStateType>();
  const state = history.location?.state;

  /** Must have some kind of state */
  if (!state) {
    history.push("/firstResponder");
    return <div></div>;
  }
  return navigator.onLine ? <OnlineCallOverData /> : <OnlineCallOverPhone />;
};

export default Call;
