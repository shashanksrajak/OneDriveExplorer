import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { AccountPicker } from "./AccountPicker";

export const SignOutButton = () => {
  const { instance } = useMsal();
  const [accountSelectorOpen, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = (logoutType) => {
    setAnchorEl(null);

    if (logoutType === "popup") {
      instance.logoutPopup().catch((e) => {
        console.error(`logoutPopup failed: ${e}`);
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect().catch((e) => {
        console.error(`logoutRedirect failed: ${e}`);
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        onClick={(event) => setAnchorEl(event.currentTarget)}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleLogout("redirect")} key="logoutRedirect">
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
