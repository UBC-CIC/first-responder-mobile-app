import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ArrowBack, Wifi, WifiOff } from "@material-ui/icons";
import CSS from "csstype";
import React, { ReactElement, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import OfflineContext from "../context/OfflineContext";
import Colors from "../styling/Colors";

const Header = ({
  title,
  style,
  parent,
  hideBackButton,
  onChangeToOffline,
  onBack,
}: {
  title?: string;
  style?: CSS.Properties;
  parent?: string;
  hideBackButton?: boolean;
  onChangeToOffline?: Function;
  onBack?: Function;
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
  const [forceOffline, setForceOffline] = useState(false);
  const location = useLocation();
  const { offline, setOffline } = useContext(OfflineContext);

  const handleBackButtonPressed = () => {
    if (onBack) {
      onBack();
    }
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
          <div style={{ width: 30 }} />
        )}
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => {
            if (onChangeToOffline) {
              onChangeToOffline();
              setForceOffline(true);
            } else { setOffline(!offline); }
          }}
        >
          {forceOffline || offline || !navigator.onLine ? <WifiOff /> : <Wifi />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
