import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Conferences from './Conferences'; 
import ManageConferences from './ManageConferences'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
    const [error, setError] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);
    const [verificationCode, setVerificationCode] = useState('');
    const { currentUser, logout } = useAuth();
    const [conferences, setConferences] = useState([]);
    const navigate = useNavigate();

    async function handleLogout() {
        setError('');

        try {
            await logout();
            navigate('/login');
        } catch {
            setError('Failed to log out');
        }
    }

    function handleRoleSelection(role) {
        if (role === 'organizer' && verificationCode === '1234') {
            setError('');
            setSelectedRole(role);
        } else if (role !== 'organizer') {
            setError('');
            setSelectedRole(role);
        } else {
            setError('Invalid verification code for the organizer role.');
        }
    }

    function handleVerificationCodeChange(event) {
        setVerificationCode(event.target.value);
    }

    function handleManageConferencesChange(updatedConferences) {
        setConferences(updatedConferences);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mt-2'>Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <strong>Email: </strong> {currentUser.email}
                </Card.Body>
            </Card>

            <div className='d-flex justify-content-center align-items-center'>
                <input
                    type='text'
                    placeholder='Enter 4-digit code for organizer role'
                    value={verificationCode}
                    onChange={handleVerificationCodeChange}
                    className='form-control mr-2'
                    style={{ maxWidth: '250px' }}
                />
            </div>

            <div className='w-100 text-center mt-2'>
                <Button
                    variant={selectedRole === 'organizer' ? 'primary' : 'outline-primary'}
                    onClick={() => handleRoleSelection('organizer')}
                    className='mr-2'
                >
                    Organizer
                </Button>

                <Button
                    variant={selectedRole === 'author' ? 'success' : 'outline-success'}
                    onClick={() => handleRoleSelection('author')}
                    className='mr-2'
                >
                    Author
                </Button>

                <Button
                    variant={selectedRole === 'reviewer' ? 'warning' : 'outline-warning'}
                    onClick={() => handleRoleSelection('reviewer')}
                >
                    Reviewer jj
                </Button>
            </div>

            <div className='w-100 text-center mt-2'>
                <Button variant='link' onClick={handleLogout}>
                    Log Out
                </Button>
            </div>

            {selectedRole === 'organizer' && (
                <>
                    <Conferences />
                    <ManageConferences conferences={conferences} onChange={handleManageConferencesChange} />
                </>
            )}
        </>
    );
}

export default Dashboard;
