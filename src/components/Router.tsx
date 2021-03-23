import "@aws-amplify/ui/dist/style.css";
import {
  MeetingProvider
} from "amazon-chime-sdk-component-library-react";
import {
  ConfirmSignUp,
  ForgotPassword,
  SignIn,
  SignUp,
  VerifyContact, withAuthenticator
} from "aws-amplify-react";
import React, { ReactElement } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FirstResponderMain from "./firstresponder/FirstResponderMain";
import FirstResponderProfile from "./firstresponder/FirstResponderProfile";
import Home from "./Home";
import Alerts from "./physician/Alerts";
import Availability from "./physician/Availability";
import ContactInfo from "./physician/ContactInfo";
import PhysicianMain from "./physician/PhysicianMain";
import PhysicianProfile from "./physician/PhysicianProfile";
import Call from "./shared/Call";
import Colors from "./styling/Colors";
import AuthTheme from "./ui/AuthTheme";
import Header from "./ui/Header";
import PhoneSignIn from "./ui/PhoneSignIn";

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
        {/* <Route exact path="/firstresponder">
          <FirstResponderMain />
        </Route>
        <Route exact path="/firstresponder/profile">
          <FirstResponderProfile />
        </Route> */}
        <Route path="/firstresponder">
          <FirstResponderRoutes />
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
      <Header title="Sign In" key={-1} parent="/"></Header>,
      <SignIn key={0} />,
      <SignUp key={1} />,
      <ConfirmSignUp key={3} />,
      <VerifyContact key={2} />,
      <ForgotPassword key={5} />,
    ],
    theme: AuthTheme,
  } as any
);

const FirstResponderRoutes = withAuthenticator(
  () => {
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
  },
  {
    includeGreetings: false,
    authenticatorComponents: [
      <Header title="Sign In" key={-1} parent="/"></Header>,
      <PhoneSignIn key={0} />,
    ],
    theme: AuthTheme
  } as any
);

export default Router;
