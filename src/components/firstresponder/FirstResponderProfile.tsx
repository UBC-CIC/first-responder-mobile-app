import { makeStyles, TextField } from "@material-ui/core";
import React, { ReactElement, useState } from "react";
import Colors from "../styling/Colors";
import Layout from "../styling/Layout";
import { DarkModeTextField } from "../physician/ContactInfo";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: "1",
    alignItems: "center",
  },
  // button: {
  //   backgroundColor: `${Colors.theme.coral} !important`,
  //   color: Colors.theme.platinum,
  //   fontFamily: "Montserrat",
  //   fontWeight: "bold",
  //   fontSize: 15,
  //   margin: 10,
  // },
  // icon: {
  //   marginRight: 10,
  // },
  // signOutButton: {
  //   backgroundColor: `${Colors.theme.skobeloff} !important`,
  // },
  // mainContainer: {
  //   flex: 1,
  //   display: "flex",
  //   alignItems: "center",
  //   flexDirection: "column",
  // },
  // signOutContainer: {
  //   display: "flex",
  //   flex: 0.3,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // signOutIcon: {
  //   marginLeft: 10,
  // },
});

const FirstResponderProfile = (): ReactElement => {
  const classes = useStyles();
  const [phone, setPhone] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    const tryString = e.target.value;
    if (tryString.length == 0) {
      setPhone(tryString);
      return;
    }
    if (tryString.length > 10) {
      return;
    }
    if (!tryString.charAt(tryString.length - 1).match(/[0-9]/)) return;

    setPhone(tryString);
  };
  return (
    <Layout title="First Responder Profile" parent="/firstresponder" flexColumn>
      <div className={classes.root}>
        <DarkModeTextField
          label="Phone Number"
          type="tel"
          onChange={handleChange}
          value={phone}
          inputProps={{ pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }}
        />
      </div>
    </Layout>
  );
};

export default FirstResponderProfile;
