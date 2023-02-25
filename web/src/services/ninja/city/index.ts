import { ninjaApi } from "@/services/ninja";
import { GetCityResponse } from "./types";

export function findByName (name: string) {
  return ninjaApi.get<GetCityResponse[]>('/city', {
    params: {
      name
    }
  })
}

export const cityService = {
  findByName
}