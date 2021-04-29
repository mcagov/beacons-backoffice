import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { formatDate, titleCase } from "./mcaWritingStyleFormatter";
import { IUse } from "../entities/IUse";

interface BeaconTableListRow {
  hexId: string;
  owner: string;
  uses: string;
  id: string;
  date: string;
  status: string;
}

export class ListBeaconsTable {
  gateway: IBeaconsGateway;

  constructor(gateway: IBeaconsGateway) {
    this.gateway = gateway;
  }

  async execute(): Promise<BeaconTableListRow[]> {
    const results: any = await this.gateway.getAllBeacons();

    let outputs: BeaconTableListRow[] = [];
    results.data.forEach((item: any) => {
      outputs.push({
        date: this.formatDate(item.attributes.createdDate),
        status: this.titleCase(item.attributes.status),
        hexId: item.attributes.hexId,
        owner: item.attributes.owner.fullName,
        uses: this.formatUses(item.attributes.uses),
        id: item.id,
      });
    });

    return outputs;
  }

  private formatUses(uses: IUse[]): string {
    return uses.reduce((formattedUses, use, index, uses) => {
      if (index === uses.length - 1) return formattedUses + this.formatUse(use);
      return formattedUses + this.formatUse(use) + ", ";
    }, "");
  }

  private formatUse(use: IUse): string {
    const formattedActivity = titleCase(use.activity);
    const formattedPurpose = use.purpose ? ` (${titleCase(use.purpose)})` : "";
    return formattedActivity + formattedPurpose;
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const [, month, day, year] = date.toDateString().split(" ");
    return `${parseInt(day)} ${month} ${year.slice(2)}`;
  }

  private titleCase(text: any): string {
    return text
      .replace(/_/g, " ")
      .split(" ")
      .map((word: any) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
}
