import { ReactElement } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "amazon-chime-sdk-component-library-react";
import Router from "./components/Router";
import { OfflineContextProvider } from "./components/context/OfflineContext";

const divInstall = document.getElementById("installContainer") as HTMLElement;

setTimeout(() => {
  divInstall.classList.toggle("hidden", false);
}, 500);

const App = (): ReactElement => (
  <ThemeProvider theme={darkTheme}>
    <OfflineContextProvider>
      <Router />
    </OfflineContextProvider>
  </ThemeProvider>
);

export default App;
