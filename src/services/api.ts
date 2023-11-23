import axios from "axios";
import { Todo } from "../types/todo";

const BASE_URL = "http://localhost:3000";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getTodos = async () => {
  return await axiosInstance
    .get<{ id: string; title: string }[]>("todos")
    .then((res) => {
      return res.data;
    });
};

export const createTodo = async (data: Todo) => {
  await axiosInstance.post("todos", data);
};

export const updateTodo = async (data: Todo, id: string) => {
  await axiosInstance.put(`todos/${id}`, data);
};

export const deleteTodo = async (id: string) => {
  await axiosInstance.delete(`todos/${id}`);
};
