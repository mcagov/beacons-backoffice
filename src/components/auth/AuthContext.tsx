import { createContext } from "react";

export interface IAuthContext {
  isAuthenticated: boolean;
  user: {
    username: string;
    displayName: string;
  };
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  user: {
    username: "",
    displayName: "",
  },
  login: () => {},
  logout: () => {},
});
