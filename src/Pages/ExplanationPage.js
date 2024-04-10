import React, { useState, useEffect } from 'react';
import Text from '../SurveyComponents/Text';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const ExplanationPage = () => {
  const [skills, setSkills] = useState([]);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  useEffect(() => {
    const loadSkills = async () => {
      const skillsData = await import(`./skills.json`);
      setSkills([{
        name: "Introduction",
        shortDescription: "Welcome to the Robot Skills Survey",
        fullDescription: `This survey explores various robot skills. You'll encounter:
        - A brief description of each skill.
        - A detailed explanation.
        - Examples illustrating the skill in action.
        Let's begin with an overview.`,

      }, ...skillsData.default.skills.slice(0, 5)]);
    };

    loadSkills();
  }, []);

  const handleNextSkill = () => {
    setCurrentSkillIndex(prevIndex => prevIndex < skills.length - 1 ? prevIndex + 1 : 0);
  };

  const renderSkillExplanationHeader = () => (
    <Typography variant="h5" sx={{ my: 2 }}>
      Skill Explanation Stage
    </Typography>
  );

  const renderIntroductionOrSkill = () => {
    if (currentSkillIndex === 0) {
      // Render introduction
      return (
        <Text
          title="Survey Introduction"
          description={skills[0].shortDescription}
          fullDescription={skills[0].fullDescription}
          examples={skills[0].examples}
        />
      );
    } else {
      // Render skill explanation with a header
      const skill = skills[currentSkillIndex];
      return (
        <>
          {renderSkillExplanationHeader()}
          <Text
            title={`Skill: ${skill.name}`}
            description={skill.shortDescription}
            fullDescription={skill.fullDescription}
            examples={skill.examples}
          />
        </>
      );
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Box sx={{ width: '100%', mx: 'auto', mt: 4, mb: 10 }}>
        {skills.length > 0 && renderIntroductionOrSkill()}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="outlined" color="primary" onClick={handleNextSkill}>
            {currentSkillIndex < skills.length - 1 ? "Next Skill" : "Start Again"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ExplanationPage;
