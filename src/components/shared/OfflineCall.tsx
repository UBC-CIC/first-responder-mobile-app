import { Button } from "@material-ui/core";
import { ReactElement, useEffect } from "react";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import Layout from "../ui/Layout";

const OfflineCall = (): ReactElement => {
  const globalClasses = useGlobalStyles();

  useEffect(() => {
    document.location.href = "tel:1-888-651-1946";
  }, []);
  return (
    <Layout
      title="Offline Call"
      flexColumn
      parent="/main"
    >
      <div className="ffc justify align">
        <Button
          className={globalClasses.wideButton}
          component="a"
          href="tel:1-888-651-1946"
          type="phone"
        >
          Phone Call
          {" "}
          Didn't
          {" "}
          Start?
        </Button>
      </div>
    </Layout>
  );
};

export default OfflineCall;
