import React from "react";
import "./organizations.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function OrgPage() {
  const navigate = useNavigate();

  const handleChatRoute = ()=> {
    navigate("/user-chat");
  }
  return (
    <div className="org-body">
      <header className="org-header">
      {/* <img src={require("./management.png")} alt="Icon" width="30" style={{height: "30px", width: "30px", color: "#fff"}}/> */}
      <FontAwesomeIcon icon={faBuilding} style={{fontSize: "24px"}}/>
        <h1> &nbsp; Fix It</h1>
      </header>

      <main className="org-main">
        <h2>Welcome to our Organization</h2>
        <p>
          Welcome to our facility management company page! At&nbsp;
        <span style={{fontWeight: "bold", fontSize: "1.1em"}}>
            Decagon Facility
          </span>
          , we are dedicated to providing top-notch facilities management
          services to ensure that our users' facilities are running at optimal
          levels. From routine maintenance and repairs to emergency response and
          project management, we have you covered. We look forward to partnering
          with you to help your facility operate at its best.
        </p>
        <button onClick={handleChatRoute}>Send a Request</button>
      </main>
    </div>
  );
}

export default OrgPage;
