import axios from "axios";

export const getTodos = async () => {
  return await axios
    .get<{ id: string; title: string }[]>("http://localhost:3000/todos")
    .then((res) => {
      return res.data;
    });
};

export const createTodo = async (data) => {
  await axios.post("http://localhost:3000/todos", data);
};

export const deleteTodo = async (id: string) => {
  await axios.delete("http://localhost:3000/todos/" + id);
};
