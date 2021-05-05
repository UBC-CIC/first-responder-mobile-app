import React, { ReactElement, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { MeetingStateType } from "../../types";
import OfflineContext from "../context/OfflineContext";
import OfflineCall from "./OfflineCall";
import OnlineCallOverData from "./OnlineCallOverData";

export const useQuery = () => {
  const params = new URLSearchParams(useLocation().search);
  return params;
};

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
