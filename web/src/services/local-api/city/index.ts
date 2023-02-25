import { localApi } from "..";
import { GetCityResponse } from "./types";

export function findByName (name: string) {
  return localApi.get<GetCityResponse>(`/${name}`)
}

export const cityService = {
  findByName
}