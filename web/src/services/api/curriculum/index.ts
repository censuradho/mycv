import { api } from "..";
import { CreateCurriculum } from "./types";

function create (payload: CreateCurriculum) {
  return api.post('curriculum', payload)
}

function me () {
  return api.get('curriculum/me')
}
export const curriculumService = {
  create
}