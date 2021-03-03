import { ReactElement } from "react";
import Router from "./components/Router";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "amazon-chime-sdk-component-library-react";
import { OfflineContextProvider } from "./components/context/OfflineContext";
const App = (): ReactElement => {
  return (
    <ThemeProvider theme={darkTheme}>
      <OfflineContextProvider>
        <Router />
      </OfflineContextProvider>
    </ThemeProvider>
  );
};

export default App;
