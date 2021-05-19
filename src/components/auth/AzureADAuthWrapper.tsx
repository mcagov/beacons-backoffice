import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { applicationConfig } from "config";
import React, { createContext, FunctionComponent } from "react";

export const AzureADAuthWrapper: FunctionComponent = ({ children }) => {
  return (
    <MsalProvider instance={pca}>
      <AuthContextWrapper>{children}</AuthContextWrapper>
    </MsalProvider>
  );
};

const AuthContextWrapper: FunctionComponent = ({ children }) => {
  /**
   * Wrapper for the MSAL auth context.
   *
   * @remarks
   * Provides an abstract interface for consumption of auth context data by high-level components without depending
   * on a concrete auth provider.  Acts as a shim between MSAL and the Beacons Backoffice application.
   *
   */
  const { instance, inProgress } = useMsal();

  const currentUser = instance.getAllAccounts()[0] || {};

  return (
    <AuthContext.Provider
      value={{
        isAuthenticating: inProgress === "login",
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

export const AuthContext = createContext<{
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  user: {
    username: string;
    displayName: string;
  };
  login: () => void;
  logout: () => void;
}>({
  isAuthenticating: false,
  isAuthenticated: false,
  user: {
    username: "",
    displayName: "",
  },
  login: () => {},
  logout: () => {},
});

const configuration: Configuration = {
  auth: {
    clientId: applicationConfig.azureADClientId as string,
    authority: `https://login.microsoftonline.com/${applicationConfig.azureADTenantId}`,
  },
};

const pca = new PublicClientApplication(configuration);
