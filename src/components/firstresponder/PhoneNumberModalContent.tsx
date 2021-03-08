import { Fab, makeStyles, Paper } from "@material-ui/core";
import React, { ReactElement, useState } from "react";
import Colors from "../styling/Colors";
import { DarkModeTextField } from "../ui/DarkModeTextField";

const useStyles = makeStyles({
  paper: {
    padding: 20,
    backgroundColor: Colors.theme.space,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: `${Colors.theme.coral} !important`,
    color: Colors.theme.platinum,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 15,
    margin: 10,
    width: "70%",
  },
});

const PhoneNumberModalContent = ({
  onClick,
}: {
  onClick: (phoneNumber: string) => void;
}): ReactElement => {
  const classes = useStyles();
  const [phone, setPhone] = useState("");

  const handleChangePhoneNumber = (
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
    <div
      className="ffc"
      style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Paper className={classes.paper}>
        <p style={{ color: Colors.theme.platinum }}> Register Phone Number </p>
        <DarkModeTextField
          label="Phone Number"
          type="tel"
          onChange={handleChangePhoneNumber}
          value={phone}
          inputProps={{ pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }}
        />
        <Fab
          variant="extended"
          className={classes.button}
          onClick={() => onClick(phone)}
        >
          Submit
        </Fab>
      </Paper>
    </div>
  );
};

export default PhoneNumberModalContent;
