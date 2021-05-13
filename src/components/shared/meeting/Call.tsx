import React, { ReactElement, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MeetingStateType } from "../../../types";
import OfflineContext from "../../context/OfflineContext";
import { useQuery } from "../../hooks/useQuery";
import OfflineCall from "./OfflineCall";
import OnlineCallOverData from "./OnlineCallOverData";

/** Shows user a call screen according to their internet connection */
const Call = (): ReactElement => {
  const history = useHistory<MeetingStateType>();
  const params = useQuery();
  const state = history.location?.state;
  const { offline } = useContext(OfflineContext);

  const validateQueryParams = (paramsToTest: URLSearchParams) => paramsToTest.has("p") && paramsToTest.has("m");
  /** Must have some kind of state */
  if (!state && !validateQueryParams(params)) {
    history.push("/main");
    return <div />;
  }

  if (offline || state?.offline || !navigator.onLine) return <OfflineCall />;
  return <OnlineCallOverData />;
};

export default Call;
