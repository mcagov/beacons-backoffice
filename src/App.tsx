import { Navigation } from "./components/layout/Navigation";
import React, { FunctionComponent } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { BeaconsGateway } from "./gateways/BeaconsGateway";
import { Footer } from "./components/layout/Footer";
import { AuthWrapper } from "./components/auth/AuthWrapper";
import { RequireAuth } from "components/auth/RequireAuth";
import { BeaconRecords } from "./components/BeaconRecords";
import { Beacon } from "./components/Beacon";
import { Home } from "./components/Home";
import { GetBeaconsInTableFormat } from "./useCases/GetBeaconsInTableFormat";

const App: FunctionComponent = () => {
  const beaconsGateway = new BeaconsGateway();
  const useCases = {
    getBeaconsInTableFormat: new GetBeaconsInTableFormat(beaconsGateway),
  };

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
              <BeaconRecords
                getBeaconsInTableFormat={useCases.getBeaconsInTableFormat}
              />
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
