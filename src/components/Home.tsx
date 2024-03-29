/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Button, makeStyles } from "@material-ui/core";
import Amplify, { Auth } from "aws-amplify";
import { ReactElement, useEffect } from "react";
import { useHistory } from "react-router-dom";
import config from "../aws-exports";
import { FR_NAME, SPECIALIST_NAME } from "../Constants";
import "../styles/Home.css";
import Colors from "./styling/Colors";
import { useGlobalStyles } from "./styling/GlobalMuiStyles";
import Layout from "./ui/Layout";

export const useButtonClasses = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#FF8552",
    borderRadius: 20,
    height: "50px",
    margin: "20px",
    maxWidth: "500px",
    "&:hover": {
      transition: "all .3s",
      filter: "brightness(.8)",
      backgroundColor: "#FF8552",
    },
  },
  label: {
    fontFamily: "Montserrat",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  smallText: {
    color: Colors.theme.platinum,
    textDecoration: "underline",
    cursor: "pointer",
  },
});

Amplify.configure({
  ...config,
  Auth: {
    region: config.aws_cognito_region,
    userPoolId: config.aws_user_pools_id,
    userPoolWebClientId: config.aws_user_pools_web_client_id,
  },
  API: {
    apiKey: config.aws_appsync_apiKey,
  },
  Analytics: {
    disabled: true,
  },
});

/** Component rendered at root of app. Handles session state using localStorage of phone numbers
 * Contains links to both specialist and responder flows. If the user cannot log in due to bad connection,
 * there are links to create or join a call over PSTN, as well.
 */
const Home = (): ReactElement => {
  const history = useHistory();
  const buttonClasses = useButtonClasses();
  const globalClasses = useGlobalStyles();

  useEffect(() => {
    const f = async () => {
      try {
        const currUser = await Auth.currentAuthenticatedUser();
        if (currUser) history.replace("/main");
      } catch {
        // console.log("Not Logged In");
      }
    };
    f();
  });

  if (
    localStorage.getItem("firstresponderphonenumber")
    || localStorage.getItem("physicianphonenumber")
  ) {
    history.replace("/main");
  }

  return (
    <Layout noHeader>
      <div className="home-root">
        <div className="header-container">
          <div className="header-text">
            Emergency Response
          </div>
        </div>
        <div className="body-container">
          <div className={`${globalClasses.wideButtonContainer} `}>
            <Button
              classes={{ root: buttonClasses.root, label: buttonClasses.label }}
              onClick={() => {
                history.push("/firstresponderLogin");
              }}
            >
              {FR_NAME.full}
            </Button>
            <Button
              classes={{ root: buttonClasses.root, label: buttonClasses.label }}
              onClick={() => {
                history.push("/physicianLogin");
              }}
            >
              {SPECIALIST_NAME}
            </Button>
            <div
              className={buttonClasses.smallText}
              onClick={() => history.push("/badInternet")}
            >
              Weak Internet Connection?
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
