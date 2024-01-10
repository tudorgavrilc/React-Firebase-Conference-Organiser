import React from 'react'

function Conferences() {
    const conferences = ['Conference 1', 'Conference 2', 'Conference 3'];

    return (
      <div>
        <h2>List of Conferences</h2>
        <ul>
          {conferences.map((conference, index) => (
            <li key={index}>{conference}</li>
          ))}
        </ul>
      </div>
    );
  };

export default Conferences