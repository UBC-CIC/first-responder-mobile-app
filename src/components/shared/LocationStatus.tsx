/** Displays the region and country in text form */
import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import { Language, LocationCity } from "@material-ui/icons";
import React, { useState } from "react";
import reverse from "reverse-geocode";
import { GeolocationCoordinates } from "../../types";
import Colors from "../styling/Colors";

const useStyles = makeStyles({
  location: {
    display: "flex",
    width: "80%",
    color: Colors.theme.platinum,
    justifyContent: "center",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: "10px",
  },
  region: {
    textAlign: "center",
  },
  locationContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const LocationError = ({
  onClick,
  errorMessage,
}: {
  onClick: Function;
  errorMessage?: string;
}) => (
  <div className="flex column align justify">
    <p style={{ color: "white", textAlign: "center" }}>{errorMessage || "Error Getting Location"}</p>
    <Button
      variant="contained"
      onClick={() => {
        onClick();
      }}
    >
      Retry
    </Button>
  </div>
);

/** Dumb Component for showing the user's location in UI */
const LocationStatus = ({
  location,
  locationLoading,
  locationError,
  retry,
}: {
  location?: GeolocationCoordinates;
  locationLoading: boolean;
  locationError?: Error | null;
  retry: Function;
}) => {
  const [error, setError] = useState("");
  const classes = useStyles();
  if (locationLoading) {
    return <CircularProgress />;
  }
  if (locationError) {
    return (
      <LocationError
        errorMessage={error}
        onClick={() => {
          navigator.permissions.query({ name: "geolocation" }).then((e) => {
            e.onchange = () => retry();
            console.log(e.state);
            if (e.state === "denied") {
              setError("Location Access Denied. Please allow the app to use location in your device's settings");
            } else if (e.state === "prompt") {
              setError("Location Access Denied. Please allow the app to use location in your device's settings");
            }
          });
          retry();
          console.log("Retry");
        }}
      />
    );
  }
  if (location) {
    const { latitude, longitude } = location;
    if (latitude && longitude) {
      const data = reverse.lookup(latitude, longitude, "ca");
      return (
        <div className={classes.locationContainer}>
          <div className={classes.location}>
            <div className={classes.locationIcon}>
              <Language />
            </div>
            <p className={classes.region}>{`${data.state}, ${data.country}`}</p>
          </div>
          <div className={classes.location}>
            <div className={classes.locationIcon}>
              <LocationCity />
            </div>
            <p className={classes.region}>{data.region}</p>
          </div>
        </div>
      );
    }
  }
  return (
    <LocationError
      errorMessage="Error"
      onClick={() => navigator.geolocation.getCurrentPosition(
        (p) => console.log(p),
        (e) => console.log(e),
      )}
    />
  );
};

export default LocationStatus;
