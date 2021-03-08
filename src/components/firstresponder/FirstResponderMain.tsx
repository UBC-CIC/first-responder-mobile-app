import { Fab, makeStyles } from "@material-ui/core";
import ProfileIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import WifiIcon from "@material-ui/icons/Wifi";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import bg from "../../assets/first-responder-home-bg.svg";
import "../../styles/firstresponder/Home.css";
import { FirstResponderProfileType, MeetingStateType } from "../../types";
import fetchFirstResponderProfile from "../calls/fetchFirstResponderProfile";
import OfflineContext from "../context/OfflineContext";
import usePhoneNumber from "../hooks/usePhoneNumber";
import useSessionId from "../hooks/useSessionId";
import Colors from "../styling/Colors";
import Layout from "../ui/Layout";
import PhoneNumberModal from "./PhoneNumberModal";

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
          setProfile(profile);
        } catch {
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
  const renderPhoneModal = (): ReactElement | undefined => {
    if (!phone) {
      return <PhoneNumberModal />;
    } else {
      return undefined;
    }
  };
  return (
    <Layout
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
                name: `${profile?.FirstName} ${profile?.LastName}`,
                role: profile?.Occupation,
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
          Create / Edit Profile
        </Fab>
      </div>
      {renderPhoneModal()}
    </Layout>
  );
};

export default FirstResponderMain;
