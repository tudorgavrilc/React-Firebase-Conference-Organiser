
import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

function AuthorPanel({ conferences, onAddArticle }) {
    const [selectedConference, setSelectedConference] = useState('');
    const [articleType, setArticleType] = useState('');
    const [articleContent, setArticleContent] = useState('');

    const handleAddArticle = () => {
        onAddArticle({
            conference: selectedConference,
            type: articleType,
            content: articleContent,
        });
        setSelectedConference('');
        setArticleType('');
        setArticleContent('');
    };

    return (
        <Card>
            <Card.Body>
                <h2 className='text-center mt-2'>Author Panel</h2>
                <Form>
                    <Form.Group controlId="conferenceSelect">
                        <Form.Label>Select Conference</Form.Label>
                        <Form.Control as="select" onChange={(e) => setSelectedConference(e.target.value)} value={selectedConference}>
                            <option value="" disabled>Select a conference</option>
                            {conferences.map(conference => (
                                <option key={conference.id} value={conference.id}>{conference.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="articleTypeSelect">
                        <Form.Label>Article Type</Form.Label>
                        <Form.Control type="text" placeholder="Enter article type" onChange={(e) => setArticleType(e.target.value)} value={articleType} />
                    </Form.Group>
                    <Form.Group controlId="articleContentInput">
                        <Form.Label>Article Content (PDF link or file)</Form.Label>
                        <Form.Control type="text" placeholder="Enter article content" onChange={(e) => setArticleContent(e.target.value)} value={articleContent} />
                    </Form.Group>
                    <Button variant="primary" onClick={handleAddArticle}>
                        Add Article
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default AuthorPanel;
