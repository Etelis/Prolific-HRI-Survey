import React from 'react';
import { Button } from 'react-bootstrap'; // Assuming you're using React-Bootstrap
import { MdErrorOutline } from 'react-icons/md'; // Using react-icons for error icon

function WhoopsPage() {
  return (
    <div className="container mt-5 text-center">
      <MdErrorOutline size="5em" color="#FF7043" className="mb-4" /> {/* Error icon */}
      <h1 className="mb-3">Whoops! Something Went Wrong</h1>
      <p>It looks like an unexpected issue occurred. We apologize for the inconvenience.</p>
      
      <p>Please return to <a href="https://www.prolific.com" target="_blank" rel="noopener noreferrer" className="text-primary font-weight-bold">Prolific</a> and follow the instructions to resolve the issue, or contact the study administrator for further assistance.</p>

      <div className="mt-4">
        <Button href="https://www.prolific.com" variant="primary" size="lg" target="_blank" rel="noopener noreferrer" className="shadow-sm">Return to Prolific</Button>
      </div>
    </div>
  );
}

export default WhoopsPage;
