import * as React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

import { VC, Profile } from "../../types";
import { IssueCredentialForm } from "./IssueCredentialForm";
import { DiscoButton } from "../DiscoButton";

// @NOTE: You will use this component to display the credential in the Review step
import { Credential } from "./Credential";

// @NOTE: You will use this async function from the Review step, and when it returns, this component should advance to the Success step
import { signVc } from "../../utils/";

// @NOTE: You will edit and use this component in the Success step
import { Success } from "../Success";

export interface IssueCredentialFlowProps {
  issuer: string;
  recipient: Profile; // @NOTE: This prop contains information (name, profile image URL) about the recipient of the issued credential that you may use in the success step
  initialCredential: VC;
}

export const IssueCredentialFlow: React.FC<IssueCredentialFlowProps> = (props) => {
  // State variables
  const [cred, setCred] = React.useState(props.initialCredential);
  const [step, setStep] = React.useState(1); // Steps available: 1-3
  const [loading, setLoading] = React.useState(false);

  // Signs VC & progresses to next step when complete
  const issueCredential = (vc: VC) => {
    setLoading(true);
    signVc(vc).then(() => {
      setLoading(false);
      setStep(3)
    });
  }

  // Renders content based on the current step
  const renderContent = () => {
    if(step == 1){
      return (
        <div>
          <Typography variant="h6">Issue Kudos Credential</Typography>

          <Typography variant="body1" sx={{ marginBottom: "16px" }}>
            Fill out the credential details
          </Typography>

          <IssueCredentialForm cred={cred} onChange={setCred}/>

          <DiscoButton
            style={{maxWidth: "400px"}}
            onClick={() => {
            setCred(cred);
            setStep(2)
            }}
          >
            Review
          </DiscoButton>
        </div>
      )
    }
    if(step == 2){
      return (
      <div>
      <Typography variant="h6">Review Credential</Typography>

      <Typography variant="body1" sx={{ marginBottom: "16px" }}>
        Make sure all the information is correct
      </Typography>

      <Credential cred={cred} />
      <br/>
      <DiscoButton 
        onClick={() => 
        issueCredential(cred)
        }
      >
        {loading && (
          <CircularProgress />
        )}
        {!loading && (<p>Issue Credential</p>)}
      </DiscoButton>
    </div>
      )
    }
    if(step == 3){
      return (
        <div>
        <Success recipient={props.recipient}></Success>
        <br/>
        <DiscoButton 
          onClick={() => setStep(1)} // For sake of assignment, reset back to first step
        >
          Close
        </DiscoButton>
        </div>
      )
    }
  }

  return (
    <Box sx={{textAlign: "center"}}>
      {renderContent()}
    </Box>
  );
};
