import { createServer } from "miragejs";
import { applicationConfig } from "./config";
import { singleBeaconApiResponseFixture } from "./fixtures/singleBeaconApiResponse.fixture";
import { manyBeaconsApiResponseFixture } from "./fixtures/manyBeaconsApiResponse.fixture";

export function makeServer({ environment = "development" } = {}) {
  console.log("Stubbing the Beacons API using Mirage...");

  const authDomains = [
    "https://*.msftauth.net/**",
    "https://login.live.com/**",
    "https://login.microsoftonline.com/**",
  ];

  return createServer({
    environment,

    routes() {
      this.get(`${applicationConfig.apiUrl}/beacons`, () => {
        // TODO: Update manyBeaconsApiResponseFixture to match endpoint
        return {
          data: manyBeaconsApiResponseFixture,
        };
      });

      this.get(`${applicationConfig.apiUrl}/beacons/:id`, () => {
        return singleBeaconApiResponseFixture;
      });

      this.patch(`${applicationConfig.apiUrl}/beacons/:id`, () => {
        return true;
      });

      this.passthrough(...authDomains);
    },
  });
}
