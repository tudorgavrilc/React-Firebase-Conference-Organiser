import React, { useState } from "react";

function ReviewerPanel({ conferences, onReviewArticle }) {
    const [selectedConference, setSelectedConference] = useState("");
    const [selectedArticle, setSelectedArticle] = useState("");
    const [reviewType, setReviewType] = useState("");

    const allArticles = conferences.flatMap((conference) => conference.articles);

    const handleReviewArticle = () => {
        if (selectedConference && selectedArticle && reviewType) {
            console.log("Selected conference:", selectedConference);
            console.log("Selected article:", selectedArticle);
    
            const selectedArticleObj = allArticles.find(article => article.id == selectedArticle);
    
            console.log("All articles:", allArticles);
            console.log("Selected article object:", selectedArticleObj);
    
            if (selectedArticleObj) {
                if (reviewType === "like") {
                    selectedArticleObj.likes += 1;
                } else if (reviewType === "dislike") {
                    selectedArticleObj.dislikes += 1;
                }
    
                onReviewArticle({
                    conference: selectedConference,
                    articleId: selectedArticle,
                    reviewType: reviewType,
                });
    
                setSelectedConference("");
                setSelectedArticle("");
                setReviewType("");
            } else {
                console.error("Selected article not found.");
            }
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
