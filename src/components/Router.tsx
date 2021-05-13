import "@aws-amplify/ui/dist/style.css";
import { makeStyles, Snackbar } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import {
  MeetingProvider,
} from "amazon-chime-sdk-component-library-react";
import {
  ConfirmSignUp,
  ForgotPassword,
  SignIn,
  SignUp,
  VerifyContact, withAuthenticator,
} from "aws-amplify-react";
import React, { ReactElement, useState } from "react";
import {
  BrowserRouter, Redirect, Route, Switch,
} from "react-router-dom";
import FirstResponderLogin from "./firstresponder/FirstResponderLogin";
import FirstResponderMain from "./firstresponder/FirstResponderMain";
import FirstResponderProfile from "./firstresponder/FirstResponderProfile";
import Home from "./Home";
import Alerts from "./physician/Alerts";
import Availability from "./physician/Availability";
import ContactInfo from "./physician/ContactInfo";
import Overrides from "./physician/Overrides";
import PhysicianLogin from "./physician/PhysicianLogin";
import PhysicianMain from "./physician/PhysicianMain";
import PhysicianProfile from "./physician/PhysicianProfile";
import BadConnection from "./shared/BadConnection";
import Call from "./shared/meeting/Call";
import Colors from "./styling/Colors";
import SnackBarActions from "./ui/Alert";
import AuthTheme from "./ui/AuthTheme";
import Header from "./ui/Header";
import PhoneSignIn from "./ui/PhoneSignIn";

const Router = (): ReactElement => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      {/* Physician w/ Authenticator */}

      <Route path="/main">
        {() => {
          if (localStorage.getItem("physicianphonenumber")) return <PhysicianRoutes />;
          if (localStorage.getItem("firstresponderphonenumber")) return <FirstResponderRoutes />;
          return <Redirect to="/" />;
        }}
      </Route>

      <Route exact path="/firstresponderLogin">
        <FirstResponderLogin />
      </Route>

      <Route exact path="/physicianLogin">
        <PhysicianLogin />
      </Route>

      {/* First Responder w/ Authenticator */}

      {/* <Route path="/firstresponder">
        <FirstResponderRoutes />
      </Route> */}
      {/* Shared */}

      <Route exact path="/call">
        <MeetingProvider>
          <Call />
        </MeetingProvider>
      </Route>

      <Route exact path="/badInternet">
        <BadConnection />
      </Route>

      {/* Not Found */}
      <Route path="*">
        <div>404</div>
      </Route>
    </Switch>
  </BrowserRouter>
);

const useStyles = makeStyles({
  success: {
    backgroundColor: Colors.theme.success,
    color: Colors.theme.platinum,
  },
  failure: {
    backgroundColor: Colors.theme.error,
    color: Colors.theme.platinum,
  },
});
const PhysicianRoutes = withAuthenticator(
  () => {
    const classes = useStyles();
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);

    return (
      <>
        <Route exact path="/main">
          <PhysicianMain />
        </Route>
        <Route exact path="/main/alerts">
          <Alerts />
        </Route>
        <Route exact path="/main/profile">
          <PhysicianProfile />
          <Snackbar
            open={success}
            onClose={() => setSuccess(false)}
            ContentProps={{ className: classes.success }}
            action={<SnackBarActions icon={<Check fontSize="small" />} />}
            message="Successfully saved availability!"
            autoHideDuration={1000}
          />
          <Snackbar
            open={failure}
            onClose={() => setFailure(false)}
            ContentProps={{ className: classes.failure }}
            action={<SnackBarActions icon={<Check fontSize="small" />} />}
            message="Failed to save your availability, please try again"
            autoHideDuration={3000}
          />
        </Route>
        <Route exact path="/main/availability">
          <Availability
            onUnmount={(successParam) => (successParam ? setSuccess(true) : setFailure(true))}
          />
        </Route>
        <Route exact path="/main/overrides">
          <Overrides
            onUnmount={(successParam) => (successParam ? setSuccess(true) : setFailure(true))}
          />
        </Route>
        <Route exact path="/main/contactinfo">
          <ContactInfo />
        </Route>
      </>
    );
  },
  {
    includeGreetings: false,
    authenticatorComponents: [
      <Header onBack={() => localStorage.removeItem("physicianphonenumber")} title="Sign In" key={-1} parent="/" />,
      <PhoneSignIn key={0} />,
    ],
    theme: AuthTheme,
  } as any,
);

const FirstResponderRoutes = withAuthenticator(
  () => (
    <>
      <Route exact path="/main">
        <FirstResponderMain />
      </Route>
      <Route exact path="/main/profile">
        <FirstResponderProfile />
      </Route>
    </>
  ),
  {
    includeGreetings: false,
    authenticatorComponents: [
      <Header
        onBack={() => localStorage.removeItem("firstresponderphonenumber")}
        title="Sign In"
        key={-1}
        parent="/"
      />,
      <PhoneSignIn key={0} />,
    ],
    theme: AuthTheme,
  } as any,
);

export default Router;
