import { Button } from "@material-ui/core";
import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../styling/Layout";

const FirstResponderMain = (): ReactElement => {
  const history = useHistory();
  return (
    <Layout title="First Responder Home">
      <Button
        onClick={() => {
          history.push("/call");
        }}
      >
        Call STARS
      </Button>
    </Layout>
  );
};

export default FirstResponderMain;
