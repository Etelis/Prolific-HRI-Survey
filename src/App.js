import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SurveyIntro from './Pages/SurveyIntro';
import PersonalDetails from './Pages/PersonalDetails';
import ExamplePage from './Pages/ExamplePage';
import QuestionPage from './Pages/QuestionPage';
import FinishPage from './Pages/FinishPage'; // Import FinishPage
import StartPage from './Pages/StartPage';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [surveyData, setSurveyData] = useState({});
  // const navigate = useNavigate(); // For redirection

  const handleIntroComplete = () => {
    setCurrentStep(1); // Move to PersonalDetails
  };

  const handlePersonalDetailsComplete = (details) => {
    setSurveyData({ ...surveyData, personalDetails: details });
    setCurrentStep(2); // Move to ExamplePage
  };

  const handleExamplePageComplete = (exampleData) => {
    setSurveyData({ ...surveyData, examplePage: exampleData });
    setCurrentStep(3); // Move to QuestionPage
  };

  const handleQuestionPageComplete = (questionData) => {
    setSurveyData({ ...surveyData, questionPage: questionData });
    setCurrentStep(5); // Move to FinishPage
  };

  const handleStart = () => {
    setCurrentStep(4); // Move to SurveyIntro
  };

  const handleFinishPageComplete = (finishData) => {
    const completedSurveyData = { ...surveyData, finishPage: finishData };

    // Send data to the server
    fetch("https://24d6houomeioliarmgrwonbi7m0nmblf.lambda-url.eu-central-1.on.aws/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(completedSurveyData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.redirect_link) {
        // navigate(data.redirect_link); // Redirect to the link provided by the server
      }
    })
    .catch(error => console.error('Error:', error));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SurveyIntro onAgree={handleIntroComplete} />;
      case 1:
        return <PersonalDetails onComplete={handlePersonalDetailsComplete} />;
      case 2:
        return <ExamplePage onComplete={handleExamplePageComplete} />;
      case 3:
        return <StartPage onAgree={handleStart} />;
      case 4:
        return <QuestionPage jsonFileName="questions.json" onComplete={handleQuestionPageComplete} />;
      case 5:
        return <FinishPage onComplete={handleFinishPageComplete} />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">HRI Survey</span>
        </div>
      </nav>

      {/* Main Content */}
      {renderStep()}

      {/* Footer */}
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container text-center">
          <span className="text-muted">Thank you for your contribution to research.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
