import React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <>
      <AuthenticatedTemplate>
        <Button variant="contained" color="primary" href="/dashboard">Go back to dashboard</Button>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Typography variant="h6">
          <center>Please sign-in to explore your one drive files.</center>
        </Typography>
      </UnauthenticatedTemplate>
    </>
  );
}
