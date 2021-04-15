import { useEffect, useState } from "react";
import { GeolocationPosition } from "../../types";

const getLocation = async (): Promise<NonNullable<GeolocationPosition>> => new Promise((res, rej) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      res(position);
    });
  } else {
    rej(new Error("No geolocation in navigator"));
  }
});

const useLocation = () => {
  const [location, setLocation] = useState<GeolocationPosition>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>();

  useEffect(() => {
    const f = async () => {
      try {
        const gotLocation = await getLocation();
        setLocation(() => gotLocation);
        setLoading(() => false);
      } catch (e) {
        setError(e);
      }
    };
    f();
  }, []);

  return { location: location?.coords, loading, error };
};

export default useLocation;
