import { IconButton } from "@material-ui/core";
import React, { ReactNode } from "react";

type AlertProps = {
  handleClose?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  icon: ReactNode;
};

const SnackBarActions = ({ handleClose, icon }: AlertProps) => (
  <>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      {icon}
    </IconButton>
  </>
);

export default SnackBarActions;
