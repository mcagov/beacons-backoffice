import { RequireAuth } from "components/auth/RequireAuth";
import { UsesGateway } from "gateways/UsesGateway";
import React, { FunctionComponent } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import "./App.scss";
import { AuthWrapper } from "./components/auth/AuthWrapper";
import { Home } from "./components/Home";
import { Footer } from "./components/layout/Footer";
import { Navigation } from "./components/layout/Navigation";
import { BeaconsGateway } from "./gateways/BeaconsGateway";
import { BeaconResponseMapper } from "./gateways/mappers/BeaconResponseMapper";
import { BeaconRecordsListView } from "./views/BeaconRecordsListView";
import { SingleBeaconRecordView } from "./views/SingleBeaconRecordView";

interface ResourceParams {
  id: string;
}

const App: FunctionComponent = () => {
  const beaconResponseMapper = new BeaconResponseMapper();
  const beaconsGateway = new BeaconsGateway(beaconResponseMapper);
  const usesGateway = new UsesGateway(beaconResponseMapper);

  const SingleBeaconRecordViewWithParam: FunctionComponent = () => {
    const { id } = useParams<ResourceParams>();
    return (
      <SingleBeaconRecordView
        beaconsGateway={beaconsGateway}
        usesGateway={usesGateway}
        beaconId={id}
      />
    );
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
              <BeaconRecordsListView beaconsGateway={beaconsGateway} />
            </Route>
            <Route path="/beacons/:id">
              <SingleBeaconRecordViewWithParam />
            </Route>
          </Switch>
        </RequireAuth>
      </Router>
      <Footer />
    </AuthWrapper>
  );
};

export default App;
