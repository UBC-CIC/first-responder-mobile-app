import { Button, Fab, makeStyles } from "@material-ui/core";
import React, { ReactElement, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../styling/Layout";
import bg from "../../assets/first-responder-home-bg.svg";
import "../../styles/firstresponder/Home.css";
import Colors from "../styling/Colors";
import PhoneIcon from "@material-ui/icons/Phone";
import ProfileIcon from "@material-ui/icons/Person";
import WifiIcon from "@material-ui/icons/Wifi";

import { MeetingStateType } from "../../types";
import { v4 as uuid } from "uuid";
import OfflineContext from "../context/OfflineContext";
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

  const renderPhoneModal = (): ReactElement | undefined => {
    if (!localStorage.getItem("firstresponderphonenumber")) {
      return <PhoneNumberModal />;
    } else {
      return undefined;
    }
  };
  useEffect(() => {
    if (!sessionStorage.getItem("firstresponderid"))
      sessionStorage.setItem("firstresponderid", uuid());
    console.log(sessionStorage.getItem("firstresponderid"));
  });
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
                meetingId: uuid(),
                name: "First Responder",
                role: "First Responder",
                attendeeId: sessionStorage.getItem("firstresponderid"),
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
                attendeeId: sessionStorage.getItem("firstresponderid"),
                parent: "/firstresponder",
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
      {/* {renderPhoneModal()} */}
    </Layout>
  );
};

export default FirstResponderMain;
