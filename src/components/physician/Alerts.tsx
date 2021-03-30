import { Button, makeStyles } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  CognitoUser,
  MeetingStateType,
  MeetingType,
  SpecialistProfileType,
} from "../../types";
import getProfile from "../calls/fetchPhysicianProfile";
import listAllMeetings from "../calls/listAllMeetings";
import useSessionId from "../hooks/useSessionId";
import Colors from "../styling/Colors";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import Layout from "../ui/Layout";

const useStyles = makeStyles({
  button: {
    margin: 10,
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

const Alerts = (): ReactElement => {
  const [meetings, setMeetings] = useState<MeetingType[] | undefined>([]);
  const history = useHistory<MeetingStateType>();
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  const buttonClasses = useButtonClasses();
  const sessionId = useSessionId();
  const [profile, setProfile] = useState<SpecialistProfileType>();
  useEffect(() => {
    const f = async () => {
      const u: CognitoUser = await Auth.currentAuthenticatedUser();
      const { phone_number } = u.attributes;
      const fetchedProfile = await getProfile({ phone_number });
      setProfile(fetchedProfile);
    };
    const g = async () => {
      const res = await listAllMeetings();
      if (res.data) {
        const meetingsFromDB = res.data.listMeetings?.items?.map((item) => {
          const newItem: MeetingType = item as any;
          console.log(newItem);
          return newItem;
        });
        setMeetings(meetingsFromDB);
      }
    };
    f();
    g();
  }, []);

  const handleJoin = (id: string) => {
    if (id) {
      history.push("/call", {
        meetingId: id,
        name: profile
          ? `${profile.first_name} ${profile.last_name}`
          : "Professional",
        role: profile?.user_role || "Professional",
        attendeeId: sessionId,
        parent: "/main/alerts",
        phoneNumber: profile?.phone_number,
      } as MeetingStateType);
    }
  };

  const renderMeetings = () => {
    if (meetings?.length) {
      return meetings?.map((meeting, index) => (
        <div className={globalClasses.wideButtonContainer} key={meeting.id}>
          <Button
            classes={{ root: buttonClasses.root, label: buttonClasses.label }}
            onClick={() => handleJoin(meeting.id)}
          >
            {/* TODO Call to backend for topic of accident */}
            {index % 2 === 0 ? "Emergency A" : "Emergency B"}
          </Button>
        </div>
      ));
    }
    return (
      <p style={{ color: Colors.theme.platinum }}>
        You have no alerts at this time
      </p>
    );
  };

  return (
    <Layout title="Alerts" flexColumn parent="/main">
      <div className="ffc align">{renderMeetings()}</div>
    </Layout>
  );
};

export default Alerts;
