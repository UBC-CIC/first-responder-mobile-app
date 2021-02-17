import { ReactElement } from "react";
import Router from "./components/Router";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "amazon-chime-sdk-component-library-react";
const App = (): ReactElement => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
