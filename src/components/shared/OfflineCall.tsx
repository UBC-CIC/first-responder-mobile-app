import { ReactElement, useEffect } from "react";
import Layout from "../styling/Layout";

const OfflineCall = (): ReactElement => {
  useEffect(() => {
    console.log("calling 604-318-9666");
    document.location.href = "tel:604-318-9666";
  });
  return (
    <Layout title="Offline Call">
      <a href="tel:604-318-9666" type="phone">
        Phone
      </a>
    </Layout>
  );
};

export default OfflineCall;
