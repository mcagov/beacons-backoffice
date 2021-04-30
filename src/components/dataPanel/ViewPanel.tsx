import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { Style } from "../../useCases/mcaWritingStyleFormatter";
import { FieldValue } from "./FieldValue";

interface ViewPanelProps {
  fields: Record<string, any>[];
  columns?: 1 | 2;
  splitAfter?: number;
}

export const ViewPanel: FunctionComponent<ViewPanelProps> = ({
  fields,
  columns = 1,
  splitAfter = Math.ceil(fields.length / 2),
}) => {
  switch (columns) {
    case 1:
      return <OneColumn fields={fields} />;
    case 2:
      return <TwoColumns fields={fields} splitAfter={splitAfter} />;
    default:
      throw Error("Unsupported number of columns, max 2");
  }
};

const OneColumn: FunctionComponent<ViewPanelProps> = ({ fields }) => (
  <TableContainer>
    <Table size="small">
      <TableBody>
        {fields.map((field, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              <Typography>{field.key + Style.KeyValueSeparator}</Typography>
            </TableCell>
            <TableCell>
              <FieldValue>{field.value}</FieldValue>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const TwoColumns: FunctionComponent<ViewPanelProps> = ({
  fields,
  splitAfter,
}) => {
  const columnOneFields = fields.slice(0, splitAfter);
  const columnTwoFields = fields.slice(splitAfter);

  return (
    <Grid container>
      <Grid item xs={6}>
        <OneColumn fields={columnOneFields} />
      </Grid>
      <Grid item xs={6}>
        <OneColumn fields={columnTwoFields} />
      </Grid>
    </Grid>
  );
};

// return (
//   <Grid container>
//     <Grid item xs={6}>
//       <TableContainer>
//         <Table size="small">
//           <TableBody>
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 <Typography>Manufacturer:</Typography>
//               </TableCell>
//               <TableCell>
//                 <FieldValue>{fields?.manufacturer}</FieldValue>
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 <Typography>Model:</Typography>
//               </TableCell>
//               <TableCell>
//                 <FieldValue>{fields?.model}</FieldValue>
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 <Typography>Beacon type:</Typography>
//               </TableCell>
//               <TableCell>
//                 <FieldValue>{fields?.type}</FieldValue>
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 <Typography>Protocol code:</Typography>
//               </TableCell>
//               <TableCell>
//                 <FieldValue>{fields?.protocolCode}</FieldValue>
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 <Typography>Serial number:</Typography>
//               </TableCell>
//               <TableCell>
//                 <FieldValue>{fields?.manufacturerSerialNumber}</FieldValue>
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 <Typography>CHK code:</Typography>
//               </TableCell>
//               <TableCell>
//                 <FieldValue>{fields?.chkCode}</FieldValue>
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 <Typography>Battery expiry date:</Typography>
//               </TableCell>
//               <TableCell>
//                 <FieldValue>
//                   {formatDate(fields?.batteryExpiryDate)}
//                 </FieldValue>
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 <Typography>Last service date:</Typography>
//               </TableCell>
//               <TableCell>
//                 <FieldValue>
//                   {formatDate(fields?.lastServicedDate)}
//                 </FieldValue>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Grid>
//     <Grid item xs={6}>
//       <TableContainer>
//         <Table size="small">
//           <TableBody>
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 <Typography>Owner(s):</Typography>
//               </TableCell>
//               <TableCell>
//                 <FieldValue>{formatOwners(fields?.owners)}</FieldValue>
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 <Typography>Emergency contacts:</Typography>
//               </TableCell>
//               <TableCell>
//                 <FieldValue>{`${fields?.emergencyContacts.length} listed`}</FieldValue>
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 <Typography>Registered uses:</Typography>
//               </TableCell>
//               <TableCell>
//                 <FieldValue>{formatUses(fields?.uses)}</FieldValue>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Grid>
//   </Grid>
//);
