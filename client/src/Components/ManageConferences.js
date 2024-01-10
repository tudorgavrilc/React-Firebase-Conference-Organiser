import React, { useState } from 'react';

const ManageConferences = ({ conferences, onChange }) => {
  const [newConference, setNewConference] = useState('');

  const handleAddConference = () => {
    if (!conferences) {
      onChange([newConference]);
    } else {
      onChange([...conferences, newConference]);
    }
    setNewConference('');
  };

  const handleDeleteConference = (conference) => {
    onChange(conferences.filter((c) => c !== conference));
  };

  return (
    <div>
      <h2>Manage Conferences</h2>
      <div>
        <input
          type="text"
          placeholder="New Conference Name"
          value={newConference}
          onChange={(e) => setNewConference(e.target.value)}
        />
        <button onClick={handleAddConference}>Add Conference</button>
      </div>
      <ul>
        {Array.isArray(conferences) &&
          conferences.map((conference, index) => (
            <li key={index}>
              {conference}{' '}
              <button onClick={() => handleDeleteConference(conference)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ManageConferences;
