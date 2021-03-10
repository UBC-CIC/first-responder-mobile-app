import { Button, IconButton } from "@material-ui/core";
import React, { ReactNode } from "react";

type AlertProps = {
  handleClose?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  icon: ReactNode;
};

const SnackBarActions = ({ handleClose, icon }: AlertProps) => {
  return (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        {icon}
      </IconButton>
    </React.Fragment>
  );
};

export default SnackBarActions;
