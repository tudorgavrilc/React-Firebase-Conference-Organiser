

import React, { useState } from 'react';
import { Card, Button, ListGroup, Form } from 'react-bootstrap';

function ReviewerPanel({ conferences, onSubmitReview }) {
    const [selectedConference, setSelectedConference] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [feedback, setFeedback] = useState('');

    const handleConferenceSelection = (conference) => {
        setSelectedConference(conference);
        setSelectedArticle(null);
        setFeedback('');
    };

    const handleArticleSelection = (article) => {
        setSelectedArticle(article);
        setFeedback('');
    };

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };

    const handleFeedbackSubmit = () => {
        if (selectedConference && selectedArticle && feedback.trim() !== '') {
            // Apelați funcția de gestionare a feedback-ului din Dashboard.js
            onSubmitReview(feedback);

            // Resetați starea pentru a permite adăugarea altor feedback-uri
            setSelectedArticle(null);
            setFeedback('');
        }
    };

    return (
        <Card>
            <Card.Body>
                <h2 className='text-center mt-2'>Reviewer Panel</h2>

                {/* Afișează lista de conferințe */}
                <h3>Conferințe disponibile:</h3>
                <ListGroup>
                    {conferences.map(conference => (
                        <ListGroup.Item
                            key={conference.id}
                            action
                            onClick={() => handleConferenceSelection(conference)}
                        >
                            {conference.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                {/* Afișează articolele pentru conferința selectată */}
                {selectedConference && (
                    <>
                        <h3>Articole pentru conferința: {selectedConference.name}</h3>
                        <ListGroup>
                            {selectedConference.articles.map(article => (
                                <ListGroup.Item
                                    key={article.id}
                                    action
                                    onClick={() => handleArticleSelection(article)}
                                >
                                    {article.title}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </>
                )}

                {/* Afișează formularul de feedback pentru articolul selectat */}
                {selectedArticle && (
                    <Form className="mt-3">
                        <Form.Group controlId="feedbackForm">
                            <Form.Label>Feedback pentru articolul "{selectedArticle.title}":</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={feedback}
                                onChange={handleFeedbackChange}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleFeedbackSubmit}>
                            Trimite Feedback
                        </Button>
                    </Form>
                )}
            </Card.Body>
        </Card>
    );
}

export default ReviewerPanel;
