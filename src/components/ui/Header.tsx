import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ArrowBack, Wifi, WifiOff } from "@material-ui/icons";
import CSS from "csstype";
import React, { ReactElement, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import OfflineContext from "../context/OfflineContext";
import Colors from "../styling/Colors";

const Header = ({
  title,
  style,
  parent,
  hideBackButton,
}: {
  title?: string;
  style?: CSS.Properties;
  parent?: string;
  hideBackButton?: boolean;
}): ReactElement => {
  const useStyles = makeStyles({
    header: {
      backgroundColor: Colors.theme.coral,
      ...style,
    },
    title: {
      fontFamily: "Signika Negative",
      width: "70%",
    },
    toolbar: {
      width: "100%",
    },
  });
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const { offline, setOffline } = useContext(OfflineContext);

  const handleBackButtonPressed = () => {
    console.log(parent);

    if (parent) {
      history.replace(parent);
    } else {
      history.goBack();
    }
  };
  return (
    <AppBar position="sticky" className={classes.header}>
      <Toolbar className={classes.toolbar}>
        {!hideBackButton ? (
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => handleBackButtonPressed()}
          >
            <ArrowBack />
          </IconButton>
        ) : (
          <div
            style={{ width: 30 }}
          />
        ) }
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setOffline(!offline)}
        >
          {offline || !navigator.onLine ? <WifiOff /> : <Wifi />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
