import { Badge, Button, IconButton, makeStyles } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Meeting } from "../../API";
import { MeetingType } from "../../types";
import listAllMeetings from "../calls/listAllMeetings";
import Layout from "../styling/Layout";
import { v4 as uuid } from "uuid";
import BellIcon from "@material-ui/icons/Notifications";
import Colors from "../styling/Colors";
import bg from "../../assets/physician-home-bg.svg";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
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
    backgroundImage: `url(${bg})`
  },
  badge: {
    textAlign: "center",
  },
});

const PhysicianMain = (): ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const [meetings, setMeetings] = useState<MeetingType[] | undefined | null>();

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

  useEffect(() => {
    if (!sessionStorage.getItem("physicianid"))
      sessionStorage.setItem("physicianid", uuid());
    console.log(sessionStorage.getItem("physicianid"));
  });
  return (
    <Layout
      title="Physician Home"
      flexColumn
    >
      <div className={classes.root}>
        <IconButton
          className={classes.bellButton}
          onClick={() => history.push("/physician/alerts", { meetings })}
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
