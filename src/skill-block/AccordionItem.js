// AccordionItem.js
import React, { useState } from 'react';
import { useTheme } from "@quillforms/renderer-core";
import { css } from "@emotion/css";

const AccordionItem = ({ title, text }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const toggleExpanded = () => setExpanded(!expanded);

  const itemStyle = css`
    border-bottom: 1px solid #ccc;
    &:last-child {
      border-bottom: none;
    }
    margin-bottom: 10px; // Add spacing between items
  `;

  const titleStyle = css`
  padding: 20px;
  cursor: pointer;
  user-select: none;
  font-size: 14px; /* Smaller than the main skill title */
  font-weight: normal; /* Less bold, can adjust as needed */
  color: ${theme.colors?.text || '#000000'};
  background-color: ${theme.colors?.background || '#ffffff'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc; /* Optional: added for visual separation */
  margin-bottom: 10px; /* Space between items */
`;

  const textStyle = css`
    transition: max-height 0.3s ease, padding 0.3s ease;
    max-height: ${expanded ? '1000px' : '0'}; // Adjust for content size
    overflow: hidden;
    padding: ${expanded ? '20px' : '0 20px'}; // Provide padding when expanded
  `;

  const arrowStyle = css`
    border: solid ${theme.colors?.text || '#000000'};
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: ${expanded ? 'rotate(45deg)' : 'rotate(-135deg)'}; // Correct the arrow direction
    transition: transform 0.3s ease;
  `;

  return (
    <div className={itemStyle}>
      <div className={titleStyle} onClick={toggleExpanded}>
        <h5>{title}</h5>
        <i className={arrowStyle}></i>
      </div>
      <div className={textStyle}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default AccordionItem;
