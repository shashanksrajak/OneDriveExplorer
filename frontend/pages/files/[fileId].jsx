import { listPermissions } from "../../src/utils/api-service/onedrive";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import {
  InteractionStatus,
  InteractionType,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { loginRequest } from "../../src/authConfig";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import FileUsersListView from "../../src/ui-components/FileUsersListView";
import { socket } from "../../src/utils/socket";
import { msalInstance } from "../_app";

const UserContent = () => {
  const router = useRouter();

  const { instance, inProgress } = useMsal();
  const [usersData, setUsersData] = useState(null);

  // socket
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (!usersData && inProgress === InteractionStatus.None && router.isReady) {
      console.log(router.query.fileId);
      listPermissions(router.query.fileId).then((data) => setUsersData(data));
    }
  }, [inProgress, usersData, instance, router]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // Emit an event with a payload
    if (inProgress === InteractionStatus.None && router.isReady) {
      const account = msalInstance.getActiveAccount();
      msalInstance
        .acquireTokenSilent({
          ...loginRequest,
          account: account,
        })
        .then((res) => {
          const token = res.accessToken;
          socket.emit("updatePermissions", {
            fileId: router.query.fileId,
            token: token,
          });
        });
    }

    socket.on("permissionsUpdated", (data) => {
      console.log("permissionsUpdate Notification!", data);
      setUsersData(data);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [router, inProgress, instance]);

  return (
    <>
      <FileUsersListView users={usersData} />
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

export default function FileUsersPage() {
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
      <UserContent />
    </MsalAuthenticationTemplate>
  );
}
