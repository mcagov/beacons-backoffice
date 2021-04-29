import { ListBeaconsTable } from "./ListBeaconsTable";
import { beaconsGatewayFixture } from "../gateways/BeaconsGateway.fixture";

describe("ListBeaconsTable", () => {
  it("returns an empty array when executed", async () => {
    const listBeaconsUseCase = new ListBeaconsTable({
      getAllBeacons: jest.fn().mockImplementation(() => ({ data: [] })),
    });

    const expected = await listBeaconsUseCase.execute();
    expect(expected).toStrictEqual([]);
  });

  it("returns the beacon table list row array", async () => {
    const listBeaconsUseCase = new ListBeaconsTable({
      getAllBeacons: jest.fn().mockImplementation(() => beaconsGatewayFixture),
    });

    const expected = await listBeaconsUseCase.execute();
    expect(expected).toStrictEqual([
      {
        date: "1 Feb 20",
        hexId: "Hex me",
        id: "97b306aa-cbd0-4f09-aa24-2d876b983efb",
        owner: "Vice-Admiral Horatio Nelson, 1st Viscount Nelson",
        status: "New",
        uses: "Sailing",
      },
      {
        date: "1 Feb 20",
        hexId: "Hex me",
        id: "97b306aa-cbd0-4f09-aa24-2d876b983efb",
        owner: "Vice-Admiral Horatio Nelson, 1st Viscount Nelson",
        status: "New",
        uses: "Sailing",
      },
      {
        date: "1 Feb 20",
        hexId: "Hex me",
        id: "97b306aa-cbd0-4f09-aa24-2d876b983efb",
        owner: "Vice-Admiral Horatio Nelson, 1st Viscount Nelson",
        status: "New",
        uses: "Sailing",
      },
    ]);
  });
});
