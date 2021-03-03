import React, { createContext, ReactElement, ReactNode, useState } from "react";
const OfflineContext = createContext({
  offline: false,
} as OfflineContextType);
type OfflineContextType = {
  offline: boolean;
  setOffline: React.Dispatch<React.SetStateAction<boolean>>;
};
const OfflineContextProvider = (props: {
  children?: ReactNode;
}): ReactElement => {
  const [offline, setOffline] = useState(!navigator.onLine);
  const { children } = props;
  return (
    <OfflineContext.Provider value={{ offline, setOffline }}>
      {children}
    </OfflineContext.Provider>
  );
};

export { OfflineContextProvider };
export default OfflineContext;
