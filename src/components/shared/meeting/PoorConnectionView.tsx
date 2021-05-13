import { makeStyles, Snackbar } from "@material-ui/core";
import { Phone } from "@material-ui/icons";
import React from "react";
import Colors from "../../styling/Colors";
import SnackBarActions from "../../ui/Alert";

type PoorConnectionViewProps = {
    poorConnection: boolean;
    handleClose: (event?: React.SyntheticEvent, reason?: string) => void;
    handleSwitch: () => void;
};

const useStyles = makeStyles({
  suggestion: {
    backgroundColor: Colors.theme.error,
    color: Colors.theme.platinum,
  },
});

const PoorConnectionView = ({ poorConnection, handleClose, handleSwitch }:PoorConnectionViewProps) => {
  const classes = useStyles();

  return (
    <div>
      <Snackbar
        open={poorConnection}
        onClose={handleClose}
        ContentProps={{ className: classes.suggestion }}
        action={(
          <SnackBarActions
            icon={<Phone fontSize="small" />}
            handleClose={() => {
              handleSwitch();
            }}
          />
        )}
        message="Click to switch to Voice over Telephone."
        onClick={() => {
          handleSwitch();
        }}
      />
    </div>
  );
};

export default PoorConnectionView;
