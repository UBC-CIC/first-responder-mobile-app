import { Button, Fab, makeStyles } from "@material-ui/core";
import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../styling/Layout";
// import { SignOut } from "aws-amplify-react";
import { Auth } from "@aws-amplify/auth";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import ProfileIcon from "@material-ui/icons/Person";
import CalendarIcon from "@material-ui/icons/EventNote";
import SignOutIcon from "@material-ui/icons/ExitToApp";

import Colors from "../styling/Colors";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: "1",
    alignItems: "center",
  },
  button: {
    backgroundColor: `${Colors.theme.coral} !important`,
    color: Colors.theme.platinum,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 15,
    margin: 10,
  },
  icon: {
    marginRight: 10,
  },
  signOutButton: {
    backgroundColor: `${Colors.theme.skobeloff} !important`,
  },
  mainContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  signOutContainer: {
    display: "flex",
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  signOutIcon: {
    marginLeft: 10,
  },
});

const PhysicianProfile = (): ReactElement => {
  const history = useHistory();
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  return (
    <Layout title="Profile" flexColumn>
      <div className={classes.root}>
        <div className={classes.mainContainer}>
          <Fab
            variant="extended"
            className={classes.button}
            onClick={() => history.push("/physician/contactinfo")}
          >
            <ProfileIcon className={classes.icon} />
            Edit Contact Info
          </Fab>
          <Fab
            variant="extended"
            className={classes.button}
            onClick={() => history.push("/physician/availability")}
          >
            <CalendarIcon className={classes.icon} />
            Hours of Availability
          </Fab>
        </div>
        <div className={classes.signOutContainer}>
          <Fab
            variant="extended"
            className={`${classes.button} ${classes.signOutButton}`}
            onClick={() => Auth.signOut()}
          >
            Sign Out
            <SignOutIcon className={classes.signOutIcon} />
          </Fab>
        </div>
      </div>
    </Layout>
  );
};

export default PhysicianProfile;
