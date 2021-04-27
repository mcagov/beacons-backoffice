import Navigation from "components/Navigation";
import BeaconRecords from "pages/BeaconRecords";
import Home from "pages/Home";
import React, { FunctionComponent } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import { BeaconsGateway } from "./gateways/BeaconsGateway";
import Beacon from "./pages/Beacon";

const App: FunctionComponent = () => {
  const beaconsGateway = new BeaconsGateway();
  return (
    <>
      <Router>
        <Navigation />
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
      </Router>
      <Footer />
    </>
  );
};

export default App;
