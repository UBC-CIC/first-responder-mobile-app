import { withAuthenticator } from "aws-amplify-react";
import React from "react";
import { Redirect } from "react-router";
import AuthTheme from "../ui/AuthTheme";
import Header from "../ui/Header";
import PhysicianSignIn from "./PhysicianSignIn";

const PhysicianLogin = () => {
  if (localStorage.getItem("physicianphonenumber")) {
    return <Redirect to="/main" />;
  }
  return <Redirect to="/" />;
};

export default withAuthenticator(PhysicianLogin, {
  includeGreetings: false,
  authenticatorComponents: [
    <Header title="Sign In" key={-1} parent="/" />,
    <PhysicianSignIn key={0} />,
  ],
  theme: AuthTheme,
} as any);
