/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from "react";
import { GeolocationPosition } from "../../types";

const getLocation = async (): Promise<NonNullable<GeolocationPosition>> => new Promise((res, rej) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      res(position);
    }, rej);
  } else {
    rej(new Error("No geolocation in navigator"));
  }
});

const useLocation = () => {
  const [location, setLocation] = useState<GeolocationPosition>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>();
  const [rerender, setRerender] = useState(false);

  const retry = () => {
    setLoading(true);
    setLocation(undefined);
    setError(null);
    setRerender(!rerender);
  };

  useEffect(() => {
    const f = async () => {
      try {
        const gotLocation = await getLocation();

        setLocation(() => gotLocation);
        const coords: any = {};
        for (const key in gotLocation.coords) {
          coords[key] = (gotLocation.coords as any)[key];
        }
        const stringableGeolocation = {
          coords,
          timestamp: gotLocation.timestamp,
        };

        sessionStorage.setItem("geolocation", JSON.stringify(stringableGeolocation));
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    if (!sessionStorage.getItem("geolocation")) {
      f();
    } else {
      const fullPosition = JSON.parse(sessionStorage.getItem("geolocation") as string)as GeolocationPosition;

      setError(() => null);
      setLocation(() => fullPosition);
      setLoading(() => false);
    }
  }, [rerender]);

  return {
    location: location?.coords, loading, error, retry,
  };
};

export default useLocation;
