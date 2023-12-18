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

        useEffect(() => {
            const loadScenarios = async () => {
                const data = await import(`./${jsonFileName}`);
                const shuffledScenarios = data.scenarios.map(scenario => ({
                    ...scenario,
                    questionCategories: shuffleArray(scenario.questionCategories)
                }));
                setScenarios(shuffledScenarios);
                pickRandomQuestion(0, 0, shuffledScenarios);
            };
    
            loadScenarios();
        }, [jsonFileName]);

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
        setSelectedRating(null); // Reset the rating when a new question is picked
    }
};


    const handleRatingChange = (value) => {
        setSelectedRating(value);
    };

    const handleNextClick = () => {
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
            return;
        }

        // Saving the response for the current question
        const currentResponse = {
            scenarioId: currentScenarioIndex,
            categoryId: currentCategoryIndex,
            questionId: currentQuestion.id,
            rating: selectedRating
        };

        setResponses([...responses, currentResponse]);
        setSelectedRating(null); // Reset rating for the next question

        const currentScenario = scenarios[currentScenarioIndex];
        
        if (currentCategoryIndex < currentScenario.questionCategories.length - 1) {
            const nextCategoryIndex = currentCategoryIndex + 1;
            setCurrentCategoryIndex(nextCategoryIndex);
            pickRandomQuestion(currentScenarioIndex, nextCategoryIndex, scenarios);
        } else {
            setShowAdditionalInput(true);
        }
    };

const moveToNextScenario = () => {
    const nextScenarioIndex = currentScenarioIndex + 1;
    if (nextScenarioIndex < scenarios.length) {
        setCurrentScenarioIndex(nextScenarioIndex);
        setCurrentCategoryIndex(0);
        pickRandomQuestion(nextScenarioIndex, 0, scenarios);
    } else {
        // All scenarios are completed, call the onComplete function with all responses
        onComplete(responses);
    }
};

    const handleAdditionalInputChange = (value) => {
        setAdditionalInput(value);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', mt: 4, mb: 10}}>
            <div>
                {scenarios.length > 0 && currentQuestion && !showAdditionalInput && (
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
                                disabled={selectedRating === null}
                                onClick={handleNextClick}
                            >
                                Next
                            </Button>
                        </Box>
                    </>
                )}
                {showAdditionalInput && (
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