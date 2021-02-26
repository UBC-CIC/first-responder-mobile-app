import { Button, makeStyles } from "@material-ui/core";
import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../styling/Layout";
import { SignOut } from "aws-amplify-react";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: "1",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

const PhysicianProfile = (): ReactElement => {
  const history = useHistory();
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  return (
    <Layout title="Profile" flexColumn>
      <div className={classes.root}>
        <div className={globalClasses.wideButtonContainer}>
          <Button
            className={globalClasses.wideButton}
            onClick={() => history.push("/physician/contactinfo")}
          >
            Contact Info
          </Button>
        </div>
        <div className={globalClasses.wideButtonContainer}>
          <Button
            className={globalClasses.wideButton}
            onClick={() => history.push("/physician/availability")}
          >
            Select Availability
          </Button>
        </div>
        <SignOut />
      </div>
    </Layout>
  );
};

export default PhysicianProfile;
