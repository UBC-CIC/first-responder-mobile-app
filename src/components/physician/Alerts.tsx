import { Button, Fab, makeStyles } from "@material-ui/core";
import { Sync } from "@material-ui/icons";
import { API, graphqlOperation } from "aws-amplify";
import { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MeetingDetail, OnCreateMeetingDetailSubscription, OnUpdateMeetingDetailSubscription } from "../../API";
import { SPECIALIST_NAME } from "../../Constants";
import { onCreateMeetingDetail, onUpdateMeetingDetail } from "../../graphql/subscriptions";
import {
  MeetingStateType,
  SpecialistProfileType,
  SubscriptionValue,
} from "../../types";
import getProfile from "../calls/fetchPhysicianProfile";
import { getRelevantMeetings } from "../calls/getRelevantMeetings";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import useSessionId from "../hooks/useSessionId";
import Colors from "../styling/Colors";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import Layout from "../ui/Layout";

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
  platinum: { color: Colors.theme.platinum },
});

const Alerts = (): ReactElement => {
  const [meetings, setMeetings] = useState<MeetingDetail[] | undefined>([]);
  const user = useAuthenticatedUser();
  const history = useHistory<MeetingStateType>();
  const globalClasses = useGlobalStyles();
  const buttonClasses = useButtonClasses();
  const phoneNumber = localStorage.getItem("physicianphonenumber");
  const sessionId = useSessionId();
  const [profile, setProfile] = useState<SpecialistProfileType>();
  const getRelevant = async () => {
    if (!phoneNumber) return;
    const relevantMeetings = await getRelevantMeetings(phoneNumber);
    setMeetings(relevantMeetings);
    console.log(relevantMeetings);
  };
  useEffect(() => {
    const f = async () => {
      const fetchedProfile = await getProfile({
        phone_number: user.attributes.phone_number,
      });
      setProfile(fetchedProfile);
    };
    console.log(user);

    if (user) {
      f();
      getRelevant();
    }
  }, [user]);

  useEffect(() => {
    const subscription = API.graphql(
      {
        query: onUpdateMeetingDetail,
      },
      // @ts-ignore
    ).subscribe({
      next: (
        response: SubscriptionValue<OnUpdateMeetingDetailSubscription>,
      ) => {
        console.log(response);

        getRelevant();
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMeetingDetail),
      // @ts-ignore
    ).subscribe({
      next: (
        response: SubscriptionValue<OnCreateMeetingDetailSubscription>,
      ) => {
        console.log(response);
        console.log(user);

        getRelevant();
      },
      error: (error:any) => console.warn(error),
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleJoin = (id?: string) => {
    if (id) {
      history.push("/call", {
        meetingId: id,
        firstName: profile?.first_name || SPECIALIST_NAME,
        lastName: profile?.last_name || "",
        role: profile?.user_role || SPECIALIST_NAME,
        attendeeId: sessionId,
        parent: "/main/alerts",
        phoneNumber: profile?.phone_number,
        organization: profile?.organization,
      } as MeetingStateType);
    }
  };

  const renderMeetings = () => {
    if (meetings?.length) {
      return meetings?.map((meeting, index) => (
        <div
          className={globalClasses.wideButtonContainer}
          key={meeting.meeting_id}
        >
          <Button
            classes={{ root: buttonClasses.root, label: buttonClasses.label }}
            onClick={() => handleJoin(meeting.meeting_id)}
          >
            {/* TODO Call to backend for topic of accident */}
            {index % 2 === 0 ? "Emergency A" : "Emergency B"}
          </Button>
        </div>
      ));
    }
    return (
      <p className={buttonClasses.platinum}>
        You have no alerts at this time
      </p>
    );
  };

  return (
    <Layout title="Alerts" flexColumn parent="/main">
      <div className="ffc align">{renderMeetings()}</div>
      <div className="flex justify">
        <Fab
          variant="round"
          onClick={() => getRelevant()}
          className={`${globalClasses.button} ${globalClasses.coral}`}
        >
          <Sync />
        </Fab>

      </div>
    </Layout>
  );
};

export default Alerts;
