import { Button, makeStyles } from "@material-ui/core";
import { ReactElement, useEffect } from "react";
import Colors from "../styling/Colors";
import Layout from "../ui/Layout";

const useStyles = makeStyles({
  button: {
    backgroundColor: `${Colors.theme.coral} !important`,
    color: Colors.theme.platinum,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 15,
    margin: 10,
  },
});
const OfflineCall = (): ReactElement => {
  const classes = useStyles();
  useEffect(() => {
    console.log("calling +1 888 651 1946");
    document.location.href = "tel:1-888-651-1946";
  }, []);
  return (
    <Layout title="Offline Call" flexColumn parent="/firstresponder">
      <div className="ffc justify align">
        <Button
          className={classes.button}
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
