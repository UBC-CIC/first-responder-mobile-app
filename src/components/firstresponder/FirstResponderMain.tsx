import { Button, Fab, makeStyles } from "@material-ui/core";
import { ReactElement, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../styling/Layout";
import bg from "../../assets/first-responder-home-bg.svg";
import "../../styles/firstresponder/Home.css";
import Colors from "../styling/Colors";
import PhoneIcon from "@material-ui/icons/Phone";
import ProfileIcon from "@material-ui/icons/Person";

import { MeetingStateType } from "../../types";
import { v4 as uuid } from "uuid";
const useStyles = makeStyles({
  button: {
    backgroundColor: `${Colors.theme.coral} !important`,
    color: Colors.theme.platinum,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 15
  },
  icon: {
    marginRight: 10,
  },
});

const FirstResponderMain = (): ReactElement => {
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (!sessionStorage.getItem("firstresponderid"))
      sessionStorage.setItem("firstresponderid", uuid())
    console.log(sessionStorage.getItem("firstresponderid"));
  })
  return (
    <Layout
      title="First Responder Home"
      flexColumn
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="firstresponder-root">
        <Fab
          variant="extended"
          id="callStars"
          className={classes.button}
          onClick={() => {
            history.push("/call", {
              meetingId: uuid(),
              name: "First Responder",
              role: "First Responder",
              attendeeId: sessionStorage.getItem("firstresponderid"),
            } as MeetingStateType);
          }}
        >
          <PhoneIcon className={classes.icon} />
          Call STARS
        </Fab>
        <Fab
          variant="extended"
          id="callStars"
          className={classes.button}
          onClick={() => {
            console.log("profile");
          }}
        >
          <ProfileIcon className={classes.icon} />
          Create / Edit Profile
        </Fab>
      </div>
    </Layout>
  );
};

export default FirstResponderMain;
