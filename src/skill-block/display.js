import React, { useState } from 'react';
import { useTheme } from "@quillforms/renderer-core";
import { css } from "@emotion/css";
import AccordionItem from './AccordionItem';

const SkillTextBlockDisplay = ({ attributes }) => {
    const { skillName, shortDescription, fullDescription, items = [] } = attributes || {};
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    const containerStyle = css`
        padding: 20px;
        text-align: left;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        font-size: 16px;
        color: ${theme.colors?.text || '#000000'};
        background: ${theme.colors?.background || '#ffffff'};
    `;

    const descriptionStyle = css`
        position: relative;
        max-height: ${isExpanded ? 'none' : '4em'}; /* Adjust this to control initial visible height */
        overflow: hidden;
        cursor: pointer;
        ${!isExpanded ? `&:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2em; /* Height of the gradient effect */
            background: linear-gradient(to bottom, transparent, ${theme.colors?.background || '#ffffff'} 90%);
        }` : ''}
    `;

    const toggleDescription = () => setIsExpanded(!isExpanded);

    return (
        <div className={containerStyle}>
            <h2>{skillName || "Skill Name"}</h2>
            <p>{shortDescription || "A brief description of the skill."}</p>
            {/* The fullDescription section that expands/collapses */}
            <div
                className={descriptionStyle}
                onClick={toggleDescription}
                dangerouslySetInnerHTML={{
                    __html: fullDescription || "A more detailed description of what this skill entails and why it is important."
                }}
            ></div>
            {/* The items section is always fully visible */}
            {items && items.length > 0 && (
                items.map((item, index) => (
                    <AccordionItem key={index} title={item.title} text={item.text} />
                ))
            )}
        </div>
    );
};

export default SkillTextBlockDisplay;
