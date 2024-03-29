/** One-Time Password Login with Phone Number */
import Auth from "@aws-amplify/auth";
import {
  Button,
  makeStyles,
  TextField,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import "../../styles/firstresponder/SignIn.css";
import PhoneInput from "react-phone-input-2";
import Colors from "../styling/Colors";
import Layout from "./Layout";
import "react-phone-input-2/lib/style.css";

// eslint-disable-next-line no-shadow
enum AuthState {
  NOT_STARTED,
  STARTED,
  SMS_SENT,
  COMPLETE,
  ERROR,
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
const SignIn = () => {
  const classes = useStyles();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>();
  const [authState, setAuthState] = useState<AuthState>(AuthState.NOT_STARTED);
  const [numFails, setNumFails] = useState(0);
  const handleStartAuth = async () => {
    const formattedNumber = `+${phoneNumber}`;

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
        console.log(e);
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
  };

  const handleOTP = async () => {
    try {
      const cognitoUser = await Auth.sendCustomChallengeAnswer(user, password);
      if (cognitoUser.username) {
        localStorage.setItem("firstresponderphonenumber", cognitoUser.username);
      }
    } catch (e) {
      console.log(e);

      // Handle 3 error thrown for 3 incorrect attempts.
      if (numFails + 1 === 3) {
        setAuthState(AuthState.ERROR);
      } else setNumFails(numFails + 1);
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
        }}
      />
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => handleStartAuth()}
      >
        Sign In
      </Button>
    </div>
  );

  const OTPForm = (
    <div className="container">
      <h3 className={classes.header}>Enter One Time Password</h3>
      <DarkTextField
        label="One Time Password"
        required
        value={password}
        onChange={(e) => {
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
    </div>
  );

  const renderSignInForm = () => {
    switch (authState) {
    case AuthState.NOT_STARTED:
    case AuthState.STARTED:
      return signInForm;
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
      style={{
        height: "100px !important", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center",
      }}
    >
      {renderSignInForm()}
    </Layout>
  );
};

export default SignIn;
