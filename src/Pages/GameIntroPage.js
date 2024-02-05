import React, { useState, useEffect } from 'react';

function GameIntroPage({ userId, onGameComplete }) {
  const [completionCode, setCompletionCode] = useState('');
  const [error, setError] = useState('');
  const [startTime, setStartTime] = useState(Date.now());

  const handleCompletionCodeChange = (event) => {
    setCompletionCode(event.target.value);
  };

  const formatTime = (seconds) => {
    const pad = (num) => num.toString().padStart(2, '0');
    const hours = pad(Math.floor(seconds / 3600));
    const minutes = pad(Math.floor((seconds % 3600) / 60));
    const secondsLeft = pad(Math.floor(seconds % 60));
    return `${hours}:${minutes}:${secondsLeft}`;
  };

  useEffect(() => {
    // Record the start time when the component mounts
    setStartTime(Date.now());
  }, []);

  const handleGameCompletion = async () => {
    if (!completionCode.trim()) {
      setError('Please enter your completion code.');
      return;
    }

    const endTime = Date.now();
    const durationInSeconds = (endTime - startTime) / 1000; // Calculate duration in seconds
    const formattedDuration = formatTime(durationInSeconds); // Format duration to hh:mm:ss

    try {
      const response = await fetch('https://europe-central2-co-op-world-game.cloudfunctions.net/prolific_first_page_finished', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completion_code: completionCode,
          user_id: userId,
          duration: formattedDuration // Send the duration along with the request
        })
      });
      const data = await response.json();

      if (data.redirect) {
        // Handle different redirect scenarios based on the server response
        switch (data.redirect) {
          case 'feedback':
            onGameComplete('feedback', data.userId);
            break;
          case 'completed':
            onGameComplete('completed', data.userId);
            break;
          case 'error':
            onGameComplete('error', data.userId);
            break;
          default:
            // Handle any other redirects not explicitly covered
            window.location.href = data.redirect;
            break;
        }
      } else if (data.status === 'try again') {
        // Show an error message if the user needs to try again
        setError(`Invalid completion code. Please try again. Attempts left: ${5 - data.tries}`);
      } else {
        throw new Error('Unexpected response from the server.');
      }
    } catch (error) {
      setError('An error occurred while verifying the completion code. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Welcome!</h1>
      <p>We are happy to have you here. Here's what this task includes:</p>
      <ul>
        <li>Playing a game on an external website. This will take about 30 minutes.</li>
        <li>After playing the game, answering a few short feedback questions.</li>
      </ul>

      <h3>Let's start with the game part</h3>
      <p>As the game takes place on an external website, we will use simple start and completion codes to recognize you in our system.</p>

      <div>
        <strong>Your Start Code: </strong>
        <span>{userId}</span>
      </div>

      <p>Please keep this page open while you play the game.</p>
      <a href="https://co-op-world-game.ew.r.appspot.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-3">Start Playing</a>

      <p className="mt-3">Upon completing the game, please enter the completion code you receive below:</p>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Your completion code here" value={completionCode} onChange={handleCompletionCodeChange} />
        <button className="btn btn-success" onClick={handleGameCompletion}>Submit</button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <p><u>Please Note:</u></p>
      <ul>
        <li>The completion code will be provided after you finish playing the game.</li>
        <li>You do not need to insert your PROLIFIC PID at any point.</li>
        <li>Do not use your start code as a completion code. They are different.</li>
      </ul>
    </div>
  );
}

export default GameIntroPage;
