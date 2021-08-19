import { Link, Paper } from "@material-ui/core";
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
import React, {
  forwardRef,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { IBeaconSearchResultData } from "../entities/IBeaconSearchResult";

interface BeaconTableListRow {
  hexId: string;
  owner: string;
  uses: string;
  id: string;
  date: string;
  status: string;
}

interface IBeaconsTableProps {
  beaconsGateway: IBeaconsGateway;
}

interface IBeaconsTableState {
  isLoading: Boolean;
  error: Boolean;
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

  const [state, setState] = useState<IBeaconsTableState>({
    isLoading: true,
    error: false,
  });

  useEffect((): void => {
    const fetchBeacons = async () => {
      try {
      } catch (error) {
        console.error("Could not fetch beacons", error);
        setState((currentState) => ({
          ...currentState,
          isLoading: false,
          error: error?.message,
        }));
      }
    };

    fetchBeacons();
  }, [beaconsGateway]);

  return (
    <MaterialTable
      icons={tableIcons}
      columns={[
        {
          title: "Last modified date",
          field: "date",
          filtering: false,
          type: "datetime",
          dateSetting: { format: "dd MM yyyy", locale: "en-GB" },
        },
        {
          title: "Status",
          field: "status",
          sorting: true,
        },
        {
          title: "Hex ID",
          field: "hexId",
          filtering: false,
          sorting: true,
          render: (rowData) => (
            <Link href={"/#/beacons/" + rowData.hexId}>{rowData.hexId}</Link>
          ),
        },
        {
          title: "Owner details",
          field: "owner",
          filtering: false,
          sorting: true,
        },
        {
          title: "Beacon use",
          field: "uses",
          sorting: true,
        },
      ]}
      data={(query) =>
        new Promise(async (resolve, reject) => {
          const term = query.search;
          let statusFilterValue = "";
          let useFilterValue = "";
          query.filters.forEach((filter) => {
            if (filter.column.field === "status")
              statusFilterValue = filter.value;
            if (filter.column.field === "uses") useFilterValue = filter.value;
          });
          try {
            const response = await beaconsGateway.getAllBeacons(
              term,
              statusFilterValue,
              useFilterValue
            );
            const beacons = response._embedded["beacon-search"].map(
              (item: IBeaconSearchResultData) => ({
                date: item.lastModifiedDate,
                status: item.beaconStatus,
                hexId: item.hexId,
                owner: item.ownerName,
                uses: item.useActivities,
                id: "item.id",
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
