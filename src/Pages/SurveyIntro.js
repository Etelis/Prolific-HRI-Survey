import React from 'react';

const SurveyIntro = ({ onAgree, onDisagree }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-12">
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <h1 className="card-title text-center mb-3">Informed Consent</h1>
              <p className="card-text" style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>
                Dear participant,
                <br />
                Thank you for accepting this HIT. This HIT is a part of a study being done by Prof. David Sarne and lab members from Bar-Ilan University, and was approved by the Institutional Review Board (IRB) of Bar-Ilan University.
                <br />
                <br />
                The purpose of this research is to study human behavior. The estimated time required for participation and the compensation for completing it can be found in the study description on Prolific.
                <br />
                <br />
                We believe there are no known risks associated with this research HIT; however, as with any online related activity the risk of a breach of confidentiality is always possible. To the best of our ability, your answers in this study will remain confidential. We will minimize any risks by storing all data in a secured server. To save your anonymity, your Prolific ID will be used only to distribute payment to you.
                <br />
                <br />
                Your participation in this HIT is entirely voluntary and you can withdraw at any time. There will be no penalty for withdrawal (though you will not complete the study and get paid). We sincerely appreciate your consideration and participation in this study.
If you encounter any technical problem with the study, or have any questions or comments, please contact us by sending a message using the Prolific system. 
                <br />
                <br />
                By clicking “I agree” below you are indicating that you are at least 18 years old, have read and understood this consent form and agree to participate in this research study.
                <div className="alert alert-info mt-3">
                  <strong>
                  Please note that you can participate in this study only once. <br />
Therefore, once you click the "I agree" button, you will not be able to start the study again or open it in another window/tab.<br />
Also, to avoid potential issues, please do NOT click the refresh button nor the back button while participating in this study.
                  </strong>
                </div>
              </p>
              <div className="text-center mt-4">
                <button
                  id="agree_button_id"
                  className="btn btn-primary me-2"
                  onClick={onAgree}
                >
                  I agree
                </button>
                <button
                  id="not_agree_button_id"
                  className="btn btn-secondary"
                  onClick={onDisagree}
                >
                  I do not agree
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyIntro;
