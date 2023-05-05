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

export default function AllOrgs() {
  const [showAll, setShowAll] = useState(false);
  const [numDisplayed, setNumDisplayed] = useState(7);

  const allOrgs = orgsData.filter((org) => !org.userOrg);

  const handleSeeMoreClick = () => {
    if (showAll) {
      setNumDisplayed(7);
      setShowAll(false);
    } else {
      setNumDisplayed(allOrgs.length);
      setShowAll(true);
    }
  };

  const orgRows = allOrgs
    .slice(0, numDisplayed)
    .map((row) => (
      <TableRow key={row.id}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.address}</TableCell>
        <TableCell align="right">
          <Link href={row.website} target="_blank" rel="noopener" color="primary">
            Join Org &nbsp;
            <FontAwesomeIcon icon={faUpRightFromSquare} />
          </Link>
        </TableCell>
      </TableRow>
    ));

  return (
    <React.Fragment>
      <Title>All Organizations</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Join Organization</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{orgRows}</TableBody>
      </Table>
      {allOrgs.length > 7 && (
        <Link color="primary" href="#" onClick={handleSeeMoreClick} sx={{ mt: 3 }}>
          {showAll ? "See less" : "See more"}
        </Link>
      )}
    </React.Fragment>
  );
}
