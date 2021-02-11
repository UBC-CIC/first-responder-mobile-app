import { ReactElement } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FirstResponderMain from "./firstresponder/FirstResponderMain";
import Home from "./Home";
import Alerts from "./physician/Alerts";
import Availability from "./physician/Availability";
import ContactInfo from "./physician/ContactInfo";
import PhysicianMain from "./physician/PhysicianMain";
import PhysicianProfile from "./physician/PhysicianProfile";
import Call from "./shared/Call";
const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        {/* Physician */}

        <Route exact path="/physician">
          <PhysicianMain />
        </Route>
        <Route exact path="/physician/alerts">
          <Alerts />
        </Route>
        <Route exact path="/physician/profile">
          <PhysicianProfile />
        </Route>
        <Route exact path="/physician/availability">
          <Availability />
        </Route>
        <Route exact path="/physician/contactinfo">
          <ContactInfo />
        </Route>

        {/* First Responder */}
        <Route exact path="/firstresponder">
          <FirstResponderMain />
        </Route>
        {/* Shared */}

        <Route exact path="/call">
          <Call />
        </Route>
        {/* Not Found */}
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
