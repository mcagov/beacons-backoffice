import React, { FunctionComponent } from "react";

import { MsalProvider } from "@azure/msal-react";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { applicationConfig } from "config";

const configuration: Configuration = {
  auth: {
    clientId: applicationConfig.azureADClientId as string,
  },
};

const pca = new PublicClientApplication(configuration);

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: FunctionComponent<AuthWrapperProps> = ({
  children,
}: AuthWrapperProps) => <MsalProvider instance={pca}>{children}</MsalProvider>;
