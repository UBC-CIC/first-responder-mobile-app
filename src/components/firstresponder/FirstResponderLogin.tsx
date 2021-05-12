import { withAuthenticator } from "aws-amplify-react";
import React from "react";
import { Redirect } from "react-router";
import AuthTheme from "../ui/AuthTheme";
import Header from "../ui/Header";
import PhoneSignIn from "../ui/PhoneSignIn";

/** Phone OTP login for first responders. Creates a cognito user automatically
 * if this is a new phone number. Used to prove ownership of a phone number.
 */
const FirstResponderLogin = () => {
  if (localStorage.getItem("firstresponderphonenumber")) {
    return (
      <Redirect to="/main" />
    );
  }
  return <Redirect to="/" />;
};

export default withAuthenticator(FirstResponderLogin, {
  includeGreetings: false,
  authenticatorComponents: [
    <Header title="Sign In" key={-1} parent="/" />,
    <PhoneSignIn key={0} />,
  ],
  theme: AuthTheme,
} as any);
