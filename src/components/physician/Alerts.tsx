import { Button } from "@material-ui/core";
import { ReactElement, useEffect, useState } from "react";
import Layout from "../styling/Layout";
import pushNotificationManager from "web-push";
import keys from "../../push/keys.json";
import base64Convert from "../../push/keys";
import { API, graphqlOperation } from "aws-amplify";
import { listMeetings } from "../../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";
import { ListMeetingsQuery } from "../../API";
import { MeetingStateType, MeetingType } from "../../types";
import { useHistory } from "react-router-dom";

const Alerts = (): ReactElement => {
  const [meetings, setMeetings] = useState<MeetingType[] | undefined>([]);
  const history = useHistory();

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
      } as MeetingStateType);
  };

  useEffect(() => {
    const f = async () => {
      const res = (await API.graphql(
        graphqlOperation(listMeetings)
      )) as GraphQLResult<ListMeetingsQuery>;
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
    f();
  }, []);

  return (
    <Layout title="Alerts">
      {/* <Button
        onClick={() => {
          handleNotif();
        }}
      >
        Push me a notification
      </Button> */}
      {meetings?.map((meeting) => {
        return (
          <div key={meeting.id} onClick={() => handleJoin(meeting.id)}>
            {meeting.id}
          </div>
        );
      })}
    </Layout>
  );
};

export default Alerts;
