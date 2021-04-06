import { Button, makeStyles } from "@material-ui/core";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { MeetingDetail, OnCreateMeetingDetailSubscription, OnUpdateMeetingDetailSubscription } from "../../API";
import { onCreateMeetingDetail, onUpdateMeetingDetail } from "../../graphql/subscriptions";
import {
  CognitoUser,
  MeetingStateType,
  MeetingType,
  SpecialistProfileType,
  SubscriptionValue,
} from "../../types";
import getProfile from "../calls/fetchPhysicianProfile";
import { getRelevantMeetings } from "../calls/getRelevantMeetings";
import listAllMeetings from "../calls/listAllMeetings";
import { relevantMeetingSubscription } from "../calls/relevantMeetingSubscription";
import { subscribeGraphQL } from "../calls/subscribeGraphQL";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
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

function mapOnUpdateMeetingDetailSubscription(
  updateMeetingDetailSubscription: OnUpdateMeetingDetailSubscription,
): MeetingDetail {
  const { meeting_id } = updateMeetingDetailSubscription.onUpdateMeetingDetail || {};
  return {
    meeting_id,
  } as MeetingDetail;
}

function mapOnCreateMeetingDetailSubscription(
  updateMeetingDetailSubscription: OnCreateMeetingDetailSubscription,
): MeetingDetail {
  const { meeting_id } = updateMeetingDetailSubscription.onCreateMeetingDetail || {};
  return {
    meeting_id,
  } as MeetingDetail;
}

const Alerts = (): ReactElement => {
  const [meetings, setMeetings] = useState<MeetingDetail[] | undefined>([]);
  const user = useAuthenticatedUser();
  const history = useHistory<MeetingStateType>();
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  const buttonClasses = useButtonClasses();
  const phoneNumber = localStorage.getItem("physicianphonenumber");
  const sessionId = useSessionId();
  const [profile, setProfile] = useState<SpecialistProfileType>();
  const getRelevant = async () => {
    if (!phoneNumber) return;
    const relevantMeetings = await getRelevantMeetings(phoneNumber);
    setMeetings(relevantMeetings);
  };
  useEffect(() => {
    const f = async () => {
      const fetchedProfile = await getProfile({
        phone_number: user.attributes.phone_number,
      });
      setProfile(fetchedProfile);
    };

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
        console.log(user);

        getRelevant();

        // const meetingDetail = mapOnUpdateMeetingDetailSubscription(
        //   response.value.data,
        // );
        // console.log(meetingDetail);
        // setTodos([...todos, todo]);
      },
    });

    return () => {
      // subscription.unsubscribe();
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

        // const meetingDetail = mapOnCreateMeetingDetailSubscription(
        //   response.value.data,
        // );
        // console.log(meetingDetail);
        // setTodos([...todos, todo]);
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
