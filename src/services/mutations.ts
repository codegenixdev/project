import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, updateTodo } from "./api";
import { Todo } from "../types/todo";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),

    onSuccess: () => {
      console.log("created successfully");
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["todos"],
        });
      }
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | undefined) => deleteTodo(id),

    onSuccess: () => {
      console.log("deleted successfully");
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["todos"],
        });
      }
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),

    onSuccess: () => {
      console.log("edited successfully");
    },
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["todos"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["todo", variables.id],
        });
      }
    },
  });
}
