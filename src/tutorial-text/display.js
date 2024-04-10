import React from 'react';
import { useTheme } from "@quillforms/renderer-core";
import { css } from "@emotion/css";
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip'; // Correctly importing Tooltip

const TutorialTextBlockDisplay = ({ attributes }) => {
    const { text } = attributes || {};
    const theme = useTheme();

    const boxStyle = css`
        padding: 20px;
        text-align: left;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
        font-size: 16px;
        color: ${theme.colors?.text || '#000000'};
        background: ${theme.colors?.background || '#ffffff'};
        display: flex;
        align-items: start;
        gap: 12px;
    `;

    const textStyle = css`
        line-height: 1.5;
    `;

    const iconStyle = css`
        font-size: 24px;
        color: ${theme.colors?.primary || '#000000'};
    `;

    return (
        <div className={boxStyle}>
            <div>
                <AiOutlineInfoCircle className={iconStyle} aria-label="Information" data-tip="Learn more about this topic." />
                <Tooltip place="top" effect="solid" />
            </div>
            <p className={textStyle}>{text}</p>
        </div>
    );
};

export default TutorialTextBlockDisplay;
