import { Navigation } from "./components/layout/Navigation";
import React, { FunctionComponent } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { BeaconsGateway } from "./gateways/BeaconsGateway";
import { Footer } from "./components/layout/Footer";
import { AuthWrapper } from "./components/auth/AuthWrapper";
import { RequireAuth } from "components/auth/RequireAuth";
import { BeaconRecordsListView } from "./views/BeaconRecordsListView";
import { SingleBeaconRecordView } from "./views/SingleBeaconRecordView";
import { Home } from "./components/Home";

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
              <BeaconRecordsListView beaconsGateway={beaconsGateway} />
            </Route>
            <Route path="/beacon">
              <SingleBeaconRecordView />
            </Route>
          </Switch>
        </RequireAuth>
      </Router>
      <Footer />
    </AuthWrapper>
  );
};

export default App;
