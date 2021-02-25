import { Button } from "@material-ui/core";
import { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Meeting } from "../../API";
import { MeetingType } from "../../types";
import listAllMeetings from "../calls/listAllMeetings";
import Layout from "../styling/Layout";
import { v4 as uuid } from "uuid";

const PhysicianMain = (): ReactElement => {
  const history = useHistory();
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
    }
    f();
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("physicianid"))
      sessionStorage.setItem("physicianid", uuid());
    console.log(sessionStorage.getItem("physicianid"));
  });
  return (
    <Layout title="Physician Home">
      <Button onClick={() => history.push("/physician/alerts", {meetings})}>
        {meetings?.length} Alerts
      </Button>
      <Button onClick={() => history.push("/physician/profile")}>
        Physician Profile
      </Button>
    </Layout>
  );
};

export default PhysicianMain;
