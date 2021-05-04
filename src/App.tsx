import { RequireAuth } from "components/auth/RequireAuth";
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
import { BeaconResponseTranslator } from "./gateways/translators/BeaconResponseTranslator";
import { BeaconRecordsListView } from "./views/BeaconRecordsListView";
import { SingleBeaconRecordView } from "./views/SingleBeaconRecordView";

interface ResourceParams {
  id: string;
}

const App: FunctionComponent = () => {
  const beaconResponseTranslator = new BeaconResponseTranslator();
  const beaconsGateway = new BeaconsGateway(beaconResponseTranslator);

  const SingleBeaconRecordViewWithParam: FunctionComponent = () => {
    const { id } = useParams<ResourceParams>();
    return (
      <SingleBeaconRecordView beaconsGateway={beaconsGateway} beaconId={id} />
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
            <Route path="/beacon/:id">
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
