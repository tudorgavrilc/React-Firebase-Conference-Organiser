import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ManageConferences from "./ManageConferences";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthorPanel from "./AuthorPanel";
import ReviewerPanel from "./ReviewerPanel";
import { v4 as uuidv4 } from 'uuid';

function saveToLocalStorage(data) {
  localStorage.setItem("conferencesData", JSON.stringify(data));
}

function loadFromLocalStorage() {
  const savedData = localStorage.getItem("conferencesData");
  return savedData ? JSON.parse(savedData) : [];
}

function Dashboard() {
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const { currentUser, logout } = useAuth();
  const [conferences, setConferences] = useState([
    {
      id: 1,
      name: "Conference 1",
      articles: [
        {
          id: 1,
          type: "Research Paper",
          content: "Lorem Ipsum",
          reviews: [],
          likes: 0,
          dislikes: 0
        },
      ],
    },
  ]);
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
    saveToLocalStorage(updatedConferences);
  }

  useEffect(() => {
    const loadedData = loadFromLocalStorage();
    setConferences(loadedData);
  }, []);

  function handleAddArticle(article) {
    const newArticle = { ...article, id: uuidv4(), reviews: [] };

    const conferenceIndex = conferences.findIndex(
        (conference) => conference.id == newArticle.conference
    );

    if (conferenceIndex !== -1) {
        const updatedConferences = [...conferences];
        const updatedConference = { ...updatedConferences[conferenceIndex] };

        if (!updatedConference.articles) {
            updatedConference.articles = [newArticle];
        } else {
            updatedConference.articles = [...updatedConference.articles, newArticle];
        }

        updatedConferences[conferenceIndex] = updatedConference;
        setConferences(updatedConferences);
    } else {
        console.error("Conference not found for the added article.");
    }
}

  function handleReviewArticle(reviewData) {
    const { conference: selectedConferenceId, articleId, reviewType } = reviewData;


    const updatedConferences = conferences.map((conference) => {
      if (conference.id === selectedConferenceId) {

        const updatedArticles = conference.articles.map((article) => {
          if (article.id === articleId) {

            if (reviewType === "like") {
              article.likes = (article.likes || 0) + 1;
            } else if (reviewType === "dislike") {
              article.dislikes = (article.dislikes || 0) + 1;
            }
          }
          return article;
        });

        return { ...conference, articles: updatedArticles };
      }
      return conference;
    });

    setConferences(updatedConferences);
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
          manageConferences={Object.values(conferences)}
        />
      )}

      {selectedRole === "reviewer" && (
        <>
          <ReviewerPanel conferences={conferences} onReviewArticle={handleReviewArticle} />

          <div>
            <h2>Conferences for Reviewers</h2>
            {conferences.map((conference) => (
              <div key={conference.id}>
                <h3>{conference.name}</h3>
                <ul>
                  {conference.articles.map((article) => (
                    <li key={article.id}>
                      {article.type} - {article.content}{" "}
                      Likes: {article.likes || 0}, Dislikes: {article.dislikes || 0}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
