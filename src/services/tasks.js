import { axiosBaseInstance } from "../axios/instance";
import endpoints from "./endpoints";

export const addTask = (payload) =>
  axiosBaseInstance.post(endpoints.ADD_TASK, payload);
export const getTasks = (query) =>
  axiosBaseInstance.get(endpoints.GET_TASKS(query));
export const deleteTask = (id) =>
  axiosBaseInstance.delete(endpoints.DELETE_TASK(id));
export const updateTask = (id, payload) =>
  axiosBaseInstance.put(endpoints.UPDATE_TASK(id), payload);
