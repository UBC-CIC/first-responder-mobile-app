import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import React, { ReactElement } from "react";
import { ArrowBack } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import Colors from "./Colors";
import CSS from "csstype";
import { Router } from "workbox-routing";
const Header = ({
  title,
  style,
}: {
  title?: string;
  style?: CSS.Properties;
}): ReactElement => {
  const useStyles = makeStyles({
    header: {
      backgroundColor: Colors.theme.coral,
      ...style,
    },
    title: {
      fontFamily: "Signika Negative",
    },
  });
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();

  return (
    <AppBar position="sticky" className={classes.header}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => history.goBack()}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
