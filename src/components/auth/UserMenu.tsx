import { Button, Menu, MenuItem } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { FunctionComponent, useState } from "react";
import { AuthContext } from "./AzureADAuthWrapper";

export const UserMenu: FunctionComponent = () => {
  const [anchorElement, setAnchorElement] = useState(null);

  const handleClick = (event: any) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <>
          <Button
            color="inherit"
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={auth.isAuthenticated ? handleClick : auth.login}
          >
            <AccountCircleIcon />
            {auth.isAuthenticated ? auth.user.displayName : "Login"}
          </Button>
          <Menu
            id="user-menu"
            anchorEl={anchorElement}
            keepMounted
            open={Boolean(anchorElement)}
            onClose={handleClose}
          >
            <MenuItem onClick={auth.logout}>Logout</MenuItem>
          </Menu>
        </>
      )}
    </AuthContext.Consumer>
  );
};
