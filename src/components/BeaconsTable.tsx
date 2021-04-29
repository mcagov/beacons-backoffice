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
import MaterialTable, { Icons, MTableBodyRow } from "material-table";
import React, {
  forwardRef,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { IBeacon } from "../entities/IBeacon";
import { IUseCase } from "../useCases/GetBeaconsInTableFormat";

interface IBeaconsTableProps {
  getBeaconsInTableFormat: IUseCase;
}

interface IBeaconsTableState {
  isLoading: Boolean;
  error: Boolean;
  beacons: IBeacon[];
}

export const BeaconsTable: FunctionComponent<IBeaconsTableProps> = ({
  getBeaconsInTableFormat,
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
    beacons: [],
  });

  useEffect((): void => {
    const fetchBeacons = async () => {
      setState({ ...state, isLoading: true });
      try {
        const beacons = await getBeaconsInTableFormat.execute();
        setState({
          ...state,
          isLoading: false,
          error: false,
          beacons,
        });
      } catch (error) {
        setState({
          ...state,
          isLoading: false,
          error: error?.message,
        });
      }
    };

    fetchBeacons(); // TODO: What events should cause new beacons to be fetched?  Currently once on first render
  }, []); // eslint-disable-line

  return (
    <MaterialTable
      icons={tableIcons}
      columns={[
        {
          title: "Date",
          field: "date",
          filtering: false,
          sorting: true,
          defaultSort: "desc",
        },
        {
          title: "Status",
          field: "status",
          sorting: true,
          defaultFilter: "New",
        },
        {
          title: "Hex ID",
          field: "hexId",
          filtering: false,
          sorting: true,
          render: (rowData) => (
            <Link href={"/beacons/" + rowData.id}>{rowData.hexId}</Link>
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
      data={state.beacons}
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
