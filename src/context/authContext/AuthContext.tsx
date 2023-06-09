import { createContext, useEffect, useReducer } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  LoginData,
  LoginResponse,
  RegisterData,
  User,
} from "../../interfaces/authInterfaces";
import { AuthState, authReducer } from "./authReducer";
import movieApi from "../../api/movieApi";

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: User | null;
  status: "checking" | "authenticated" | "not-authenticated";
  signUp: (registerData: RegisterData) => void;
  signIn: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: "checking",
  token: null,
  user: null,
  errorMessage: "",
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const checkToken = async () => {
    try {
      // await AsyncStorage.removeItem('token');

      const token = await AsyncStorage.getItem("token");

      if (token === null) {
        return dispatch({ type: "notAuthenticated" });
      }

      const response = await movieApi.get("/auth/renew");

      if (response.status !== 200) {
        return dispatch({ type: "notAuthenticated" });
      }

      await AsyncStorage.setItem("token", response.data?.token);

      dispatch({
        type: "signUp",
        payload: {
          token: response.data?.token ?? null,
          user: response.data.user,
        },
      });
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };

  useEffect(() => {
    try {
      checkToken();
    } catch (error) {
      console.log(error, "useEffect Error");
    }
  }, []);

  const signIn = async ({ email, password }: LoginData) => {
    try {
      const {
        data: { token, user },
      } = await movieApi.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      dispatch({
        type: "signUp",
        payload: {
          token: token,
          user: user,
        },
      });
      await AsyncStorage.setItem("token", token);
    } catch (error: any) {
      console.log(error.response.data.msg);
      dispatch({
        type: "addError",
        payload: error.response.data.msg || "Incorrect credentials",
      });
    }
  };
  const signUp = async ({ name, email, password }: RegisterData) => {
    try {
      const {
        data: { token, user },
      } = await movieApi.post<LoginResponse>("/auth/register", {
        name,
        email,
        password,
      });
      dispatch({
        type: "signUp",
        payload: {
          token: token,
          user: user,
        },
      });
      await AsyncStorage.setItem("token", token);
    } catch (error: any) {
      console.log(error.response.data.msg);
      dispatch({
        type: "addError",
        payload: error.response.data.msg || "Check the information",
      });
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "logout" });
  };

  const removeError = () => {
    dispatch({ type: "removeError" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
