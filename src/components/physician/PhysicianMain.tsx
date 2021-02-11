import { Button } from "@material-ui/core";
import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../styling/Layout";

const PhysicianMain = (): ReactElement => {
  const history = useHistory();
  return (
    <Layout title="Physician Home">
      <Button onClick={() => history.push("/physician/alerts")}>
        3 Alerts
      </Button>
      <Button onClick={() => history.push("/physician/profile")}>
        Physician Profile
      </Button>
    </Layout>
  );
};

export default PhysicianMain;
