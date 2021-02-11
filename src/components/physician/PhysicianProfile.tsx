import { Button } from "@material-ui/core";
import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../styling/Layout";

const PhysicianProfile = (): ReactElement => {
  const history = useHistory();
  return (
    <Layout title="Profile">
      <Button onClick={() => history.push("/physician/contactinfo")}>
        Contact Info
      </Button>
      <Button onClick={() => history.push("/physician/availability")}>
        Select Availability
      </Button>
    </Layout>
  );
};

export default PhysicianProfile;
