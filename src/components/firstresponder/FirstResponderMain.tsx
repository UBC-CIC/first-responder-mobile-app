import {
  Backdrop, Fab, Fade, makeStyles, Modal, Paper,
} from "@material-ui/core";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import ProfileIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import WifiIcon from "@material-ui/icons/Wifi";
import { Auth } from "aws-amplify";
import React, {
  ReactElement, useContext, useEffect, useState,
} from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import bg from "../../assets/first-responder-home-bg.svg";
import { FR_NAME } from "../../Constants";
import "../../styles/firstresponder/Home.css";
import { FirstResponderProfileType, MeetingStateType } from "../../types";
import { fetchFirstResponderProfile } from "../calls";
import generateSessionId from "../calls/generateSessionId";
import OfflineContext from "../context/OfflineContext";
import useLocation from "../hooks/useLocation";
import usePhoneNumber from "../hooks/usePhoneNumber";
import useSessionId from "../hooks/useSessionId";
import LocationStatus from "../shared/LocationStatus";
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
  buttonContainer: { flex: 0, justifyContent: "space-between" },
  backdrop: { height: "100%", pointerEvents: "none" },
  center: { textAlign: "center" },
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
  const { location, loading: locationLoading, error: locationError } = useLocation();

  /** Fetch Profile Info */
  useEffect(() => {
    const f = async () => {
      if (phone) {
        try {
          const fetchedProfile = await fetchFirstResponderProfile({ phone_number: phone });
          setProfile({
            ...fetchedProfile,
            phone_number: phone,
          });
        } catch (e) {
          setProfile({
            phone_number: phone,
            first_name: FR_NAME.first,
            last_name: FR_NAME.last,
            occupation: FR_NAME.full,
          });
        }
      }
    };
    if (!offline) f();
    else
    if (phone) {
      setProfile({
        phone_number: phone,
        first_name: FR_NAME.first,
        last_name: FR_NAME.last,
        occupation: FR_NAME.full,
      });
    }

    const g = async () => {
      if (!sessionStorage.getItem("firstrespondersessionid")) {
        const id: string = await generateSessionId();
        // const id: string = "test";
        console.log("Session ID: ", id);

        sessionStorage.setItem("firstrespondersessionid", id);
      }
    };
    if (!sessionStorage.getItem("firstrespondersessionid")) g();
    console.log(sessionStorage.getItem("firstrespondersessionid"));
  }, []);

  const handleSignOut = () => {
    Auth.signOut().then(() => {
      localStorage.removeItem("firstresponderphonenumber");
      localStorage.removeItem("physicianphonenumber");
    }).then(() => history.replace("/"));
  };

  return (
    <Layout
      hideBackButton={!!localStorage.getItem("firstresponderphonenumber")}
      title={`${FR_NAME.full} Home`}
      parent="/"
      flexColumn
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="firstresponder-root">
        <div
          className={`ffc ${classes.buttonContainer}`}
        >
          <Fab
            variant="extended"
            className={`${globalClasses.button} ${globalClasses.coral}`}
            onClick={() => {
              history.push("/call", {
                meetingId: sessionStorage.getItem("firstrespondersessionid"),
                firstName: profile?.first_name || FR_NAME.first,
                lastName: profile?.last_name || FR_NAME.last,
                role: profile?.occupation || FR_NAME.full,
                attendeeId: sessionId,
                parent: "/main",
                phoneNumber: profile?.phone_number,
                location: {
                  latitude: location?.latitude,
                  longitude: location?.longitude,
                },
              } as MeetingStateType);
            }}
            disabled={!navigator.onLine || offline}
          >
            <WifiIcon className={classes.icon} />
            Call STARS over DATA
          </Fab>
          <Fab
            variant="extended"
            component="a"
            className={`${globalClasses.button} ${globalClasses.coral}`}
            href="tel:1-888-651-1946"
          >
            <PhoneIcon className={classes.icon} />
            Call STARS over PHONE LINE
          </Fab>
        </div>
        <Fab
          variant="extended"
          className={`${globalClasses.button} ${globalClasses.coral}`}
          onClick={() => history.push("/main/profile")}
        >
          <ProfileIcon className={classes.icon} />
          Edit Profile
        </Fab>
        <LocationStatus
          location={location}
          locationLoading={locationLoading}
          locationError={locationError}
        />
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
              className={`ffc justify align ${classes.backdrop}`}
            >
              <Paper className={classes.paper}>
                <p className={classes.center}>
                  Are you sure you would like to log out? You
                  {" "}
                  <strong> cannot </strong>
                  {" "}
                  log back in without internet
                  connection.
                </p>
                <div className="flex column">
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
