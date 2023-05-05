import React, { useState } from "react";
import AdminOrgs from "./AdminOrgs";
import orgsData from "./orgsData";
import "./CreateOrganization.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes} from "@fortawesome/free-solid-svg-icons";
import Link from "@mui/material/Link";

const CreateOrganization = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newOrg = {
      id:
        props.orgsData && props.orgsData.length ? props.orgsData.length + 1 : 1, // Generate a unique ID for the new organization
      name,
      address,
      description,
      website,
      adminOrg: true,
      userOrg: false,
    };
    // Add the new organization to the orgsData list
    props.onAddOrganization(newOrg);
    // Reset the form inputs
    setName("");
    setAddress("");
    setDescription("");
    setWebsite("");
  };

  return (
    <div className="create-org">
      {/* <header>
        <h1>Organization Info</h1>
      </header>
      <div className="container">
        <h2>Organization Details</h2> */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter organization name"
          />

          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            required
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Enter organization address"
          ></textarea>

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter a brief description"
          ></textarea>

          <label htmlFor="website">Website:</label>
          <input
            type="text"
            id="website"
            name="website"
            required
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            placeholder="Enter organization website URL"
          />
          {/* <button type="submit" className="create-org-btn">Submit</button> */}
        </form>
      {/* </div> */}
    </div>
  );
};

export default CreateOrganization;
