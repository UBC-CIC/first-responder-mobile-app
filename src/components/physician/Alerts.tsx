import { Button } from "@material-ui/core";
import { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import pushNotificationManager from "web-push";
import base64Convert from "../../push/keys";
import keys from "../../push/keys.json";
import { AlertsStateType, MeetingStateType, MeetingType } from "../../types";
import listAllMeetings from "../calls/listAllMeetings";
import Layout from "../styling/Layout";

const Alerts = (): ReactElement => {
  const [meetings, setMeetings] = useState<MeetingType[] | undefined>([]);
  const history = useHistory<AlertsStateType | MeetingStateType>();

  if (!sessionStorage.getItem("physicianid")) {
    history.push("/physician")
    return <div></div>
  }
  const handleNotif = async () => {
    console.log("notif");
    const sw = await navigator.serviceWorker.ready;

    const sub = await sw.pushManager.getSubscription();

    console.log("sub", sub);

    const push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64Convert(keys.publicKey),
    });

    console.log("push", push);

    if (push) {
      pushNotificationManager.sendNotification(push.toJSON(), "test");
    }
    console.log(JSON.stringify(push));
  };

  const handleJoin = (id: string) => {
    if (id)
      history.push("/call", {
        meetingId: id,
        name: "John",
        role: "Brain Surgeon",
        attendeeId: sessionStorage.getItem("physicianid")
      } as MeetingStateType);
  };

  useEffect(() => {
    const f = async () => {
      console.log("call to backend");
      
      const res = await listAllMeetings();
      console.log(res);

      if (res.data) {
        const meetingsFromDB = res.data.listMeetings?.items?.map((item) => {
          const newItem: MeetingType = item as any;
          console.log(newItem);
          return newItem;
        });
        setMeetings(meetingsFromDB);
      }
    };

    const stateMeetings = (history.location?.state as AlertsStateType)?.meetings 

    if (!stateMeetings) {
      f();
    }
    else {
      setMeetings(stateMeetings);
    }
  }, []);

  return (
    <Layout title="Alerts">
      <div style={{
        display: "flex",
        flexDirection:"column",
        justifyContent: "center"
      }}>
        {meetings?.map((meeting, index) => {
          return (
            <Button key={meeting.id} onClick={() => handleJoin(meeting.id)}>
              {/* Call to backend for topic of accident */}
              {index % 2 == 0 ? "Car Accident" : "Another Emergency"}
            </Button>
          );
        })}
      </div>
    </Layout>
  );
};

export default Alerts;
