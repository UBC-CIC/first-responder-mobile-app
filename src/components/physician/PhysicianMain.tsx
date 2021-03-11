import { Badge, Button, IconButton, makeStyles } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Meeting } from "../../API";
import { MeetingType } from "../../types";
import listAllMeetings from "../calls/listAllMeetings";
import Layout from "../ui/Layout";
import { v4 as uuid } from "uuid";
import BellIcon from "@material-ui/icons/Notifications";
import Colors from "../styling/Colors";
import bg from "../../assets/physician-home-bg.svg";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import pushNotificationManager from "web-push";
import base64Convert from "../../push/keys";
import keys from "../../push/keys.json";
import useSessionId from "../hooks/useSessionId";
import Amplify from "aws-amplify";
import config from "../../aws-exports";
Amplify.configure(config);

const useStyles = makeStyles({
  bellIcon: {
    width: "100px",
    height: "100px",
    color: Colors.theme.platinum,
  },
  bellButton: {
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
  const handleNotif = async () => {
    console.log("notif");
    const sw = await navigator.serviceWorker.ready;

    const push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64Convert(testKey),
    });
    console.log("Public Key: ", keys.publicKey);

    const sub = await sw.pushManager.getSubscription();

    console.log("sub", sub);

    console.log(JSON.stringify(push));
  };

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
    <Layout title="Physician Home" flexColumn parent="/">
      <div className={classes.root}>
        <IconButton
          className={classes.bellButton}
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
        <div className={globalClasses.wideButtonContainer}>
          <Button className={globalClasses.wideButton} onClick={handleNotif}>
            Allow Notifications
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PhysicianMain;
