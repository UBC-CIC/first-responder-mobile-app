import { Button, makeStyles } from "@material-ui/core";
import Amplify from "aws-amplify";
import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import "../styles/Home.css";
import Layout from "./styling/Layout";
import config from "../aws-exports";
import { useGlobalStyles } from "./styling/GlobalMuiStyles";

Amplify.configure(config);

const Home = (): ReactElement => {
  const history = useHistory();
  // const classes = useStyles();
  const classes = useGlobalStyles();
  return (
    <Layout noHeader>
      <div className="home-root">
        <div className="header-container">
          <div className="header-text">STARS Emergency Support</div>
        </div>
        <div className="body-container">
          <div className={classes.wideButtonContainer}>
            <Button
              className={classes.wideButton}
              onClick={() => {
                history.push("/firstresponder");
              }}
            >
              first responder
            </Button>
            <Button
              className={classes.wideButton}
              onClick={() => {
                history.push("/physician");
              }}
            >
              Medical Professional
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
