import { useDeleteTodo, useUpdateTodo } from "../services/mutations";
import { useTodos, useTodosIds } from "../services/queries";
import { Todo } from "../types/todo";
import NewTodo from "./NewTodo";

export default function Todos() {
  const todosQuery = useTodosIds();
  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const todosQueries = useTodos(todosQuery.data);

  // if (todosQuery.status === 'pending') {
  // }

  // if (todosQuery.isPending) {
  //   return <span>Loading...</span>;
  // }

  // if (todosQuery.isError) {
  //   return <span>There is an error!</span>;
  // }

  // now the only remained status is success

  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) {
      updateMutation.mutate({ ...data, checked: true });
    }
  };

  const handleDeleteSubmit = async (id: number | undefined) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <div>
      {/* use fetch status for loading spinners */}
      <p>Query function status: {todosQuery.fetchStatus}</p>
      <p>Query data status: {todosQuery.status}</p>
      <NewTodo />
      <ul>
        {todosQueries.map(({ data }) => (
          <li key={data?.id}>
            <div>Id: {data?.id}</div>
            <span>
              <strong>Title:</strong> {data?.title},{" "}
              <strong>Description: </strong>
              {data?.description}
            </span>
            <div>
              <button
                onClick={() => handleMarkAsDoneSubmit(data)}
                disabled={data?.checked}
              >
                {data?.checked ? "Done" : "Mark as done"}
              </button>
              <button onClick={() => handleDeleteSubmit(data?.id)}>
                Delete
              </button>
            </div>
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
