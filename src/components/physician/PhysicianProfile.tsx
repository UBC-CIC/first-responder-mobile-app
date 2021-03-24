import { Button, Fab, makeStyles } from "@material-ui/core";
import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../ui/Layout";
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

  const handleSignOut = () => {
    localStorage.removeItem("physiciansessionid");
    Auth.signOut();
  }
  return (
    <Layout title="Profile" flexColumn parent="/physician">
      <div className={classes.root}>
        <div className={classes.mainContainer}>
          <Fab
            variant="extended"
            className={`${globalClasses.button} ${globalClasses.coral}`}
            onClick={() => history.push("/physician/contactinfo")}
          >
            <ProfileIcon className={classes.icon} />
            Edit Contact Info
          </Fab>
          <Fab
            variant="extended"
            className={`${globalClasses.button} ${globalClasses.coral}`}
            onClick={() => history.push("/physician/availability")}
          >
            <CalendarIcon className={classes.icon} />
            Hours of Availability
          </Fab>
          
        </div>
        <div className={classes.signOutContainer}>
          <Fab
            variant="extended"
            className={`${globalClasses.button} ${classes.signOutButton}`}
            onClick={() => handleSignOut()}
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
