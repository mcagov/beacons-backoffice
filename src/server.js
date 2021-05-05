import { createServer } from "miragejs";
import { applicationConfig } from "./config";
import { singleBeaconApiResponseFixture } from "./fixtures/singleBeaconApiResponse.fixture";
import { manyBeaconsApiResponseFixture } from "./fixtures/manyBeaconsApiResponse.fixture";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    routes() {
      this.get(`${applicationConfig.apiUrl}/beacons`, () => {
        // TODO: Update manyBeaconsApiResponseFixture to match endpoint
        return {
          data: manyBeaconsApiResponseFixture,
        };
      });

      this.get(`${applicationConfig.apiUrl}/beacon/:id`, () => {
        return singleBeaconApiResponseFixture;
      });
    },
  });
}
