import React, { FunctionComponent } from "react";

import { MsalProvider } from "@azure/msal-react";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";

const configuration: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_AAD_CLIENT_ID as string,
  },
};

const pca = new PublicClientApplication(configuration);

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: FunctionComponent<AuthWrapperProps> = ({
  children,
}: AuthWrapperProps) => <MsalProvider instance={pca}>{children}</MsalProvider>;
