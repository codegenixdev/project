import axios from "axios";
import { Todo } from "../types/todo";
import { Project } from "../types/project";
import { Product } from "../types/product";
import { User } from "../types/user";

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

export const getProjects = async (page = 1) => {
  return (await axiosInstance.get<Project[]>(`projects?_page=${page}&_limit=3`))
    .data;
};

export const getProducts = async ({ pageParam }: { pageParam: number }) =>
  (
    await axiosInstance.get<Product[]>(
      `products?_page=${pageParam + 1}&_limit=3`
    )
  ).data;

export const getProduct = async (id: number) =>
  (await axiosInstance.get<Product>(`products/${id}`)).data;

export const getUsers = async () =>
  (await axiosInstance.get<User[]>("users")).data;
