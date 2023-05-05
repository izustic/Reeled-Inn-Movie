import React, { useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import orgsData from "./orgsData";

// function preventDefault(event) {
//   event.preventDefault();
// }

export default function UserOrgs() {
  const [showAll, setShowAll] = useState(false);
  const userOrgs = orgsData.filter((org) => org.userOrg);
  const visibleOrgs = showAll ? userOrgs : userOrgs.slice(0, 7);

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
            <TableCell align="right">Visit Organization</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleOrgs.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell align="right"> 
                <Link href={row.website} target="_blank" rel="noopener"> Visit Page &nbsp;
                  <FontAwesomeIcon icon={faUpRightFromSquare} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {userOrgs.length > 7 && (
        <Link
          color="primary"
          href="#"
          onClick={toggleShowAll}
          sx={{ mt: 3 }}
        >
          {showAll ? "Show less" : "See more"}
        </Link>
      )}
    </React.Fragment>
  );
}
