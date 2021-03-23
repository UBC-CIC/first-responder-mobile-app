import { Badge, Button, IconButton, makeStyles } from "@material-ui/core";
import BellIcon from "@material-ui/icons/Notifications";
import React, { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import bg from "../../assets/physician-home-bg.svg";
import { MeetingType } from "../../types";
import listAllMeetings from "../calls/listAllMeetings";
import useSessionId from "../hooks/useSessionId";
import Colors from "../styling/Colors";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import Layout from "../ui/Layout";
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

const testKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const PhysicianMain = (): ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const [meetings, setMeetings] = useState<MeetingType[] | undefined | null>();
  const sessionId = useSessionId();

  useEffect(() => {
    if(!localStorage.getItem("physiciansessionid")){
      localStorage.setItem("physiciansessionid", uuid());
    }
  }, []);

  useEffect(() => {
    const f = async () => {
      const res = await listAllMeetings();
      if (res.data) {
        const meetingsFromDB = res.data.listMeetings?.items?.map((item) => {
          const newItem: MeetingType = item as any;
          return newItem;
        });
        setMeetings(meetingsFromDB);
      }
    };
    f();
  }, []);

  return (
    <Layout
      title="Physician Home"
      flexColumn
      hideBackButton={localStorage.getItem("physiciansessionid") ? true : false}
      parent="/"
    >
      <div className={classes.root}>
        <IconButton
          className={classes.coral}
          onClick={() => history.push("/physician/alerts")}
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
            className={globalClasses.wideButton}
            onClick={() => history.push("/physician/profile")}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PhysicianMain;
