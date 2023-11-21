import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo } from "./api";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createTodo(data),

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
    mutationFn: (id: string) => deleteTodo(id),

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
