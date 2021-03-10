import React, { ReactElement, useContext } from "react";
import "@aws-amplify/ui/dist/style.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FirstResponderMain from "./firstresponder/FirstResponderMain";
import Home from "./Home";
import Alerts from "./physician/Alerts";
import Availability from "./physician/Availability";
import ContactInfo from "./physician/ContactInfo";
import PhysicianMain from "./physician/PhysicianMain";
import PhysicianProfile from "./physician/PhysicianProfile";
import Call from "./shared/Call";
import {
  ConfirmSignIn,
  ConfirmSignUp,
  ForgotPassword,
  RequireNewPassword,
  SignIn as SignIn2,
  SignUp,
  VerifyContact,
} from "aws-amplify-react";
import {
  RosterProvider,
  MeetingProvider,
} from "amazon-chime-sdk-component-library-react";

import { withAuthenticator } from "aws-amplify-react";
import Header from "./ui/Header";
import { CircularProgress } from "@material-ui/core";
import FirstResponderProfile from "./firstresponder/FirstResponderProfile";
import SignIn from "./ui/SignIn";
import Colors from "./styling/Colors";
const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        {/* Physician w/ Authenticator */}

        <Route path="/physician">
          <PhysicianRoutes />
        </Route>

        {/* First Responder */}
        <Route exact path="/firstresponder">
          <FirstResponderMain />
        </Route>
        <Route exact path="/firstresponder/profile">
          <FirstResponderProfile />
        </Route>
        {/* Shared */}

        <Route exact path="/call">
          <MeetingProvider>
            <Call />
          </MeetingProvider>
        </Route>

        {/* Not Found */}
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const PhysicianRoutes = withAuthenticator(
  () => {
    return (
      <>
        <Route exact path="/physician">
          <PhysicianMain />
        </Route>
        <Route exact path="/physician/alerts">
          <Alerts />
        </Route>
        <Route exact path="/physician/profile">
          <PhysicianProfile />
        </Route>
        <Route exact path="/physician/availability">
          <Availability />
        </Route>
        <Route exact path="/physician/contactinfo">
          <ContactInfo />
        </Route>
      </>
    );
  },
  {
    includeGreetings: false,
    authenticatorComponents: [
      <Header title="Sign In" key={-1}></Header>,
      // <SignIn key={0} />,
      <SignIn2 key={0} />,
      //   <ConfirmSignIn key={1} />,
      <VerifyContact key={2} />,
      //   // <SignUp key={3} />,
      //   <ConfirmSignUp key={4} />,
      <ForgotPassword key={5} />,
      //   <RequireNewPassword key={6} />,
    ],
    theme: {
      signInButtonIcon: { display: "none" },
      formSection: { backgroundColor: Colors.theme.onyx },
      sectionHeader: {
        color: Colors.theme.platinum,
        fontFamily: "Signika Negative",
      },
      input: {
        fontFamily: "Montserrat",
        color: Colors.theme.space,
      },
      inputLabel: { color: Colors.theme.platinum, fontFamily: "Montserrat" },
      button: { backgroundColor: Colors.theme.coral, borderRadius: 5 },
      a: { color: Colors.theme.coral },
      footer: {
        height: "100%",
        backgroundColor: Colors.theme.onyx,
      },
    },
  } as any
);

const FirstResponderRoutes = () => {
  return (
    <>
      <Route exact path="/firstresponder">
        <FirstResponderMain />
      </Route>
      <Route exact path="/firstresponder/profile">
        <FirstResponderProfile />
      </Route>
    </>
  );
};

export default Router;
