import { Navigation } from "components/layout/Navigation";
import { BeaconRecords } from "components/BeaconRecords";
import { Home } from "components/Home";
import React, { FunctionComponent } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { Beacon } from "./components/Beacon";
import { BeaconsGateway } from "./gateways/BeaconsGateway";
import { Footer } from "./components/layout/Footer";
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
