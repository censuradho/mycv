import { SignUpWithEmailPasswordRequest } from "./types";

import { api } from '@/services/api'

function signUpWithEmailPassword (payload: SignUpWithEmailPasswordRequest) {
  return api.post('/auth/sign-up', payload)
}

export const authService = {
  signUpWithEmailPassword
}
