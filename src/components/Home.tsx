/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Button, makeStyles } from "@material-ui/core";
import Amplify, { Auth, button } from "aws-amplify";
import { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import config from "../aws-exports";
import { FR_NAME, SPECIALIST_NAME } from "../Constants";
import "../styles/Home.css";
import { CognitoUser } from "../types";
import Colors from "./styling/Colors";
import { useGlobalStyles } from "./styling/GlobalMuiStyles";
import Layout from "./ui/Layout";

const useButtonClasses = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#FF8552",
    borderRadius: 20,
    height: "50px",
    margin: "20px",
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
  },
});

Amplify.configure({
  config,
  Auth: {
    region: config.aws_cognito_region,
    userPoolId: config.aws_user_pools_id,
    userPoolWebClientId: config.aws_user_pools_web_client_id,
  },
});

const Home = (): ReactElement => {
  const history = useHistory();
  const buttonClasses = useButtonClasses();
  const globalClasses = useGlobalStyles();
  const [user, setUser] = useState<CognitoUser | undefined>();

  useEffect(() => {
    const f = async () => {
      try {
        const currUser = await Auth.currentAuthenticatedUser();
        setUser(currUser);
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
          <div className="header-text">STARS Emergency Support</div>
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
                // Amplify.Auth.configure(config);
                history.push("/physicianLogin");
              }}
            >
              {SPECIALIST_NAME}
            </Button>
            <p
              className={buttonClasses.smallText}
              onClick={() => history.push("/badInternet")}
            >
              Weak Internet Connection?
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
