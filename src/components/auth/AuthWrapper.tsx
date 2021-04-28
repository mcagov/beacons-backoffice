import React, { FunctionComponent } from "react";

import { MsalProvider } from "@azure/msal-react";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";

const configuration: Configuration = {
  auth: {
    clientId: "276fd164-c30c-485f-bd76-a8f3b5bcac74",
  },
};

const pca = new PublicClientApplication(configuration);

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: FunctionComponent<AuthWrapperProps> = ({
  children,
}: AuthWrapperProps) => <MsalProvider instance={pca}>{children}</MsalProvider>;
