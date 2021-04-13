/** UI Hub for various physician functions */
import { Auth } from "@aws-amplify/auth";
import {
  Fab, FormControlLabel, makeStyles, Switch, withStyles,
} from "@material-ui/core";
import { EventBusy } from "@material-ui/icons";
import CalendarIcon from "@material-ui/icons/EventNote";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import ProfileIcon from "@material-ui/icons/Person";
import React, { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchPhysicianProfile } from "../calls";
import updateSpecialistStatus from "../calls/updateSpecialistStatus";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import Colors from "../styling/Colors";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import Layout from "../ui/Layout";

const ThemedSwitch = withStyles({
  switchBase: {
    color: Colors.theme.coral,
    "&$checked": {
      color: Colors.theme.coral,
    },
    "&$checked + $track": {
      backgroundColor: Colors.theme.coral,
    },
  },
  checked: {},
  track: {},
})(Switch);

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
  switchLabel: {
    fontFamily: "Montserrat",
    color: Colors.theme.platinum,
  },
  tooltip: {
    fontSize: 10,
    margin: 0,
  },
});

const PhysicianProfile = (): ReactElement => {
  const history = useHistory();
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  const [available, setAvailable] = useState(false);
  const user = useAuthenticatedUser();

  useEffect(() => {
    const f = async () => {
      const profile = await fetchPhysicianProfile({ phone_number: user.attributes.phone_number });
      console.log(profile?.user_status);
      if (profile?.user_status === "OFFLINE") {
        setAvailable(false);
      } else {
        setAvailable(true);
      }
    };
    if (user) { f(); }
  }, [user]);
  const handleSignOut = () => {
    Auth.signOut()
      .then(() => {
        localStorage.removeItem("firstresponderphonenumber");
        localStorage.removeItem("physicianphonenumber");
      })
      .then(() => history.replace("/"));
  };

  const handleSwitch = async (value: boolean) => {
    if (!user.attributes.phone_number) { return; }
    await updateSpecialistStatus(value, user.attributes.phone_number);
    setAvailable(value);
  };

  return (
    <Layout title="Profile" flexColumn parent="/main">
      <div className={classes.root}>
        <div className={classes.mainContainer}>
          <Fab
            variant="extended"
            className={`${globalClasses.button} ${globalClasses.coral}`}
            onClick={() => history.push("/main/contactinfo")}
          >
            <ProfileIcon className={classes.icon} />
            Edit Contact Info
          </Fab>
          <Fab
            variant="extended"
            className={`${globalClasses.button} ${globalClasses.coral}`}
            onClick={() => history.push("/main/availability")}
          >
            <CalendarIcon className={classes.icon} />
            Standard Weekday Schedule
          </Fab>
          <Fab
            variant="extended"
            className={`${globalClasses.button} ${globalClasses.coral}`}
            onClick={() => history.push("/main/overrides")}
            disabled
          >
            <EventBusy className={classes.icon} />
            Book Time On / Off
          </Fab>
          <FormControlLabel
            control={(
              <ThemedSwitch
                onChange={(evt, value) => handleSwitch(value)}
              />
            )}
            checked={available}
            className={classes.switchLabel}
            label={available ? "Available" : "Unavailable"}
            classes={{
              label: classes.switchLabel,
            }}
          />
          <p className={`${classes.switchLabel} ${classes.tooltip}`}>Switch off to manually go offline</p>
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
