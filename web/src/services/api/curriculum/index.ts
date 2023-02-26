import { api } from "..";
import { CreateCurriculum, Curriculum } from "./types";

function create (payload: CreateCurriculum) {
  return api.post('/curriculum', payload)
}

function me () {
  return api.get<Curriculum>('/curriculum/me')
}

function findAll () {
  return api.get<Array<{ id: string }>>('/curriculum/all')
  // http://localhost:3000/cv/86363fe2-d2d1-4e20-a071-23d481c21c2c
}

function findById (id: string) {
  return api.get<Curriculum>(`/curriculum/${id}`)
}

export const curriculumService = {
  create,
  me,
  findAll,
  findById
}