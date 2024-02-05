import React, { useState, useEffect } from 'react';

function FeedbackPage({ onSubmitFeedback, userId }) {
  const [generalOpinion, setGeneralOpinion] = useState('');
  const [bugsEncountered, setBugsEncountered] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const [startTime, setStartTime] = useState(Date.now());
  const [error, setError] = useState('');

  useEffect(() => {
    // Record the start time when the component mounts
    setStartTime(Date.now());
  }, []);

  // Utility function to convert seconds into hh:mm:ss format
  const formatTime = (seconds) => {
    const pad = (num) => num.toString().padStart(2, '0');
    const hours = pad(Math.floor(seconds / 3600));
    const minutes = pad(Math.floor((seconds % 3600) / 60));
    const secondsLeft = pad(seconds % 60);
    return `${hours}:${minutes}:${secondsLeft}`;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submit action

    if (!generalOpinion.trim()) {
      setError('General Opinion field is required.');
      return;
    }

    const endTime = Date.now();
    const feedbackTimeInSeconds = (endTime - startTime) / 1000; // Calculate feedback time in seconds
    const feedbackTime = formatTime(feedbackTimeInSeconds); // Convert feedback time to hh:mm:ss format

    const feedbackData = {
      'Q_general_opinion': generalOpinion,
      'Q_bugs': bugsEncountered.trim(), // Include if filled
      'Q_suggestions': suggestions.trim(), // Include if filled
      'Q_additional_comments': additionalComments.trim(), // Include if filled
      'user_id': userId,
      'feedback_time': feedbackTime // Feedback time in hh:mm:ss format
    };

    try {
      const response = await fetch('https://europe-central2-co-op-world-game.cloudfunctions.net/prolific_study_finished', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData)
      });
      const data = await response.json();

      if (data.redirect) {
        onSubmitFeedback(data.redirect.includes('prolific.com') ? data.redirect : data.redirect === 'completed' ? 'completed' : 'error');
      } else {
        setError('There was an error submitting your feedback.');
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError('An error occurred while submitting your feedback. Please try again.');
    }

    // Optionally reset the form fields after submission
    setGeneralOpinion('');
    setBugsEncountered('');
    setSuggestions('');
    setAdditionalComments('');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Thank You for Participating!</h1>
      <p className="mb-3">Please take a moment to share your thoughts about the game.</p>
      <form onSubmit={handleFormSubmit} id="feedbackForm">
        <div className="mb-3">
          <label htmlFor="generalOpinion" className="form-label fw-bold">General Opinion of the Game:</label>
          <textarea className="form-control" id="generalOpinion" name="generalOpinion" rows="4" value={generalOpinion} onChange={(e) => setGeneralOpinion(e.target.value)} required></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="bugsEncountered" className="form-label fw-bold">Any Bugs Encountered:</label>
          <small className="form-text text-muted d-block mb-2">If you encountered a bug, please specify it as detailed as you can. It will help us a lot.</small>
          <textarea className="form-control" id="bugsEncountered" name="bugsEncountered" rows="4" value={bugsEncountered} onChange={(e) => setBugsEncountered(e.target.value)} required></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="suggestions" className="form-label fw-bold">Suggestions for Improvement:</label>
          <textarea className="form-control" id="suggestions" name="suggestions" rows="4" value={suggestions} onChange={(e) => setSuggestions(e.target.value)} required></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="additionalComments" className="form-label fw-bold">Other Comments (Optional):</label>
          <textarea className="form-control" id="additionalComments" name="additionalComments" rows="4" value={additionalComments} onChange={(e) => setAdditionalComments(e.target.value)}></textarea>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
export default FeedbackPage;
