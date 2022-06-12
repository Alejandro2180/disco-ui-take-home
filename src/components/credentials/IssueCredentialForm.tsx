import * as React from "react";
import { Box, FormControl, TextField, Typography } from "@mui/material";

import { VC } from "../../types";

export const IssueCredentialForm: React.FC<{ cred: VC; onChange(newValue: VC): void }> = ({ cred, onChange }) => {
  return (
    <Box sx={{ maxWidth: "400px", marginInline: "auto"}}>
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <Typography variant="body2">Recipient DID</Typography>
        <TextField
          variant="outlined"
          spellCheck={false}
          type="text"
          value={cred.credentialSubject?.id || ""}
          onChange={(e) =>
            onChange({
              ...cred,
              credentialSubject: {
                ...cred.credentialSubject,
                id: e.target.value,
              },
            })
          }
        />
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <Typography variant="body2">Kudos</Typography>
        <TextField
          variant="outlined"
          type="text"
          placeholder="Your kudos here!"
          value={cred.credentialSubject?.kudos || ""}
          onChange={(e) =>
            onChange({
              ...cred,
              credentialSubject: {
                ...cred.credentialSubject,
                kudos: e.target.value,
              },
            })
          }
        />
      </FormControl>
    </Box>
  );
};
