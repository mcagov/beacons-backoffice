import Navigation from "components/Navigation";
import React, { FunctionComponent } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { BeaconsGateway } from "./gateways/BeaconsGateway";
import Footer from "./components/Footer";
import { AuthWrapper } from "./components/auth/AuthWrapper";
import { RequireAuth } from "components/auth/RequireAuth";
import BeaconRecords from "./pages/BeaconRecords";
import Beacon from "./pages/Beacon";
import Home from "./pages/Home";

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
