import { useLocation } from "react-router-dom";

export const useQuery = () => {
  const params = new URLSearchParams(useLocation().search);
  return params;
};
