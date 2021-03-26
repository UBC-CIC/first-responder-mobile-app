import { ReactElement } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "amazon-chime-sdk-component-library-react";
import Router from "./components/Router";
import { OfflineContextProvider } from "./components/context/OfflineContext";

const App = (): ReactElement => (
  <ThemeProvider theme={darkTheme}>
    <OfflineContextProvider>
      <Router />
    </OfflineContextProvider>
  </ThemeProvider>
);

export default App;
