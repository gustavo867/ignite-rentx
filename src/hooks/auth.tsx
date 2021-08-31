import { useNavigation } from "@react-navigation/native";
import React, { createContext, useState, useContext } from "react";
import { api } from "../services/api";

interface User {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  async function signIn(credentials: SignInCredentials) {
    const response = await api.post("/sessions", {
      email: credentials.email,
      password: credentials.password,
    });

    api.defaults.headers.authorization = `Bearer ${response.data.token}`;

    setData({
      token: response.data.token,
      user: response.data.user,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthContext, AuthProvider, useAuth };
