import React, { useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import CreateOrganization from "./CreateOrganization";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import orgsData from "./orgsData";
import Box from '@mui/material/Box';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function AdminOrgs() {
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(false);
  const userOrgs = orgsData.filter((org) => org.adminOrg);
  const visibleOrgs = showAll ? userOrgs : userOrgs.slice(0, 7);

  const handleAddOrganization = (newOrg) => {
    orgsData.push(newOrg);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <React.Fragment>
      <Title>Your Organizations</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">
              <Box
                onClick={handleClickOpen}
                sx={{
                  cursor: "pointer",
                  color: "#0275d8",
                  "&:hover": {
                    color: "#d59431",
                  },
                }}
              >
                Create Organization &nbsp;
                <FontAwesomeIcon icon={faPlus} />
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleOrgs.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell align="right">
                <Link href={row.website} target="_blank" rel="noopener">
                  Visit Page
                  <FontAwesomeIcon icon={faUpRightFromSquare} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {userOrgs.length > 7 && (
        <Link color="primary" href="#" onClick={toggleShowAll} sx={{ mt: 3 }}>
          {showAll ? "Show less" : "See more"}
        </Link>
      )}
      <Dialog open={open} onClose={handleClose} style={{height: "auto", padding: "20px", paddingBottom: "50px"}}>
        <DialogTitle style={{fontSize: "30px", textAlign: "center"}}>Create Organization</DialogTitle>
        <DialogContent>
          <CreateOrganization
            onAddOrganization={handleAddOrganization}
          />
        </DialogContent>
        <DialogActions style={{marginBottom: "20px", marginRight: "20px"}}>
          <Button onClick={handleClose} style={{color: "#d59431"}}>Cancel</Button>
          <Button variant="contained" onClick={handleClose} style={{backgroundColor: '#d59431'}}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

// import React, { useState } from "react";
// import Link from "@mui/material/Link";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Title from "./Title";
// import CreateOrganization from "./CreateOrganization";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUpRightFromSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
// import orgsData from "./orgsData";
// import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

// export default function AdminOrgs() {
//   const [showAll, setShowAll] = useState(false);
//   const userOrgs = orgsData.filter((org) => org.adminOrg);
//   const visibleOrgs = showAll ? userOrgs : userOrgs.slice(0, 7);

//   const handleAddOrganization = (newOrg) => {
//     orgsData.push(newOrg);
//   };

//   const toggleShowAll = () => {
//     setShowAll(!showAll);
//   };

//   return (
//     <React.Fragment>
//       <Title>Your Organizations</Title>
//       {/* <CreateOrganization onAddOrganization={handleAddOrganization} orgsData={orgsData} /> */}
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Date Created</TableCell>
//             <TableCell>Address</TableCell>
//             <TableCell align="right" >
//               <Link href="/create-organization" target="_blank" rel="noopener">Create Organization &nbsp;
//                 <FontAwesomeIcon icon={faPlus} />
//               </Link>
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {visibleOrgs.map((row) => (
//             <TableRow key={row.id}>
//               <TableCell>{row.name}</TableCell>
//               <TableCell>{row.date}</TableCell>
//               <TableCell>{row.address}</TableCell>
//               <TableCell align="right">
//                 <Link href={row.website} target="_blank" rel="noopener"> Visit Page &nbsp;
//                   <FontAwesomeIcon icon={faUpRightFromSquare} />
//                 </Link>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       {userOrgs.length > 7 && (
//         <Link
//           color="primary"
//           href="#"
//           onClick={toggleShowAll}
//           sx={{ mt: 3 }}
//         >
//           {showAll ? "Show less" : "See more"}
//         </Link>
//       )}
//     </React.Fragment>
//   );
// }
