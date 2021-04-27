import Navigation from "components/Navigation";
import BeaconRecords from "pages/beacon-records";
import Home from "pages/home";
import React, { FunctionComponent } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Beacon from "./pages/beacon";
import { BeaconsGateway } from "./gateways/BeaconsGateway";
import Footer from "./components/Footer";
import { AuthWrapper } from "./components/auth/AuthWrapper";
import { RequireAuth } from "components/auth/RequireAuth";

const App: FunctionComponent = () => {
  const beaconsGateway = new BeaconsGateway();

  return (
    <AuthWrapper>
      <Router>
        <Navigation />
        <RequireAuth>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/beacon-records">
              <BeaconRecords beaconsGateway={beaconsGateway} />
            </Route>
            <Route path="/beacon">
              <Beacon />
            </Route>
          </Switch>
        </RequireAuth>
      </Router>
      <Footer />
    </AuthWrapper>
  );
};

export default App;
