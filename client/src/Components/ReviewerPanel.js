// Inside ReviewerPanel.js
import React, { useState } from "react";

function ReviewerPanel({ conferences, onReviewArticle }) {
    const [selectedConference, setSelectedConference] = useState("");
    const [selectedArticle, setSelectedArticle] = useState("");
    const [reviewType, setReviewType] = useState("");

    // Compile a list of all articles from all conferences
    const allArticles = conferences.flatMap((conference) => conference.articles);

    const handleReviewArticle = () => {
        if (selectedConference && selectedArticle && reviewType) {
            // Găsește articolul selectat în toate articolele
            const selectedArticleObj = allArticles.find(article => article.id === selectedArticle);
    
            // Actualizează numărul de like-uri și dislike-uri în funcție de tipul de recenzie
            if (reviewType === "like") {
                selectedArticleObj.likes = (selectedArticleObj.likes || 0) + 1;
            } else if (reviewType === "dislike") {
                selectedArticleObj.dislikes = (selectedArticleObj.dislikes || 0) + 1;
            }
    
            // Invoke the callback function to update the state in Dashboard component
            onReviewArticle({
                conference: selectedConference,
                articleId: selectedArticle,
                reviewType: reviewType,
            });
    
            setSelectedConference("");
            setSelectedArticle("");
            setReviewType("");
        }
    };
    

    return (
        <div>
            <h2>Reviewer Panel</h2>
            <div>
                <label>Select Conference: </label>
                <select
                    onChange={(e) => setSelectedConference(e.target.value)}
                    value={selectedConference}
                >
                    <option value="" disabled>
                        Select a conference
                    </option>
                    {conferences.map((conference) => (
                        <option key={conference.id} value={conference.id}>
                            {conference.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Select Article: </label>
                <select
                    onChange={(e) => setSelectedArticle(e.target.value)}
                    value={selectedArticle}
                >
                    <option value="" disabled>
                        Select an article
                    </option>
                    {allArticles.map((article) => (
                        <option key={article.id} value={article.id}>
                            {article.type}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Review Type: </label>
                <select
                    onChange={(e) => setReviewType(e.target.value)}
                    value={reviewType}
                >
                    <option value="" disabled>
                        Select review type
                    </option>
                    <option value="like">Like</option>
                    <option value="dislike">Dislike</option>
                </select>
            </div>

            <button onClick={handleReviewArticle}>Submit Review</button>
        </div>
    );
}

export default ReviewerPanel;
