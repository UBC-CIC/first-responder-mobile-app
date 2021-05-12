import {
  Badge, Button, IconButton, makeStyles,
} from "@material-ui/core";
import BellIcon from "@material-ui/icons/Notifications";
import { API } from "aws-amplify";
import React, { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MeetingDetail } from "../../API";
import bg from "../../assets/physician-home-bg.svg";
import { SPECIALIST_NAME } from "../../Constants";
import { getRelevantMeetings } from "../calls/getRelevantMeetings";
import { updateSpecialistProfile } from "../calls/graphql/specialistProfile";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import useLocation from "../hooks/useLocation";
import LocationStatus from "../shared/LocationStatus";
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

/** Main screen for specialists. Shows number of pending alerts on a bell icon.
 * Contains a link to Edit Profile, and shows user's location if it is available.
 */
const PhysicianMain = (): ReactElement => {
  const history = useHistory();
  const user = useAuthenticatedUser();
  const classes = useStyles();
  const buttonClasses = useButtonClasses();
  const globalClasses = useGlobalStyles();
  const [meetings, setMeetings] = useState<MeetingDetail[] | undefined | null>();
  const { location, loading: locationLoading, error: locationError } = useLocation();

  useEffect(() => {
    const f = async () => {
      if (!location?.latitude || !location.longitude) return;
      const { latitude, longitude } = location;
      const input = { location: JSON.stringify({ latitude, longitude }), phone_number: user.attributes.phone_number };
      const response = await API.graphql({ query: updateSpecialistProfile, variables: { input } });
    };

    if (!locationLoading && user?.attributes.phone_number) {
      f();
    }
  }, [locationLoading, user]);

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
      title={`${SPECIALIST_NAME} Home`}
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
        <LocationStatus
          location={location}
          locationLoading={locationLoading}
          locationError={locationError}
        />
      </div>
    </Layout>
  );
};

export default PhysicianMain;
