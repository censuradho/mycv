import {  localApi } from "@/services/local-api";
import { GetCityResponse } from "./types";

export function findByName (name: string) {
  return localApi.get<GetCityResponse[]>(`/city/${name}`)
}

export const cityService = {
  findByName
}