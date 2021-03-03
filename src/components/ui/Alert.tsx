import { Button, IconButton } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";

type AlertProps = {
  handleClose?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const SnackBarActions = ({ handleClose }: AlertProps) => {
  return (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
};

export default SnackBarActions;
