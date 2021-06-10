/** Screen for unauthenticated view, points user to either PSTN Join or PSTN Create */
import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useButtonClasses } from "../Home";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import Layout from "../ui/Layout";
/** Component that is used when a user has no internet
 * and cannot login to the app. Allows anybody to create a
 * meeting or join an existing one via PSTN.
 * */
const BadConnection = () => {
  const buttonClasses = useButtonClasses();
  const globalClasses = useGlobalStyles();
  return (
    <Layout parent="/" title="Join or Create a Call">
      <div className="body-container">
        <div className={`${globalClasses.wideButtonContainer} `}>
          <Button
            component="a"
            href={`tel:${process.env.REACT_APP_CREATE_PHONE_NUMBER}`}
            classes={{
              root: buttonClasses.root,
              label: buttonClasses.label,
            }}
            onClick={() => {}}
          >
            Create A Conference
          </Button>
          <Button
            component="a"
            href={`tel:${process.env.REACT_APP_JOIN_PHONE_NUMBER}`}
            classes={{
              root: buttonClasses.root,
              label: buttonClasses.label,
            }}
            onClick={() => {}}
          >
            Join Conference
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default BadConnection;
