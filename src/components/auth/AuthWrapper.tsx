import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { applicationConfig } from "config";
import React, { FunctionComponent } from "react";

const authorityBaseUrl = "https://login.microsoftonline.com";

const configuration: Configuration = {
  auth: {
    clientId: applicationConfig.azureADClientId as string,
    authority: `${authorityBaseUrl}/${applicationConfig.azureADTenantId}`,
  },
};

const pca = new PublicClientApplication(configuration);

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: FunctionComponent<AuthWrapperProps> = ({
  children,
}: AuthWrapperProps) => <MsalProvider instance={pca}>{children}</MsalProvider>;
