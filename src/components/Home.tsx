import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Layout from "./styling/Layout";
const Home = (): ReactElement => {
  const history = useHistory();
  return (
    <Layout noHeader>
      <div>
        <p>STARS Emergency Support</p>
      </div>
      <div>
        <Button
          onClick={() => {
            history.push("/firstresponder");
          }}
        >
          first responder
        </Button>
        <Button
          onClick={() => {
            history.push("/physician");
          }}
        >
          physician
        </Button>
      </div>
    </Layout>
  );
};

export default Home;
