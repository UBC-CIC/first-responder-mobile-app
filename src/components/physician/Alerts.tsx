import { Button } from "@material-ui/core";
import { ReactElement } from "react";
import Layout from "../styling/Layout";
import pushNotificationManager from "web-push";
import keys from "../../push/keys.json";
import base64Convert from "../../push/keys";
const Alerts = (): ReactElement => {
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

  return (
    <Layout title="Alerts">
      <Button
        onClick={() => {
          handleNotif();
        }}
      >
        Push me a notification
      </Button>
    </Layout>
  );
};

export default Alerts;
