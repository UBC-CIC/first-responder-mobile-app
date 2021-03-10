import Auth from "@aws-amplify/auth";
import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { ForgotPassword } from "aws-amplify-react";
import React from "react";
import Colors from "../styling/Colors";
import { DarkModeTextField } from "./DarkModeTextField";
import Layout from "./Layout";
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
  return (
    <Layout
      noHeader
      title="Sign In"
      flexColumn
      style={{ height: "100px !important" }}
    >
      <div style={{ display: "flex", flexDirection: "column", padding: 30 }}>
        <h3
          style={{
            color: Colors.theme.platinum,
            fontFamily: "Signika Negative",
          }}
        >
          Sign into your account
        </h3>
        <DarkTextField label="Email" required />
        <DarkTextField label="Password" required />
        <p
          style={{
            color: Colors.theme.platinum,
            marginTop: 2,
            marginBottom: 20,
            fontFamily: "Montserrat",
            fontSize: 12,
          }}
        >
          Forgot your password?
          <a style={{ color: Colors.theme.coral }}> Reset password</a>
        </p>
        <Button variant="contained" className={classes.button}>
          Sign In
        </Button>
      </div>
    </Layout>
  );
};

export default SignIn;
