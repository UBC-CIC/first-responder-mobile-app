import { Backdrop, Fab, Fade, makeStyles, Modal, Paper } from "@material-ui/core";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import ProfileIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import WifiIcon from "@material-ui/icons/Wifi";
import Amplify, { Auth } from "aws-amplify";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import bg from "../../assets/first-responder-home-bg.svg";
import "../../styles/firstresponder/Home.css";
import { FirstResponderProfileType, MeetingStateType } from "../../types";
import { fetchFirstResponderProfile } from "../calls";
import OfflineContext from "../context/OfflineContext";
import usePhoneNumber from "../hooks/usePhoneNumber";
import useSessionId from "../hooks/useSessionId";
import Colors from "../styling/Colors";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import Layout from "../ui/Layout";



const useStyles = makeStyles({
  icon: {
    marginRight: 10,
  },
  skobeloff: {
    backgroundColor: `${Colors.theme.skobeloff} !important`,
  },
  signOutIcon: {
    marginLeft: 10,
  },
  paper: {
    width: "70%",
    backgroundColor: Colors.theme.onyx,
    color: Colors.theme.platinum,
    pointerEvents: "all",
    padding: 20,
  },
  warning: {
    backgroundColor: Colors.theme.error,
    color: Colors.theme.platinum,
  },
});

const FirstResponderMain = (): ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const { offline } = useContext(OfflineContext);

  const [modalOpen, setModalOpen] = useState(false);
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
            phoneNumber: profile?.phoneNumber,
            FirstName: profile?.FirstName || "First",
            LastName: profile?.LastName || "Responder",
            Occupation: profile?.Occupation || "First Responder",
          });
        } catch (e) {
          setProfile({
            id: phone,
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
            className={`${globalClasses.button} ${globalClasses.coral}`}
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
            className={`${globalClasses.button} ${globalClasses.coral}`}
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
          className={`${globalClasses.button} ${globalClasses.coral}`}
          onClick={() => history.push("/firstresponder/profile")}
        >
          <ProfileIcon className={classes.icon} />
          Edit Profile
        </Fab>
        <Fab
          variant="extended"
          className={`${globalClasses.button} ${classes.skobeloff}`}
          onClick={() => setModalOpen(true)}
        >
          Sign Out
          <SignOutIcon className={classes.signOutIcon} />
        </Fab>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalOpen}>
            <div
              style={{ height: "100%", pointerEvents: "none" }}
              className={"ffc justify align"}
            >
              <Paper className={classes.paper}>
                <p style={{ textAlign: "center" }}>
                  Are you sure you would like to log out? You{" "}
                  <strong> cannot </strong> log back in without internet
                  connection.
                </p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Fab
                    variant="extended"
                    className={`${globalClasses.button} ${classes.warning}`}
                    onClick={() => handleSignOut()}
                  >
                    Confirm Sign Out
                    <SignOutIcon className={classes.signOutIcon} />
                  </Fab>
                </div>
              </Paper>
            </div>
          </Fade>
        </Modal>
      </div>
    </Layout>
  );
};

export default FirstResponderMain;
