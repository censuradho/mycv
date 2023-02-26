import { api } from "..";
import { CreateCurriculum, Curriculum } from "./types";

function create (payload: CreateCurriculum) {
  return api.post('curriculum', payload)
}

function me () {
  return api.get<Curriculum>('curriculum/me')
}

function findAll () {
  return api.get<Array<{ id: string }>>('curriculum/all')
}

export const curriculumService = {
  create,
  me,
  findAll
}