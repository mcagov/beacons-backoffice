import { Chip, Link, Paper } from "@material-ui/core";
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
import { IBeaconsGateway } from "gateways/beacons/IBeaconsGateway";
import MaterialTable, { Icons, MTableBodyRow } from "material-table";
import React, { forwardRef, FunctionComponent } from "react";
import { IBeaconSearchResultData } from "../entities/IBeaconSearchResult";

interface IBeaconsTableProps {
  beaconsGateway: IBeaconsGateway;
}

interface BeaconTableListRow {
  hexId: string;
  owner: string;
  uses: string;
  id: string;
  lastModifiedDate: string;
  status: string;
}

export const BeaconsTable: FunctionComponent<IBeaconsTableProps> = ({
  beaconsGateway,
}): JSX.Element => {
  const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  return (
    <MaterialTable
      icons={tableIcons}
      columns={[
        {
          title: "Last modified date",
          field: "lastModifiedDate",
          filtering: false,
          sorting: true,
          defaultSort: "desc",
          type: "datetime",
          dateSetting: { format: "dd MM yyyy", locale: "en-GB" },
        },
        {
          title: "Status",
          field: "status",
          render: (rowData: BeaconTableListRow) => {
            if (rowData.status === "MIGRATED") {
              return <Chip label={rowData.status} color="primary" />;
            } else {
              return <Chip label={rowData.status} color="secondary" />;
            }
          },
        },
        {
          title: "Hex ID",
          field: "hexId",
          filtering: false,
          render: (rowData: BeaconTableListRow) => {
            if (rowData.status === "MIGRATED") {
              return (
                <Link href={"/#/beacons-legacy/" + rowData.id}>
                  {rowData.hexId}
                </Link>
              );
            } else {
              return (
                <Link href={"/#/beacons/" + rowData.id}>{rowData.hexId}</Link>
              );
            }
          },
        },
        {
          title: "Owner details",
          field: "owner",
          filtering: false,
          render: (rowData: BeaconTableListRow) => {
            return rowData.owner.toUpperCase();
          },
        },
        {
          title: "Beacon use",
          field: "uses",
          render: (rowData: BeaconTableListRow) => {
            return rowData.uses.toUpperCase();
          },
        },
      ]}
      data={(query) =>
        new Promise(async (resolve, reject) => {
          const term = query.search;
          let statusFilterValue = "";
          let useFilterValue = "";
          let sortValue = "";
          query.filters.forEach((filter) => {
            if (filter.column.field === "status")
              statusFilterValue = filter.value;
            if (filter.column.field === "uses") useFilterValue = filter.value;
          });
          if (query.orderBy) {
            const sortField = query.orderBy.field;
            const sortDirection = query.orderDirection;
            if (sortField && sortDirection) {
              sortValue = `${sortField},${sortDirection}`;
            }
          }
          try {
            const response = await beaconsGateway.getAllBeacons(
              term,
              statusFilterValue,
              useFilterValue,
              query.page,
              query.pageSize,
              sortValue
            );
            const beacons = response._embedded["beacon-search"].map(
              (item: IBeaconSearchResultData) => ({
                lastModifiedDate: item.lastModifiedDate,
                status: item.beaconStatus,
                hexId: item.hexId,
                owner: item.ownerName,
                uses: item.useActivities,
                id: item._links.self.href.substring(
                  item._links.self.href.lastIndexOf("/") + 1
                ),
              })
            );
            resolve({
              data: beacons,
              page: response.page.number,
              totalCount: response.page.totalElements,
            });
          } catch (error) {
            console.error("Could not fetch beacons", error);
          }
        })
      }
      title=""
      options={{
        filtering: true,
        search: true,
        pageSize: 20,
      }}
      components={{
        Container: (props) => <Paper {...props} elevation={0} />,
        Row: (props) => (
          <MTableBodyRow {...props} data-testid="beacons-table-row" />
        ),
      }}
    />
  );
};
