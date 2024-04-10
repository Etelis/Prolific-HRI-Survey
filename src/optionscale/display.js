/**
 * QuillForms Dependencies
 */
import { useTheme, useMessages } from '@quillforms/renderer-core';

/**
 * React Dependencies
 */
import { useEffect } from 'react';

/**
 * External Dependencies
 */
import tinyColor from 'tinycolor2';
import { css } from '@emotion/css';
import classnames from 'classnames';

const MyCustomBlockDisplay = (props) => {
    const {
        id,
        attributes,
        setIsValid,
        setIsAnswered,
        setValidationErr,
        isActive,
        val,
        setVal,
        next
    } = props;

    const { required, start, end, startLabel, endLabel, labels, description } = attributes;
    const messages = useMessages();
    const theme = useTheme();
    const answersColor = tinyColor(theme.answersColor);

    useEffect(() => {
        let timer;
        return () => {
            clearTimeout(timer); // Clean up timer on component unmount
        };
    }, []);

    useEffect(() => {
        if (required === true && (!val || val === "")) {
            setIsValid(false);
            setValidationErr(messages["label.errorAlert.required"]);
        } else {
            setIsValid(true);
            setValidationErr(null);
        }
    }, [val]);

    return (
        <>
            {/* Description directly above the scale, with smaller text */}
            <div
                className={css`
                    text-align: center;
                    margin-bottom: 10px; /* Reduce spacing above the scale */
                    font-size: 14px; /* Smaller text size for the description */
                `}
            >
                {description}
            </div>
            <div
                className={css`
                    display: flex;
                    flex-wrap: wrap;
                    width: 100%;
                    margin-top: 15px;
                    position: relative; /* For absolute positioning of labels */
                `}
            >
                {Array.from({ length: end - start + 1 }, (_, index) => start + index).map((item) => (
                    <div
                        key={item}
                        className={classnames(
                            css`
                                flex: 1;
                                min-width: 50px; /* Adjust based on your needs */
                                height: 62px; /* Adjust based on your needs */
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                cursor: pointer;
                                user-select: none;
                                margin: 0 6px; /* Horizontal margin for spacing between buttons */
                                padding: 10px; /* Padding inside each button for text */
                                border-radius: 4px;
                                background-color: ${answersColor.setAlpha(0.1).toString()};
                                color: ${answersColor.setAlpha(1).toString()};
                                box-shadow: ${answersColor.setAlpha(0.6).toString()} 0px 0px
                                    0px 1px inset;
                                transition: background-color 0.1s ease-out;
                                &:hover {
                                    background-color: ${answersColor.setAlpha(0.2).toString()};
                                }
                                &.selected {
                                    background-color: ${tinyColor(theme.answersColor)
                                        .setAlpha(0.75)
                                        .toString()};
                                    color: ${tinyColor(theme.answersColor).isDark()
                                        ? "#fff"
                                        : "#333"};
                                }
                            `,
                            { selected: val === item }
                        )}
                        onClick={() => {
                            setVal(item);
                            setIsAnswered(true); // This could be adjusted based on the actual logic you need
                            setTimeout(next, 500); // Adjust delay as needed
                        }}
                    >
                        {item}
                    </div>
                ))}
                <div
                    className={css`
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: -30px; /* Adjusted spacing from the buttons */
                        display: flex;
                        justify-content: space-between;
                        color: #333; /* Set label color */
                        font-size: 12px; /* Adjusted text size for the labels */
                        pointer-events: none;
                    `}
                >
                    <span>{startLabel}</span>
                    <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                        {val && labels[val]}
                    </span>
                    <span>{endLabel}</span>
                </div>
            </div>
        </>
    );
};

export default MyCustomBlockDisplay;
