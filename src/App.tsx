import Navigation from "components/Navigation";
import BeaconRecords from "pages/beacon-records";
import Home from "pages/home";
import React, { FunctionComponent } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { BeaconsGateway } from "./gateways/BeaconsGateway";

const App: FunctionComponent = () => {
  const beaconsGateway = new BeaconsGateway();
  return (
    <div>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/beacon-records">
            <BeaconRecords beaconsGateway={beaconsGateway} />
          </Route>
        </Switch>
        {/*<Footer />*/}
      </Router>
    </div>
  );
};

export default App;
