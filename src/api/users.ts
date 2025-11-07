import { client } from "../utils/fetchClient";
import type { User } from "../utils/types/user";

export const getUsers = () => {
  return client.get<User[]>('')
}

export const getUser = (id: number) => {
  return client.get<User>(`/${id}`)
}


export const patchUser = (id: number, data: User) => {
  return client.patch(`/${id}`, data);
};