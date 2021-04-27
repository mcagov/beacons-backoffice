import React, { FunctionComponent } from "react";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationResult } from "@azure/msal-react/dist/hooks/useMsalAuthentication";

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth: FunctionComponent<RequireAuthProps> = ({
  children,
}: RequireAuthProps) => {
  const authRequest = {
    scopes: ["openid", "profile"],
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      errorComponent={ErrorComponent}
      loadingComponent={LoadingComponent}
    >
      {children}{" "}
    </MsalAuthenticationTemplate>
  );
};

const ErrorComponent: FunctionComponent<MsalAuthenticationResult> = ({
  error,
}) => <p>An Error Occurred: {error}</p>;

const LoadingComponent: FunctionComponent = () => (
  <p>Authentication in progress...</p>
);
