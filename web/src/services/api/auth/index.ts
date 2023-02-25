import { Me, SignInWithEmailPasswordRequest, SignInWithEmailPasswordResponse, SignUpWithEmailPasswordRequest } from "./types";

import { api } from '@/services/api'

function signUpWithEmailPassword (payload: SignUpWithEmailPasswordRequest) {
  return api.post('/auth/sign-up', payload)
}

function signInWithEmailPassword (payload: SignInWithEmailPasswordRequest) {
  return api.post<SignInWithEmailPasswordResponse>('/auth/login', payload)
}

function me () {
  return api.get<Me>('/auth/me')
}

export const authService = {
  signUpWithEmailPassword,
  signInWithEmailPassword,
  me
}
