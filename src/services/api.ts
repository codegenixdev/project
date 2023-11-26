import axios from "axios";
import { Todo } from "../types/todo";

const BASE_URL = "http://localhost:8080";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getTodosIds = async () => {
  // the axios throws errors for unsuccessful http call automatically
  // but fetch don't

  return (await axiosInstance.get<Todo[]>("todos")).data.map((item) => item.id);
};

export const createTodo = async (data: Todo) => {
  await axiosInstance.post("todos", data);
};

export const getTodo = async (id: number) => {
  return (await axiosInstance.get<Todo>(`todos/${id}`)).data;
};

export const updateTodo = async (data: Todo) => {
  await axiosInstance.put(`todos/${data.id}`, data);
};

export const deleteTodo = async (id: number | undefined) => {
  await axiosInstance.delete(`todos/${id}`);
};
