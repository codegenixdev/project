import { useQueries, useQuery } from "@tanstack/react-query";
import { getTodo, getTodosIds } from "./api";

export function useTodosIds() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodosIds,
  });
}

// one way of using this
// export function useTodo(id: number) {
//   return useQuery({
//     queryKey: ["todo", id],
//     queryFn: () => readTodo(id),
//     // find a use case for this
//   });
// }

export function useTodos(ids: (number | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["todo", id],
        queryFn: () => getTodo(id!),
      };
    }),
  });
}
