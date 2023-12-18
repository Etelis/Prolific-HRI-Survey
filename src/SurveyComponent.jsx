import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { themeJson } from "./theme";
import "./index.css";
import { json } from "./json";

function SurveyComponent({ startTime }) {
    const survey = new Model(json);
    survey.applyTheme(themeJson);

    survey.onComplete.add((sender, options) => {
        const endTime = new Date();
        const duration = (endTime - startTime) / 1000; // Duration in seconds

        const surveyData = {
            responses: sender.data,
            duration: duration
        };

        console.log(JSON.stringify(surveyData));

        const lambdaUrl = "https://24d6houomeioliarmgrwonbi7m0nmblf.lambda-url.eu-central-1.on.aws/";

        fetch(lambdaUrl, {
            method: "POST",
            body: JSON.stringify(surveyData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    });

    return (<Survey model={survey} />);
}

export default SurveyComponent;
