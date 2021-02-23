import { Button, Fab, makeStyles } from "@material-ui/core";
import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../styling/Layout";
import bg from "../../assets/first-responder-home-bg.svg";
import "../../styles/firstresponder/Home.css";
import Colors from "../styling/Colors";
import PhoneIcon from "@material-ui/icons/Phone";

const useStyles = makeStyles({
  button: {
    backgroundColor: `${Colors.theme.coral} !important`,
  },
});

const FirstResponderMain = (): ReactElement => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Layout
      title="First Responder Home"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="firstresponder-root">
        <Fab
          variant="extended"
          id="callStars"
          className={classes.button}
          onClick={() => {
            history.push("/call");
          }}
        >
          <PhoneIcon />
          Call STARS
        </Fab>
      </div>
    </Layout>
  );
};

export default FirstResponderMain;
