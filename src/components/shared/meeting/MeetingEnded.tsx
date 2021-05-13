/** Sends the yser to the create pstn phone number, to be called on their cell phone. */
import { Button } from "@material-ui/core";
import React, { ReactElement } from "react";
import { useHistory } from "react-router";
import { useGlobalStyles } from "../../styling/GlobalMuiStyles";

/** Prompts user to join/create a call over PSTN. */
const MeetingEnded = (): ReactElement => {
  const history = useHistory();
  const classes = useGlobalStyles();
  return (
    <div style={{ minHeight: "300px", color: "white", justifyContent: "space-evenly" }} className="ffc align">
      The Meeting Has Ended
      <Button variant="contained" className={`${classes.coral} ${classes.button}`} onClick={() => history.push("/")}>Ok</Button>
    </div>
  );
};

export default MeetingEnded;
