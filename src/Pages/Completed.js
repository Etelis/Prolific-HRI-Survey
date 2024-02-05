import React from 'react';
import { Button } from 'react-bootstrap'; // Assuming you're using React-Bootstrap
import { MdCheckCircle } from 'react-icons/md'; // Using react-icons for completion icon

function CompletionPage() {
  return (
    <div className="container mt-5 text-center">
      <MdCheckCircle size="5em" color="#4CAF50" className="mb-4" /> {/* Completion icon */}
      <h1 className="mb-3">Thank You for Your Participation!</h1>
      <p>Your responses have been successfully submitted. We appreciate your time and effort in this study.</p>
      
      <p>You can now close this window or return to <a href="https://www.prolific.com" target="_blank" rel="noopener noreferrer" className="text-primary font-weight-bold">Prolific</a> to find more studies.</p>

    </div>
  );
}

export default CompletionPage;
