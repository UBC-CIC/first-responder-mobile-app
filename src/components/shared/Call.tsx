import React, { ReactElement, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MeetingStateType } from "../../types";
import OfflineContext from "../context/OfflineContext";
import OfflineCall from "./OfflineCall";
import OnlineCallOverData from "./OnlineCallOverData";

const Call = (): ReactElement => {
  const history = useHistory<MeetingStateType>();
  const state = history.location?.state;
  const { offline } = useContext(OfflineContext);
  /** Must have some kind of state */
  if (!state) {
    history.push("/firstResponder");
    return <div></div>;
  }

  if (offline || state.offline || !navigator.onLine) return <OfflineCall />;
  else return <OnlineCallOverData />;
};

export default Call;
