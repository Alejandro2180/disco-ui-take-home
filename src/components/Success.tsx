import React from "react";
import { Box } from "@mui/material";
import { Profile } from "../types";
import { DiscoText } from "./DiscoText";
import { Typography } from "@mui/material";

export interface SuccessProps {
  recipient: Profile
}

export const Success: React.FC<SuccessProps> = ({recipient}) => {

  return <Box sx={{ padding: "16px", background: "#3A3E40", textAlign: "center", marginInline: "auto", width: "50%"}}>
    <Typography variant="h1">
      <DiscoText>Nice!</DiscoText>
    </Typography>

    <Typography variant="h5">    
      Credential has been issued to
    </Typography>
    <img src={recipient.avatarUrl} style={{width: 150}}></img>
    <br/>
    <Typography variant="h5">    
      {recipient.name}
    </Typography>
    <p>{recipient.did}</p>
    </Box>;
};
