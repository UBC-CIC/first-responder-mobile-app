import { Fab, makeStyles } from "@material-ui/core";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import ProfileIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import WifiIcon from "@material-ui/icons/Wifi";
import Amplify, { Auth } from "aws-amplify";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import bg from "../../assets/first-responder-home-bg.svg";
import config from "../../aws-exports";
import passwordless from "../../passwordless-aws-exports";
import "../../styles/firstresponder/Home.css";
import { FirstResponderProfileType, MeetingStateType } from "../../types";
import fetchFirstResponderProfile from "../calls/fetchFirstResponderProfile";
import OfflineContext from "../context/OfflineContext";
import usePhoneNumber from "../hooks/usePhoneNumber";
import useSessionId from "../hooks/useSessionId";
import Colors from "../styling/Colors";
import Layout from "../ui/Layout";

Amplify.configure({
  ...config,
  Auth: {
    ...passwordless,
  },
});

const useStyles = makeStyles({
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
  signOutIcon: {
    marginLeft: 10,
  },
});

const FirstResponderMain = (): ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const { offline } = useContext(OfflineContext);

  const phone = usePhoneNumber();
  const sessionId = useSessionId();
  const [profile, setProfile] = useState<FirstResponderProfileType>();
  /** Fetch Profile Info */
  useEffect(() => {
    const f = async () => {
      if (phone) {
        try {
          const profile = await fetchFirstResponderProfile({ id: phone });
          setProfile({
            id: phone,
            verified: profile?.verified || false,
            phoneNumber: profile?.phoneNumber,
            FirstName: profile?.FirstName || "First",
            LastName: profile?.LastName || "Responder",
            Occupation: profile?.Occupation || "First Responder",
          });
        } catch (e) {
          setProfile({
            id: phone,
            verified: false,
            phoneNumber: phone,
            FirstName: "First",
            LastName: "Responder",
            Occupation: "First Responder",
          });
        }
      }
    };
    if (!offline) f();
    else
      setProfile({
        id: phone,
        verified: false,
        phoneNumber: phone,
        FirstName: "First",
        LastName: "Responder",
        Occupation: "First Responder",
      });
  }, []);

  const getName = () => {
    if (profile?.FirstName && profile.LastName) {
      return `${profile.FirstName} ${profile.LastName}`;
    }
    if (profile?.FirstName) return profile.FirstName;
    if (profile?.LastName) return profile.LastName;
    return "First Responder";
  };

  const handleSignOut = () => {
    localStorage.removeItem("firstresponderphonenumber");
    Auth.signOut();
  }
  return (
    <Layout
      hideBackButton={
        localStorage.getItem("firstresponderphonenumber") ? true : false
      }
      title="First Responder Home"
      parent="/"
      flexColumn
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="firstresponder-root">
        <div
          className="ffc"
          style={{ flex: 0, justifyContent: "space-between" }}
        >
          <Fab
            variant="extended"
            className={classes.button}
            onClick={() => {
              history.push("/call", {
                meetingId: phone,
                name: getName(),
                role: profile?.Occupation || "First Responder",
                attendeeId: sessionId,
                parent: "/firstresponder",
              } as MeetingStateType);
            }}
            disabled={!navigator.onLine || offline}
          >
            <WifiIcon className={classes.icon} />
            Call STARS over DATA
          </Fab>
          <Fab
            variant="extended"
            className={classes.button}
            onClick={() => {
              history.push("/call", {
                meetingId: uuid(),
                name: "First Responder",
                role: "First Responder",
                attendeeId: sessionId,
                parent: "/firstresponder",
                offline: true,
              } as MeetingStateType);
            }}
          >
            <PhoneIcon className={classes.icon} />
            Call STARS over PHONE LINE
          </Fab>
        </div>
        <Fab
          variant="extended"
          className={classes.button}
          onClick={() => history.push("/firstresponder/profile")}
        >
          <ProfileIcon className={classes.icon} />
          Edit Profile
        </Fab>
        <Fab
          variant="extended"
          className={`${classes.button} ${classes.signOutButton}`}
          onClick={() => handleSignOut()}
        >
          Sign Out
          <SignOutIcon className={classes.signOutIcon} />
        </Fab>
      </div>
    </Layout>
  );
};

export default FirstResponderMain;
