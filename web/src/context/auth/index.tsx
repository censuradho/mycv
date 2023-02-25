import { appSettings } from "@/config/appSettings";
import { paths } from "@/constants/routes";
import { useLocalStorage } from "@/hooks";
import { api } from "@/services/api";
import { authService } from "@/services/api/auth";
import { SignInWithEmailPasswordRequest, SignUpWithEmailPasswordRequest } from "@/services/api/auth/types";
import { API_ERRORS } from "@/services/api/errors";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { useToast } from "../toast";
import { Auth, AuthContextParams } from "./types";

const AuthContext  = createContext({} as AuthContextParams)

export function AuthProvider (props: PropsWithChildren) {
  const {
    children,
  } = props
  const router = useRouter()
  const { onNotify } = useToast()

  const [isLoading, setIsLoading] = useState(true)

  const [auth, setAuth] = useLocalStorage<Auth | null>(`${appSettings.appName}:auth`, null)

  const handleSignInWithEmailPassword = async (payload: SignInWithEmailPasswordRequest) => {
    try {
      setIsLoading(true)
      const me = await authService.signInWithEmailPassword(payload)
      setAuth(me)

    } finally {
      setIsLoading(false)
    }
  }


  const handleSignOut = useCallback(() => {
    authService.signOut()
    router.push(paths.auth.signIn)
    setAuth(null)
  }, [router, setAuth])

  const handleSignUpWithEmailPassword = async (payload: SignUpWithEmailPasswordRequest) => {
    try {
      const { email, username, password } = payload

      setIsLoading(true)
      await authService.signUpWithEmailPassword({
        email, username, password 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAuth =async () => {
    try {
      if (auth) {
        api.defaults.headers.common.Authorization = `Bearer ${auth.access_token}`;

        const { data: me } = await authService.me();
        
        api.defaults.headers.common.Authorization = `Bearer ${me.access_token}`;

        setAuth(prevState => {

          if (!prevState) return prevState

          return ({
            ...prevState,
            ...me
          })
        })
        return;
      }

      setAuth(null);
      delete api.defaults.headers.common.Authorization;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!auth) {
      setIsLoading(false)
      return
    };
    handleAuth();
  }, []);

  useEffect(() => {
    api.interceptors.response.use((response) => response, async (error: AxiosError) => {

      if (error?.response?.status === 401) handleSignOut()

      return Promise.reject(error);
    })
  }, [handleSignOut])

  useEffect(() => {
    api.interceptors.response.use((response) => response, async (data: AxiosError) => {
      const { response } = data;

      const responseParsed = response as any;

      const isError =
        responseParsed.status >= 400
        && responseParsed.status < 500;

      if (response?.status === 401) {
        handleSignOut()
      }

      if (isError) {
        onNotify({
          title: 'Atenção! 🚨',
          description: API_ERRORS?.[responseParsed?.data?.description as keyof typeof API_ERRORS || 'generic']
        })
      }
      return Promise.reject(data);
    });
  }, []);

  
  return (
    <AuthContext.Provider
      value={{
        auth,
        isLoading,
        onSignInWithEmailPassword: handleSignInWithEmailPassword,
        onSignOut: handleSignOut,
        onSignUpWithEmailPassword: handleSignUpWithEmailPassword,
        onAuth: handleAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)