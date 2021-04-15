import { CircularProgress, makeStyles } from "@material-ui/core";
import { Language, LocationCity } from "@material-ui/icons";
import React from "react";
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

const LocationStatus = ({ location, locationLoading, locationError }: {location?: GeolocationCoordinates, locationLoading: boolean, locationError?: Error | null}) => {
  const classes = useStyles();
  if (locationLoading) {
    return <CircularProgress />;
  }
  if (locationError) {
    return <p>Error Getting Location</p>;
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
  return <p>Error Getting Location</p>;
};

export default LocationStatus;
