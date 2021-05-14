import { IPublicClientApplication } from "@azure/msal-browser";
import { IAuthGateway } from "./IAuthGateway";

export class AuthGateway implements IAuthGateway {
  private publicClientApplication: IPublicClientApplication;

  constructor(publicClientApplication: IPublicClientApplication) {
    this.publicClientApplication = publicClientApplication;
  }

  public async getAccessToken(): Promise<string> {
    const account = this.publicClientApplication.getAllAccounts()[0];

    const accessTokenRequest = {
      scopes: ["User.Read"],
      account: account,
    };

    try {
      const response = await this.publicClientApplication.acquireTokenSilent(
        accessTokenRequest
      );
      const token = response.accessToken;
      console.log(token);
      return token;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
