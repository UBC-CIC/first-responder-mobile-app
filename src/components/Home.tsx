import { Button, makeStyles } from "@material-ui/core";
import Amplify from "aws-amplify";
import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import config from "../aws-exports";
import passwordless from "../passwordless-aws-exports";
import "../styles/Home.css";
import { useGlobalStyles } from "./styling/GlobalMuiStyles";
import Layout from "./ui/Layout";

const useStyles = makeStyles({
  button: {
    margin: "20px",
  },
});

if (localStorage.getItem("firstresponderphonenumber")) {
  Amplify.configure({
    ...config,
    Auth: {
      ...passwordless,
    },
  });
} else if (localStorage.getItem("physiciansessionid")) {
  Amplify.configure(config);
}

const Home = (): ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  const globalClasses = useGlobalStyles();

  if (localStorage.getItem("firstresponderphonenumber")) {
    history.replace("/firstresponder");
  } else if (localStorage.getItem("physiciansessionid")) {
    history.replace("/physician");
  }

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
                Amplify.configure({
                  ...config,
                  Auth: {
                    ...passwordless,
                  },
                });
                history.push("/firstresponder");
              }}
            >
              first responder
            </Button>
            <Button
              className={`${globalClasses.wideButton} ${classes.button}`}
              onClick={() => {
                Amplify.Auth.configure(config);
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
