import { Button, makeStyles } from "@material-ui/core";
import Amplify from "aws-amplify";
import { ReactElement, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/Home.css";
import Layout from "./styling/Layout";
import config from "../aws-exports";
import { useGlobalStyles } from "./styling/GlobalMuiStyles";
Amplify.configure(config);

const useStyles = makeStyles({
  button: {
    margin: "20px",
  },
});

const Home = (): ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const globalClasses = useGlobalStyles();

  useEffect(() => {
    const f = async () => {
      //todo find a way to get user's connection speed
    };
    f();
  }, []);

  return (
    <Layout noHeader>
      <div className="home-root">
        <div className="header-container">
          <div className="header-text">STARS Emergency Support</div>
        </div>
        <div className="body-container">
          <div className={`${globalClasses.wideButtonContainer} `}>
            <Button
              className={`${globalClasses.wideButton} ${classes.button}`}
              onClick={() => {
                history.push("/firstresponder");
              }}
            >
              first responder
            </Button>
            <Button
              className={`${globalClasses.wideButton} ${classes.button}`}
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
