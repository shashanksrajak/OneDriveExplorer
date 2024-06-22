import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import {
  InteractionStatus,
  InteractionType,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { loginRequest } from "../src/authConfig";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import { listFiles } from "../src/utils/api-service/onedrive";
import FileListView from "../src/ui-components/FileListView";

const DashboardContent = () => {
  const { instance, inProgress } = useMsal();
  const [filesData, setFilesData] = useState(null);

  useEffect(() => {
    if (!filesData && inProgress === InteractionStatus.None) {
      listFiles().then((data) => setFilesData(data));
    }
  }, [inProgress, filesData, instance]);

  return (
    <>
      <FileListView filesData={filesData} />
    </>
  );
};

const ErrorComponent = ({ error }) => {
  return (
    <Typography variant="h6">An Error Occurred: {error.errorCode}</Typography>
  );
};

const Loading = () => {
  return <Typography variant="h6">Authentication in progress...</Typography>;
};

export default function DashboardPage() {
  const authRequest = {
    ...loginRequest,
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      errorComponent={ErrorComponent}
      loadingComponent={Loading}
    >
      <DashboardContent />
    </MsalAuthenticationTemplate>
  );
}
