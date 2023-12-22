import React, { useState, useEffect } from 'react';
import Text from '../SurveyComponents/Text';
import ImageWithDescription from '../SurveyComponents/ImageWithDescription';
import RatingScale from '../SurveyComponents/RatingScale';
import LargeInput from '../SurveyComponents/LargeInput'; // Import LargeInput
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const QuestionPage = ({ jsonFileName, onComplete }) => {
    const [scenarios, setScenarios] = useState([]);
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [responses, setResponses] = useState([]);
    const [showAdditionalInput, setShowAdditionalInput] = useState(false);
    const [additionalInput, setAdditionalInput] = useState('');
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
    const [showNextButton, setShowNextButton] = useState(false);
    const [completedScenariosCount, setCompletedScenariosCount] = useState(0);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const loadScenarios = async () => {
            const data = await import(`./${jsonFileName}`);
            const shuffledScenarios = data.scenarios.map(scenario => {
                // Separate mandatory and non-mandatory categories
                const mandatoryCategories = scenario.questionCategories.filter(cat => cat.mandatory);
                const nonMandatoryCategories = scenario.questionCategories.filter(cat => !cat.mandatory);

                // Randomly select up to 4 non-mandatory categories
                const selectedNonMandatory = selectRandom(nonMandatoryCategories, 4);

                // Combine mandatory and selected non-mandatory categories, then shuffle
                return {
                    ...scenario,
                    questionCategories: shuffleArray([...mandatoryCategories, ...selectedNonMandatory])
                };
            });
            setScenarios(shuffledScenarios);
            // Initialize with the first question of the first scenario
            pickRandomQuestion(0, 0, shuffledScenarios);
            // ... rest of your existing code
        };

        loadScenarios();
    }, [jsonFileName]);

    const selectRandom = (array, n) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        // Rest of your useEffect code...
    
        // Hide the Next button initially
        setShowNextButton(false);
    
        // Set a timeout to show the Next button after 3 seconds
        const timer = setTimeout(() => {
            setShowNextButton(true);
        }, 3000);
    
        // Clear the timeout if the component unmounts
        return () => clearTimeout(timer);
    }, [currentQuestion]); // Add currentQuestion to the dependency array
    
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  const pickRandomQuestion = (scenarioIndex, categoryIndex, scenariosData) => {
    if (scenariosData && scenariosData.length > scenarioIndex) {
        const category = scenariosData[scenarioIndex].questionCategories[categoryIndex];
        const randomQuestionIndex = Math.floor(Math.random() * category.questions.length);
        setCurrentQuestion(category.questions[randomQuestionIndex]);
        setSelectedRating(null); // Reset the rating
        setQuestionStartTime(Date.now()); // Set start time for the question
    }
};

    const handleRatingChange = (value) => {
        setSelectedRating(value);
    };

    const handleNextClick = () => {
        const timeTaken = Date.now() - questionStartTime; // Calculate time taken
        const currentScenario = scenarios[currentScenarioIndex];
        const currentCategory = currentScenario.questionCategories[currentCategoryIndex];
        
        if (showAdditionalInput) {
            // Save the additional input
            const additionalResponse = {
                scenarioId: currentScenarioIndex,
                additionalComment: additionalInput
            };
            setResponses([...responses, additionalResponse]);
            setShowAdditionalInput(false);
            setAdditionalInput('');

            // Move to the next scenario
            moveToNextScenario();
            if (currentQuestionNumber < totalQuestions) {
                setCurrentQuestionNumber(currentQuestionNumber + 1);
            }
            return;
        }
        // Saving the response for the current question
        const currentResponse = {
            scenarioId: currentScenarioIndex,
            categoryName: currentCategory.categoryName,
            questionId: currentQuestion.questionId,
            questionText: currentQuestion.questionText,
            rating: selectedRating,
            timeTaken: timeTaken // Add time taken to the response
        };

        setResponses([...responses, currentResponse]);
        setSelectedRating(null); // Reset rating for the next question
        setQuestionStartTime(Date.now()); // Reset start time for the next question
        
        if (currentCategoryIndex < currentScenario.questionCategories.length - 1) {
            const nextCategoryIndex = currentCategoryIndex + 1;
            setCurrentCategoryIndex(nextCategoryIndex);
            pickRandomQuestion(currentScenarioIndex, nextCategoryIndex, scenarios);
        } else {
            setShowAdditionalInput(true);
        }
    };

    const moveToNextScenario = () => {
        const newCount = completedScenariosCount + 1;
        setCompletedScenariosCount(newCount);

        if (newCount % 2 === 0 && newCount < scenarios.length) {
            setShowMessage(true);
        } else {
            proceedToNextScenario();
        }
    };

    const proceedToNextScenario = () => {
        const nextScenarioIndex = currentScenarioIndex + 1;
        if (nextScenarioIndex < scenarios.length) {
            setCurrentScenarioIndex(nextScenarioIndex);
            setCurrentCategoryIndex(0);
            pickRandomQuestion(nextScenarioIndex, 0, scenarios);
        } else {
            onComplete(responses);
        }
        setShowMessage(false);
    };

    const handleContinueClick = () => {
        proceedToNextScenario();
    };
    
    const handleAdditionalInputChange = (value) => {
        setAdditionalInput(value);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', mt: 4, mb: 10}}>
            <div>
            {showMessage && (
                    <Text 
                        title="Attention"
                        description="Your response is important. We need your honest opinion."
                        buttonText="Continue"
                        buttonDelay="100"
                        onButtonClick={handleContinueClick}
                    />
                )}
                
                {!showMessage && scenarios.length > 0 && currentQuestion && !showAdditionalInput && (
                    <>
                        <ImageWithDescription 
                            imageUrl={scenarios[currentScenarioIndex].imageUrl} 
                            description={scenarios[currentScenarioIndex].description} 
                        />
                        <RatingScale
                            questionText={currentQuestion.questionText}
                            description={currentQuestion.description}
                            onValueChange={handleRatingChange}
                            explanation={true}
                            selectedValue={selectedRating}
                        />
                        <Box sx={{ mt: 4, textAlign: 'left' }}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                disabled={selectedRating === null || !showNextButton}
                                onClick={handleNextClick}
                            >
                                Next
                            </Button>
                        </Box>
                    </>
                )}
                {!showMessage && showAdditionalInput && (
                    <>
                        <ImageWithDescription 
                            imageUrl={scenarios[currentScenarioIndex].imageUrl} 
                            description={scenarios[currentScenarioIndex].description} 
                        />
                        <LargeInput
                            title="Are there any other features or considerations that would influence your decision to help the robot that have not been covered? Please elaborate."
                            onInputChange={handleAdditionalInputChange}
                        />
                        <Box sx={{ mt: 4, textAlign: 'left' }}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                disabled={additionalInput == ''}
                                onClick={handleNextClick}
                            >
                                Next
                            </Button>
                        </Box>
                    </>
                )}
            </div>
        </Box>
    );
};

export default QuestionPage;