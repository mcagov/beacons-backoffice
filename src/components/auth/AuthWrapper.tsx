import { IPublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import React, { FunctionComponent } from "react";

interface AuthWrapperProps {
  pca: IPublicClientApplication;
  children: React.ReactNode;
}

export const AuthWrapper: FunctionComponent<AuthWrapperProps> = ({
  children,
  pca,
}: AuthWrapperProps) => {
  return <MsalProvider instance={pca}>{children}</MsalProvider>;
};
