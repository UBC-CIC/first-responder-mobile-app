import { Button, makeStyles } from "@material-ui/core";
import { ReactElement, useEffect } from "react";
import Colors from "../styling/Colors";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import Layout from "../ui/Layout";

const OfflineCall = (): ReactElement => {
  const globalClasses = useGlobalStyles();
  useEffect(() => {
    console.log("calling +1 888 651 1946");
    document.location.href = "tel:1-888-651-1946";
  }, []);
  return (
    <Layout
      title="Offline Call"
      flexColumn
      parent={
        localStorage.getItem("firstresponderphonenumber")
          ? "/firstresponder"
          : localStorage.getItem("physiciansessionid") ? "/physician" : "/"
      }
    >
      <div className="ffc justify align">
        <Button
          className={globalClasses.button}
          component="a"
          href="tel:1-888-651-1946"
          type="phone"
        >
          Phone Call {"Didn't"} Start?
        </Button>
      </div>
    </Layout>
  );
};

export default OfflineCall;
