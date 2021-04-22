import { Paper } from "@material-ui/core";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MaterialTable, { Icons } from "material-table";
import React, { forwardRef, FunctionComponent } from "react";

interface IBeaconsTableProps {
  beaconsGateway: IBeaconsGateway;
}

export const BeaconsTable: FunctionComponent<IBeaconsTableProps> = ({
  beaconsGateway,
}: IBeaconsTableProps): JSX.Element => {
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

  const beacons = beaconsGateway.getAllBeacons();

  return (
    <>
      <div className="govuk-grid-row ">
        <div className="govuk-grid-column-full">
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
            data={[
              {
                date: "29 Apr 21",
                status: "New",
                hexId: "1D0456789123456",
                owner: "Loerm Ipsum",
                uses: "Fishing (Pleasure)",
              },
              {
                date: "29 Apr 21",
                status: "Update",
                hexId: "1D0456789123455",
                owner: "Loerm Ipsum 2",
                uses: "Fishing (Commerical)",
              },
              {
                date: "27 Apr 21",
                status: "New",
                hexId: "1D0456789123454",
                owner: "Loerm Ipsum 3",
                uses: "Fishing (Pleasure)",
              },
            ]}
            title=""
            options={{
              filtering: true,
            }}
            components={{
              Container: (props) => <Paper {...props} elevation={0} />,
            }}
          />
        </div>
      </div>
    </>
  );
};
