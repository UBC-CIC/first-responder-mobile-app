/** Screen for unauthenticated view, points user to either PSTN Join or PSTN Create */
import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useGlobalStyles } from "../styling/GlobalMuiStyles";
import Layout from "../ui/Layout";

const useButtonClasses = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#FF8552",
    borderRadius: 20,
    height: "50px",
    margin: "20px",
  },
  label: {
    fontFamily: "Montserrat",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
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
            href="tel:1-888-651-1946"
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
            href="tel:+18885998558"
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
