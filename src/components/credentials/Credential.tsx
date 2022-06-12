import * as React from "react";
import { VC } from "../../types";
import { Box, Button, Card, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  CredentialDid,
  CredentialFieldItem,
  CredentialFieldLabel,
  CredentialFieldValue,
  CredentialHeader,
  CredentialSection,
} from "./CredentialComponents";
import { dateTimeFormat } from "../../utils";

export const Credential: React.FC<{ cred: VC }> = ({ cred }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const vcType = cred.type[cred.type.length - 1];
  const issuanceDate =
    typeof cred.issuanceDate === "number"
      ? dateTimeFormat(new Date(cred.issuanceDate * 1000))
      : dateTimeFormat(new Date(cred.issuanceDate));
  const issuanceDateFormatted = `${issuanceDate.dateFormatted} at ${issuanceDate.timeFormatted}`;
  const expirationDate = cred.expirationDate && dateTimeFormat(new Date(cred.expirationDate));
  const expirationDateFormatted =
    expirationDate && `${expirationDate.dateFormatted} at ${expirationDate.timeFormatted}`;
  const issuer = typeof cred.issuer === "string" ? cred.issuer : cred.issuer.id;

  return (
    <Card
      sx={{
        backgroundColor: "#26262F",
        borderRadius: "4px",
        maxWidth: "480px",
        overflow: "hidden",
        width: "100%",
        textAlign: "start",
        marginInline: "auto"
      }}
    >
      <CredentialHeader>
        <Box sx={{ alignItems: "flex-end", display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Box>
            <Typography variant="h6" sx={{ color: "#B4B8BB", display: "block" }}>
              {cred.credentialSubject.name || cred.credentialSubject.title || vcType}
            </Typography>
            <CredentialDid did={issuer} />
          </Box>
          <Button variant="text" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Button>
        </Box>
      </CredentialHeader>
      {isOpen && (
        <>
          <CredentialSection>
            {Object.entries(cred.credentialSubject).map(
              ([key, value]) =>
                key !== "id" && (
                  <CredentialFieldItem key={key}>
                    <CredentialFieldLabel>{key[0].toUpperCase() + key.substring(1)}</CredentialFieldLabel>
                    <CredentialFieldValue>{value}</CredentialFieldValue>
                  </CredentialFieldItem>
                ),
            )}
          </CredentialSection>
          <CredentialSection>
            <CredentialFieldItem>
              <CredentialFieldLabel>Issuer</CredentialFieldLabel>
              <CredentialDid did={issuer} />
            </CredentialFieldItem>
            <CredentialFieldItem>
              <CredentialFieldLabel>Recipient DID</CredentialFieldLabel>
              <CredentialDid did={cred.credentialSubject.id} />
            </CredentialFieldItem>
            <CredentialFieldItem>
              <CredentialFieldLabel>Issued</CredentialFieldLabel>
              <CredentialFieldValue>{issuanceDateFormatted}</CredentialFieldValue>
            </CredentialFieldItem>
          </CredentialSection>
        </>
      )}
    </Card>
  );
};
