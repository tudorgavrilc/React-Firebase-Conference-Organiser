import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ManageConferences from "./ManageConferences";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthorPanel from "./AuthorPanel";
import ReviewerPanel from "./ReviewerPanel";

function Dashboard() {
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const { currentUser, logout } = useAuth();
  const [conferences, setConferences] = useState([]);
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function handleRoleSelection(role) {
    if (role === "organizer" && verificationCode === "1234") {
      setError("");
      setSelectedRole(role);
    } else if (role !== "organizer") {
      setError("");
      setSelectedRole(role);
    } else {
      setError("Invalid verification code for the organizer role.");
    }
  }

  function handleVerificationCodeChange(event) {
    setVerificationCode(event.target.value);
  }

  function handleManageConferencesChange(updatedConferences) {
    setConferences(updatedConferences);
  }

  function handleAddArticle(article) {
    const conferenceIndex = conferences.findIndex(
      (conference) => conference.id === article.conference
    );

    if (conferenceIndex !== -1) {
      const updatedConferences = [...conferences];

      const updatedConference = { ...updatedConferences[conferenceIndex] };

      if (!updatedConference.articles) {
        updatedConference.articles = [article];
      } else {
        updatedConference.articles = [...updatedConference.articles, article];
      }

      updatedConferences[conferenceIndex] = updatedConference;

      setConferences(updatedConferences);

      console.log("Article added:", article);
    } else {
      console.error("Conference not found for the added article.");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mt-2">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong> {currentUser.email}
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-center align-items-center">
        <input
          type="text"
          placeholder="Enter 4-digit code for organizer role"
          value={verificationCode}
          onChange={handleVerificationCodeChange}
          className="form-control mr-2"
          style={{ maxWidth: "250px" }}
        />
      </div>

      <div className="w-100 text-center mt-2">
        <Button
          variant={selectedRole === "organizer" ? "primary" : "outline-primary"}
          onClick={() => handleRoleSelection("organizer")}
          className="mr-2"
        >
          Organizer
        </Button>

        <Button
          variant={selectedRole === "author" ? "success" : "outline-success"}
          onClick={() => handleRoleSelection("author")}
          className="mr-2"
        >
          Author
        </Button>

        <Button
          variant={selectedRole === "reviewer" ? "warning" : "outline-warning"}
          onClick={() => handleRoleSelection("reviewer")}
        >
          Reviewer
        </Button>
      </div>

      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>

      {selectedRole === "organizer" && (
        <>
          <ManageConferences
            conferences={conferences}
            onChange={handleManageConferencesChange}
          />
        </>
      )}

      {selectedRole === "author" && (
        <AuthorPanel
          onAddArticle={handleAddArticle}
          manageConferences={conferences}
        />
      )}
    </>
  );
}

export default Dashboard;
