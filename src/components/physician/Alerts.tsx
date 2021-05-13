import { Button, Fab, makeStyles } from "@material-ui/core";
import { Sync } from "@material-ui/icons";
import { API } from "aws-amplify";
import { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MeetingDetail } from "../../API";
import { SPECIALIST_NAME } from "../../Constants";
import { onCreateMeetingDetail, onUpdateMeetingDetail } from "../../graphql/subscriptions";
import {
  MeetingStateType,
  SpecialistProfileType,
} from "../../types";
import getProfile from "../calls/fetchPhysicianProfile";
import { getRelevantMeetings } from "../calls/getRelevantMeetings";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import useLocation from "../hooks/useLocation";
import useSessionId from "../hooks/useSessionId";
import Colors from "../styling/Colors";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import Layout from "../ui/Layout";

const useButtonClasses = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#FF8552",
    borderRadius: 20,
    minHeight: "50px",
    margin: "20px",
    // overflowWrap: "break-word",
  },
  label: {
    fontFamily: "Montserrat",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  platinum: { color: Colors.theme.platinum },
  emergencyTitle: {
    overflowWrap: "break-word",
    width: "inherit",
    hyphens: "auto",
  },
});

/** Fetches and displays meetings that are relevant to the
 * user. i.e. Meetings which contain this user's phone number as
 * an attendee. BUGFIX: Subscription does not work all the time.
 * Should add a lambda trigger to DDB table that sends an UpdateMeetingDetail
 * event to this app's AppSync API. Currently worked around with refresh button.
 */
const Alerts = (): ReactElement => {
  const [meetings, setMeetings] = useState<MeetingDetail[] | undefined>([]);
  const user = useAuthenticatedUser();
  const history = useHistory<MeetingStateType>();
  const globalClasses = useGlobalStyles();
  const classes = useButtonClasses();
  const phoneNumber = localStorage.getItem("physicianphonenumber");
  const sessionId = useSessionId();
  const [profile, setProfile] = useState<SpecialistProfileType>();
  const { location } = useLocation();

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
    const updateSubscription:any = API.graphql(
      {
        query: onUpdateMeetingDetail,
      },
    );

    updateSubscription.subscribe({
      next: (
      ) => {
        getRelevant();
      },
    });

    const createSubscription:any = API.graphql(
      {
        query: onCreateMeetingDetail,
      },
    );

    createSubscription.subscribe({
      next: (
      ) => {
        getRelevant();
      },
    });

    return () => {
      try {
        createSubscription?.unsubscribe();
        updateSubscription?.unsubscribe();
      } catch (e) {
        console.log(e);
      }
    };
  }, []);

  useEffect(() => {
    const subscribeUpdateMeetings = () => {
      const subscription: any = API.graphql({
        query: onUpdateMeetingDetail,
      });

      subscription.subscribe({
        next: (data: any) => {
          console.log(
            "data received from create subscription:",
            data,
          );
        },
      });
    };

    subscribeUpdateMeetings();
  }, []);

  const handleJoin = (id?: string | null) => {
    if (id) {
      history.push("/call", {
        meetingId: id,
        role: profile?.user_role || SPECIALIST_NAME,
        attendeeId: sessionId,
        parent: "/main/alerts",
        phoneNumber: profile?.phone_number,
        organization: profile?.organization,
        location: {
          latitude: location?.latitude,
          longitude: location?.longitude,
        },
      } as MeetingStateType);
    }
  };

  const renderMeetings = () => {
    if (meetings?.length) {
      return meetings?.map((meeting) => (
        <div
          className={globalClasses.wideButtonContainer}
          key={meeting.meeting_id}
        >
          <Button
            classes={{ root: classes.root, label: classes.label }}
            onClick={() => handleJoin(meeting.external_meeting_id)}
          >
            {/* TODO Call to backend for topic of accident */}
            <p className={classes.emergencyTitle}>
              {meeting.meeting_title || "Emergency"}
            </p>
          </Button>
        </div>
      ));
    }
    return (
      <p className={classes.platinum}>
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
