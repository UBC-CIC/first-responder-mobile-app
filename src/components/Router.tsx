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
  SignIn,
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
  false,
  [
    <Header title="Sign In" key={-1}></Header>,
    <SignIn key={0} />,
    <ConfirmSignIn key={1} />,
    <VerifyContact key={2} />,
    <SignUp key={3} />,
    <ConfirmSignUp key={4} />,
    <ForgotPassword key={5} />,
    <RequireNewPassword key={6} />,
  ]
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
