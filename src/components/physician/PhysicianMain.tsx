import {
  Badge, Button, IconButton, makeStyles,
} from "@material-ui/core";
import BellIcon from "@material-ui/icons/Notifications";
import Amplify from "aws-amplify";
import React, { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { MeetingDetail } from "../../API";
import bg from "../../assets/physician-home-bg.svg";
import config from "../../aws-exports";
import passwordless from "../../passwordless-aws-exports";
import { MeetingType } from "../../types";
import { getRelevantMeetings } from "../calls/getRelevantMeetings";
import listAllMeetings from "../calls/listAllMeetings";
import listAllMeetingDetails from "../calls/listMeetingDetails";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import useSessionId from "../hooks/useSessionId";
import Colors from "../styling/Colors";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import Layout from "../ui/Layout";

// Amplify.configure({
//   ...config,
//   Auth: {
//     ...passwordless,
//   },
// });
const useStyles = makeStyles({
  bellIcon: {
    width: "100px",
    height: "100px",
    color: Colors.theme.platinum,
  },
  coral: {
    backgroundColor: Colors.theme.coral,
  },
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: "1",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${bg})`,
  },
  badge: {
    textAlign: "center",
  },
});

const useButtonClasses = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#FF8552",
    borderRadius: 20,
    height: "50px",
    margin: "20px",
  },
  label: {
    fontFamily: "Montserrat",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

const PhysicianMain = (): ReactElement => {
  const history = useHistory();
  const user = useAuthenticatedUser();
  const classes = useStyles();
  const buttonClasses = useButtonClasses();
  const globalClasses = useGlobalStyles();
  const [meetings, setMeetings] = useState<MeetingDetail[] | undefined | null>();
  const sessionId = useSessionId();

  useEffect(() => {
    const f = async () => {
      const relevantMeetings = await getRelevantMeetings(user.attributes.phone_number);
      if (relevantMeetings) { setMeetings(relevantMeetings); }

      // if (res.data) {
      //   const meetingsFromDB = res.data.listMeetings?.items?.map((item) => {
      //     const newItem: MeetingType = item as any;
      //     return newItem;
      //   });
      //   setMeetings(meetingsFromDB);
      // }
    };
    if (user) f();
  }, [user]);

  return (
    <Layout
      title="Physician Home"
      flexColumn
      hideBackButton={!!localStorage.getItem("physicianphonenumber")}
      parent="/"
    >
      <div className={classes.root}>
        <IconButton
          className={classes.coral}
          onClick={() => history.push("/main/alerts")}
        >
          <Badge
            badgeContent={meetings?.length}
            color="secondary"
            className={classes.badge}
          >
            <BellIcon className={classes.bellIcon} />
          </Badge>
        </IconButton>
        <div className={globalClasses.wideButtonContainer}>
          <Button
            classes={{ root: buttonClasses.root, label: buttonClasses.label }}
            onClick={() => history.push("/main/profile")}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PhysicianMain;
