import Footer from "components/footer";
import Navigation from "components/navigation";
import BeaconRecords from "pages/beacon-records";
import Home from "pages/home";
import React, { FunctionComponent } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Beacon from "./pages/beacon";

const App: FunctionComponent = () => {
  return (
    <div>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/beacon-records">
            <BeaconRecords />
          </Route>
          <Route path="/beacon">
            <Beacon />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
