import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { AiOutlineClockCircle } from 'react-icons/ai';

const SurveyContainer = styled.div`
  background-color: #f4f4f4;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.div`
  width: 100%;
  max-width: 480px; // Set a max-width to prevent the box from extending too far
  text-align: center;
  padding: 0 20px;
`;

const StartButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  display: block; // Changed to block to allow for margin auto
  margin: 10px auto 0; // Center button horizontally
  box-shadow: 0px 2px 4px rgba(0, 123, 255, 0.5);

  &:hover {
    background-color: #0069d9;
  }

  &:active {
    background-color: #005cbf;
  }
`;

const EnterText = styled.div`
  font-size: 12px;
  color: #6c757d;
  margin-top: 8px; // Adjust spacing as necessary
`;

const TimeInfo = styled.div`
  display: flex;
  justify-content: center; // This centers the content horizontally
  align-items: center;
  font-size: 12px;
  color: #6c757d;
  margin-top: 8px;
`;

const ClockIcon = styled(AiOutlineClockCircle)`
  margin-right: 5px;
`;

const StartSurvey = ({ onStart, estimatedTime, buttonText, surveyDescription }) => {
  return (
    <SurveyContainer>
      <ContentBox>
        <h2>About This Survey</h2>
        <p>{surveyDescription}</p>
        <StartButton onClick={onStart}>{buttonText}</StartButton>
        <EnterText>press Enter ↵</EnterText>
        <TimeInfo>
          <ClockIcon size="16" />
          Takes {estimatedTime}
        </TimeInfo>
      </ContentBox>
    </SurveyContainer>
  );
};

StartSurvey.propTypes = {
  onStart: PropTypes.func.isRequired,
  estimatedTime: PropTypes.string,
  buttonText: PropTypes.string,
  surveyDescription: PropTypes.string
};

StartSurvey.defaultProps = {
  estimatedTime: '2 minutes',
  buttonText: 'Start',
  surveyDescription: 'In this survey, you will be presented with images of various robots. ' +
                     'For each robot, you will be asked to rate to what extent you believe ' +
                     'the robot possesses certain skills. Your honest ratings will help us understand ' +
                     'human perception of robotic capabilities.'
};

export default StartSurvey;
