/* UI for OTP Phone Number login for physician flow */
import Auth from "@aws-amplify/auth";
import {
  Button, makeStyles, TextField, withStyles,
} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../styles/firstresponder/SignIn.css";
import { fetchPhysicianProfile } from "../calls";
import Colors from "../styling/Colors";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import Layout from "../ui/Layout";

// eslint-disable-next-line no-shadow
enum AuthState {
  NOT_STARTED,
  STARTED,
  SMS_SENT,
  COMPLETE,
  ERROR,
  NOT_AUTHENTICATED,
  INCORRECT
}

const useStyles = makeStyles({
  button: {
    backgroundColor: Colors.theme.coral,
    color: Colors.theme.platinum,
    fontFamily: "Gudea",
    fontWeight: "bolder",
    "&:active": {
      backgroundColor: Colors.theme.coral,
    },
    "&:hover": {
      backgroundColor: Colors.theme.coral,
      border: `2px solid ${Colors.theme.platinum}`,
    },
    marginTop: 20,
  },
  errorText: {
    color: Colors.theme.error,
    textAlign: "center",
    marginTop: "1em",
  },
  header: {
    color: Colors.theme.platinum,
    fontFamily: "Signika Negative",
  },
});

const DarkTextField = withStyles({
  root: {
    margin: "10px 0",
    "& label": {
      color: "white",
      fontFamily: "Montserrat",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInputBase-input": {
      color: "white",
      fontFamily: "Montserrat",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
  },
})(TextField);

/** Component for login logic for specialists. Currently prevents users from signing up
 *  if the specialist-profile table does not contain their phone number.
 *  This was a naive approach, but it was done because we are unsure which party will be doing
 *  specialist verification. So as long as they have been accepted into the table, they will
 *  have been verified. This verification step should be added concretely in a production-ready app.
 * */
const PhysicianSignIn = () => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>();
  const [authState, setAuthState] = useState<AuthState>(AuthState.NOT_STARTED);
  const [numFails, setNumFails] = useState(0);
  const handleStartAuth = async () => {
    const formattedNumber = `+${phoneNumber}`;
    const fetched = await fetchPhysicianProfile({ phone_number: formattedNumber });
    if (fetched) {
      try {
        setAuthState(AuthState.STARTED);
        await Auth.signUp({
          username: `${formattedNumber}`,
          password: Date.now().toString(),
        });
      } catch (e) {
      // Handle sign up error
        if (e.code !== "UsernameExistsException") {
          setAuthState(AuthState.ERROR);
          console.error(e);
        }
      }
      try {
        const cognitoUser = await Auth.signIn(formattedNumber);
        setAuthState(AuthState.SMS_SENT);
        setUser(cognitoUser);
      } catch (e) {
      // Handle sign in errors
        setAuthState(AuthState.ERROR);
        console.error(e);
      }
    } else {
      setAuthState(AuthState.NOT_AUTHENTICATED);
    }
  };

  const handleOTP = async () => {
    try {
      const cognitoUser = await Auth.sendCustomChallengeAnswer(user, password);
      if (!cognitoUser.Session && cognitoUser.username) {
        localStorage.setItem("physicianphonenumber", cognitoUser.username);
      }
    } catch {
      // Handle 3 error thrown for 3 incorrect attempts.
      setAuthState(AuthState.INCORRECT);
      if (numFails + 1 === 3) {
        setAuthState(AuthState.ERROR);
      } else setNumFails(numFails + 1);
    }
  };

  const renderErrorMessage = () => {
    switch (authState) {
    case AuthState.ERROR:
      return "There was an error signing up: please check internet connection and try again";
    case AuthState.NOT_AUTHENTICATED:
      return "You are not registered as a certified specialist";
    case AuthState.INCORRECT:
      return "Incorrect One Time Password";
    default:
      return "";
    }
  };

  const signInForm = (
    <div className="container">
      <h3 className={classes.header}>Sign in with Phone Number</h3>
      <PhoneInput
        country="ca"
        preferredCountries={["ca", "us"]}
        masks={{ ca: "(...) ...-....", us: "(...) ...-...." }}
        priority={{ ca: 0, us: 1 }}
        value={phoneNumber}
        onChange={(phone) => {
          setPhoneNumber(phone);
          setAuthState(AuthState.NOT_STARTED);
        }}
        disabled={authState === AuthState.STARTED}
      />
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => handleStartAuth()}
        disabled={authState === AuthState.NOT_AUTHENTICATED || authState === AuthState.STARTED}
      >
        Sign In
      </Button>
      <FormHelperText className={classes.errorText}>
        {renderErrorMessage()}
      </FormHelperText>
      {authState === AuthState.NOT_AUTHENTICATED
      && <Button onClick={() => alert("Take user to specialist registration")} className={`${globalClasses.coral} ${globalClasses.button}`}>Register as a Specialist</Button>}
    </div>
  );

  const OTPForm = (
    <div className="container">
      <h3 className={classes.header}>Enter One Time Password</h3>
      <DarkTextField
        label="One Time Password"
        type="number"
        required
        value={password}
        onChange={(e) => {
          e.preventDefault();
          e.target.value = e.target.value
            .toString()
            .slice(0, 6);
          setAuthState(AuthState.SMS_SENT);
          setPassword(e.target.value);
        }}
      />
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => handleOTP()}
      >
        Submit
      </Button>
      <FormHelperText className={classes.errorText}>
        {renderErrorMessage()}
      </FormHelperText>
    </div>
  );

  const renderSignInForm = () => {
    switch (authState) {
    case AuthState.NOT_STARTED:
    case AuthState.STARTED:
      return signInForm;
    case AuthState.INCORRECT:
    case AuthState.SMS_SENT:
      return OTPForm;

    default:
      return signInForm;
    }
  };

  return (
    <Layout
      noHeader
      title="Sign In"
      flexColumn
      style={{ height: "100px !important" }}
    >
      {renderSignInForm()}
    </Layout>
  );
};

export default PhysicianSignIn;
