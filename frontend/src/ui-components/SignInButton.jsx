import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import Button from "@mui/material/Button";
import { loginRequest } from "../authConfig";

export const SignInButton = () => {
  const { instance } = useMsal();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogin = (loginType) => {
    setAnchorEl(null);
    instance.loginRedirect(loginRequest).catch((e) => {
      console.error(`loginRedirect failed: ${e}`);
    });
  };

  return (
    <div>
      <Button onClick={() => handleLogin()} color="inherit">
        Login
      </Button>
    </div>
  );
};
