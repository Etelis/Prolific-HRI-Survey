import React, { useState, useEffect } from 'react';
import './App.css';
import GameIntroPage from './Pages/GameIntroPage';
import FeedbackPage from './Pages/FeedbackPage';
import WhoopsPage from './Pages/WhoopsPage';
import Completed from './Pages/Completed';

function App() {
  const [currentStep, setCurrentStep] = useState(null);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const PROLIFIC_PID = queryParams.get('PROLIFIC_PID');
    const STUDY_ID = queryParams.get('STUDY_ID');
    const SESSION_ID = queryParams.get('SESSION_ID');

    // Check if any of the Prolific information is null or empty
    if (!PROLIFIC_PID || !STUDY_ID || !SESSION_ID) {
      console.error('Missing Prolific information');
      setCurrentStep('Whoops');
      setIsLoading(false); // Immediately set loading to false since we're not loading any data
    } else {
      checkUserStatus(PROLIFIC_PID, STUDY_ID, SESSION_ID);
    }
  }, []);

  const checkUserStatus = async (PROLIFIC_PID, STUDY_ID, SESSION_ID) => {
    try {
      const response = await fetch('https://europe-central2-co-op-world-game.cloudfunctions.net/prolific_welcome_page_started', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ PROLIFIC_PID, STUDY_ID, SESSION_ID })
      });
      const data = await response.json();
      setUserId(data.userId);
      
      if (data.redirect) {
        handleRedirect(data.redirect, data.userId);

      } else {
        setCurrentStep('GameIntro');
      }
    } catch (error) {
      console.error('Error fetching user status:', error);
      setCurrentStep('Whoops');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = (status, userId) => {
    switch (status) {
      case 'feedback':
        setCurrentStep('Feedback');
        break;
      case 'completed':
        setCurrentStep('Completed');
        break;
      case 'error':
        setCurrentStep('Whoops');
        break;
      default:
        if (isValidHttpUrl(status)) {
          window.location.href = status;
        } else {
          setCurrentStep('Whoops');
        }
        break;
    }
  };

  function isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'GameIntro':
        return <GameIntroPage onGameComplete={handleRedirect} userId={userId} />;
      case 'Feedback':
        return <FeedbackPage onSubmitFeedback={handleRedirect} userId={userId} />;
      case 'Whoops':
        return <WhoopsPage />;
      case 'Completed':
          return <Completed />;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Game Feedback</span>
        </div>
      </nav>
      {isLoading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading...</p>
        </div>
      ) : (
        renderStep()
      )}
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container text-center">
          <span className="text-muted">Thank you for your participation.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
