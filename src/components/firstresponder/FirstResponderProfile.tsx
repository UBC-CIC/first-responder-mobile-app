import { Fab, makeStyles, TextField } from "@material-ui/core";
import React, { ReactElement, useState } from "react";
import Colors from "../styling/Colors";
import Layout from "../styling/Layout";
import { DarkModeTextField } from "../physician/ContactInfo";
import { Save } from "@material-ui/icons";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: "1",
    alignItems: "center",
  },
  button: {
    backgroundColor: `${Colors.theme.coral} !important`,
    color: Colors.theme.platinum,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 15,
    margin: 10,
  },
  icon: {
    marginRight: 10,
  },
});

const FirstResponderProfile = (): ReactElement => {
  const classes = useStyles();
  const [form, setForm] = useState({
    phone: localStorage.getItem("firstresponderphonenumber"),
    firstName: "",
    lastName: "",
    occupation: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    const tryString = e.target.value;
    if (tryString.length == 0) {
      setForm({ ...form, phone: tryString });
      return;
    }
    if (tryString.length > 10) {
      return;
    }
    if (!tryString.charAt(tryString.length - 1).match(/[0-9]/)) return;

    setForm({ ...form, phone: tryString });
  };
  return (
    <Layout title="First Responder Profile" parent="/firstresponder" flexColumn>
      <div className={classes.root}>
        <DarkModeTextField
          label="Phone Number"
          type="tel"
          onChange={handleChange}
          value={form.phone}
          inputProps={{ pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }}
        />
        <DarkModeTextField
          label="First Name"
          type="tel"
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          value={form.firstName}
        />
        <DarkModeTextField
          label="Last Name"
          type="tel"
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          value={form.lastName}
        />
      </div>
      <Fab variant="extended" className={classes.button}>
        <Save className={classes.icon} />
        Create / Edit Profile
      </Fab>
    </Layout>
  );
};

export default FirstResponderProfile;
