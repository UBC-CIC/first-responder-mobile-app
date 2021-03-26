import { v4 as uuid } from "uuid";

const useSessionId = () => {
  if (!sessionStorage.getItem("sessionid")) {
    const id = uuid();
    sessionStorage.setItem("sessionid", id);
  } else return sessionStorage.getItem("sessionid");
};

export default useSessionId;
