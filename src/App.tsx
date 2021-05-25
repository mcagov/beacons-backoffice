import { Configuration, PublicClientApplication } from "@azure/msal-browser";
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
import { Footer } from "./components/layout/Footer";
import { Navigation } from "./components/layout/Navigation";
import { applicationConfig } from "./config";
import { AuthGateway } from "./gateways/AuthGateway";
import { BeaconsGateway } from "./gateways/BeaconsGateway";
import { BeaconRequestMapper } from "./gateways/mappers/BeaconRequestMapper";
import { BeaconResponseMapper } from "./gateways/mappers/BeaconResponseMapper";
import { BeaconRecordsListView } from "./views/BeaconRecordsListView";
import { SingleBeaconRecordView } from "./views/SingleBeaconRecordView";

interface ResourceParams {
  id: string;
}

const configuration: Configuration = {
  auth: {
    clientId: applicationConfig.azureADClientId as string,
    authority: `https://login.microsoftonline.com/${applicationConfig.azureADTenantId}`,
  },
};

const pca = new PublicClientApplication(configuration);

const App: FunctionComponent = () => {
  const beaconResponseMapper = new BeaconResponseMapper();
  const authGateway = new AuthGateway(pca);
  const beaconRequestMapper = new BeaconRequestMapper();
  const beaconsGateway = new BeaconsGateway(
    beaconResponseMapper,
    beaconRequestMapper,
    authGateway
  );
  const usesGateway = new UsesGateway(beaconResponseMapper, authGateway);

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
    <AuthWrapper pca={pca}>
      <Router>
        <Navigation />
        <RequireAuth>
          <Switch>
            <Route exact path="/">
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
