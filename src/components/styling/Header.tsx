import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import React, { ReactElement } from "react";
import { ArrowBack } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
const Header = ({ title }: { title?: string }): ReactElement => {
  const history = useHistory();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => history.goBack()}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
