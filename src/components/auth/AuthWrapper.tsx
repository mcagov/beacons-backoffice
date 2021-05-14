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

const account = pca.getAllAccounts()[0];

const accessTokenRequest = {
  scopes: ["user.read"],
  account: account,
};

pca.acquireTokenSilent(accessTokenRequest).then((accessTokenResponse) => {
  let accessToken = accessTokenResponse.accessToken;
  console.log(accessToken);
  console.log(JSON.parse(atob(accessToken.split(".")[1])));

  const headers = new Headers();
  const bearer = "Bearer " + accessToken;
  headers.append("Authorization", bearer);
  const options = {
    method: "GET",
    headers: headers,
  };
  var graphEndpoint = "https://graph.microsoft.com/v1.0/me";

  fetch(graphEndpoint, options).then((response) => {
    console.log(response.json());
  });
});

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: FunctionComponent<AuthWrapperProps> = ({
  children,
}: AuthWrapperProps) => {
  console.log("here");
  return <MsalProvider instance={pca}>{children}</MsalProvider>;
};
