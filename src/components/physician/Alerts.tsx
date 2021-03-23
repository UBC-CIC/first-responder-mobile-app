import { Button, makeStyles } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  CognitoUser,
  MeetingStateType,
  MeetingType,
  PhysicianProfileType,
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

const Alerts = (): ReactElement => {
  const [meetings, setMeetings] = useState<MeetingType[] | undefined>([]);
  const history = useHistory<MeetingStateType>();
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  const sessionId = useSessionId();
  const [profile, setProfile] = useState<PhysicianProfileType>();

  useEffect(() => {
    const f = async () => {
      const u: CognitoUser = await Auth.currentAuthenticatedUser();
      const id = u.attributes.sub;
      // const fetchedProfile = await getProfile({ id });
      // setProfile(fetchedProfile);
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
    if (id)
      history.push("/call", {
        meetingId: id,
        name: profile
          ? `${profile.FirstName} ${profile.LastName}`
          : "Professional",
        role: profile?.Occupation || "Professional",
        attendeeId: sessionId,
        parent: "/physician/alerts",
      } as MeetingStateType);
  };

  const renderMeetings = () => {
    if (meetings?.length) {
      return meetings?.map((meeting, index) => {
        return (
          <div className={globalClasses.wideButtonContainer} key={meeting.id}>
            <Button
              className={`${globalClasses.wideButton} ${classes.button}`}
              onClick={() => handleJoin(meeting.id)}
            >
              {/* TODO Call to backend for topic of accident */}
              {index % 2 == 0 ? "Emergency A" : "Emergency B"}
            </Button>
          </div>
        );
      });
    } else {
      return (
        <p style={{ color: Colors.theme.platinum }}>
          You have no alerts at this time
        </p>
      );
    }
  };

  return (
    <Layout title="Alerts" flexColumn parent="/physician">
      <div className="ffc align">{renderMeetings()}</div>
    </Layout>
  );
};

export default Alerts;
