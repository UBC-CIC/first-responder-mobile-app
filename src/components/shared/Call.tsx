import { ReactElement } from "react";
import Layout from "../styling/Layout";
import OfflineCall from "./OfflineCall";
import OnlineCall from "./OnlineCall";

const Call = (): ReactElement => {
  return navigator.onLine ? <OnlineCall /> : <OfflineCall />;
};

export default Call;
