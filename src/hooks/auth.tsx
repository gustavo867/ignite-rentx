import React, { createContext, useState, useContext } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { database } from "../databases";
import { User as UserModel } from "../databases/models/user";
import { api } from "../services/api";

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut(): Promise<void>;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<User>({} as User);

  async function loadUserData() {
    const userCollection = database.get<UserModel>("users");
    const response = await userCollection.query().fetch();


    if (response.length >= 1) {
      const userData = response[0]._raw as unknown as User;

      
      api.defaults.headers.authorization = `Bearer ${userData.token}`;

      setData(userData)
    } else {
      setData({} as User)
    }
  }

  async function signIn(credentials: SignInCredentials) {
    try {
      const response = await api.post("/sessions", {
        email: credentials.email,
        password: credentials.password,
      });

      const { user, token } = response.data;

      api.defaults.headers.authorization = `Bearer ${token}`;

      await database.write(async () => {
        const userCollection = database.get<UserModel>("users");
        await userCollection.create((newUser) => {
          newUser.user_id = user.id
          newUser.name = user.name
          newUser.email = user.email
          newUser.driver_license = user.driver_license
          newUser.avatar = user.avatar
          newUser.token = token
        });
      });

      setData({
        ...user,
        token,
      });

      loadUserData();
    } catch (error) {
      throw new Error(error);
    }
  }

  const signOut = useCallback(async () => {
    try {
      const userCollection = database.get<UserModel>("users");

      api.defaults.headers.authorization = "";

      await database.write(async() => {
        const userSelected = await userCollection.find(data.id);

        
        if (userSelected) {
          await userSelected.destroyPermanently();
  
          setData({} as User)
        }

      });

    } catch (error) {
      throw new Error(error);
    }
  },[data])

  async function updateUser(user: User) {
    try {
      const userCollection = database.get<UserModel>("users");

      await database.write(async() => {
        const userSelected = await userCollection.find(user.id);

        await userSelected.update(userData => {
          userData.name = user.name
          userData.driver_license = user.driver_license
          userData.avatar = user.avatar
        });
      });


      setData(user);
    } catch (error) {
      throw new Error(error)
    }
  }


  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
        signOut,
        updateUser
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
