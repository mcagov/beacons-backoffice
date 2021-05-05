import { Card, CardContent, CardHeader } from "@material-ui/core";
import { PanelViewState } from "components/dataPanel/PanelViewState";
import React from "react";

export const OwnerSummaryPanel = () => {
  const fields = [
    { key: "Name", value: "John Smith" },
    { key: "Telephone", value: ["077133812665", "077133812667"] },
    { key: "Email", value: "matt.carr@madetech.com" },
    { key: "Address", value: ["10 Grove Road", "Bristol", "BS11 8BG"] },
  ];
  return (
    <Card>
      <CardContent>
        <CardHeader title="Owner" />
        <PanelViewState fields={fields} />
      </CardContent>
    </Card>
  );
};

// const OriginalOwnerDetails = () => (<Grid direction="row" container justify="space-between" spacing={1}>
// <Grid item xs={6}>
//   <Card>
//     <CardContent>
//       <CardHeader title="Owner 1" />
//       <TableContainer>
//         <Table>
//           <TableBody>
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 Name
//               </TableCell>
//               <TableCell>
//                 <p>Mr. Beacon Owner</p>
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell component="th" scope="row">
//                 Telephone
//               </TableCell>
//               <TableCell>
//                 <Typography>07921021367</Typography>
//                 <Typography>07921021369</Typography>
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell component="th" scope="row">
//                 Email
//               </TableCell>
//               <TableCell>
//                 <Typography>mar@ten.com</Typography>
//               </TableCell>
//             </TableRow>

//             <TableRow>
//               <TableCell component="th" scope="row">
//                 Address
//               </TableCell>
//               <TableCell>
//                 <ul
//                   style={{
//                     listStyle: "none",
//                     margin: 0,
//                     padding: 0,
//                   }}
//                 >
//                   <li>Buckingham Palace</li>
//                   <li>1 Pall Mall</li>
//                   <li>W1 7QE</li>
//                   <li>London</li>
//                 </ul>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </CardContent>
//   </Card>
// </Grid>)
