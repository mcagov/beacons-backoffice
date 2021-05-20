import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { applicationConfig } from "config";
import React, { FunctionComponent } from "react";
import { AuthContext } from "./AuthContext";

export const AuthWrapper: FunctionComponent = ({ children }) => {
  return (
    <MsalProvider instance={pca}>
      <MsalShim>{children}</MsalShim>
    </MsalProvider>
  );
};

const MsalShim: FunctionComponent = ({ children }) => {
  /**
   * Wrapper for the MSAL auth context.
   *
   * @remarks
   * Acts as a shim between MSAL and the Beacons Backoffice application so that high-level components can consume
   * authenticated user data without depending on a concrete auth provider.
   *
   */
  const currentUser = useMsal().instance.getAllAccounts()[0] || {};

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: useIsAuthenticated(),
        user: {
          username: currentUser?.username || "",
          displayName: currentUser?.name || "",
        },
        login: () => pca.loginRedirect(),
        logout: () => pca.logoutRedirect(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const configuration: Configuration = {
  auth: {
    clientId: applicationConfig.azureADClientId as string,
    authority: `https://login.microsoftonline.com/${applicationConfig.azureADTenantId}`,
  },
};

const pca = new PublicClientApplication(configuration);
