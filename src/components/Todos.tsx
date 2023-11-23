import { ChangeEvent, useState } from "react";
import { useTodos } from "../services/queries";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutations";
import { Todo } from "../types/todo";

export default function Todos() {
  const [updatingIndex, setUpdatingIndex] = useState(-1);
  const todosQuery = useTodos();
  const createMutation = useCreateTodo();
  const deleteMutation = useDeleteTodo();
  const updateMutation = useUpdateTodo();

  const [updateTodoValue, setUpdateTodoValue] = useState("");
  const [newTodoValue, setNewTodoValue] = useState("");

  const handleCreateSubmitClick = () => {
    const todo: Todo = {
      title: newTodoValue,
    };
    createMutation.mutate(todo);
  };

  const handleDeleteSubmitClick = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    setUpdatingIndex(-1);
  };

  const handleUpdateClick = (data: Todo, index: number) => {
    setUpdatingIndex(index);
    setUpdateTodoValue(data.title);
  };

  const handleCancelClick = () => {
    setUpdatingIndex(-1);
  };

  const handleUpdateSubmitClick = async (data: Todo, id: string) => {
    await updateMutation.mutateAsync({ data, id });
    setUpdatingIndex(-1);
  };

  const handleNewTodoInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodoValue(event.target.value);
  };

  const handleUpdateTodoInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateTodoValue(event.target.value);
  };

  // if (todosQuery.status === 'pending') {
  // }

  // if (todosQuery.isPending) {
  //   return <span>Loading...</span>;
  // }

  // if (todosQuery.isError) {
  //   return <span>There is an error!</span>;
  // }

  // now the only remained status is success

  return (
    <div>
      <div>query function status: {todosQuery.fetchStatus}</div>
      <div>query data status: {todosQuery.status}</div>

      <input onChange={handleNewTodoInputChange} />
      <button onClick={handleCreateSubmitClick}>Add Todo</button>
      <ul>
        {todosQuery.data?.map((todo, index) => (
          <li key={index}>
            {updatingIndex === index ? (
              <input
                value={updateTodoValue}
                onChange={handleUpdateTodoInputChange}
              />
            ) : (
              <>{todo.title}</>
            )}
            <button onClick={() => handleDeleteSubmitClick(todo.id)}>
              Delete
            </button>
            {updatingIndex !== index ? (
              <button onClick={() => handleUpdateClick(todo, index)}>
                update
              </button>
            ) : (
              <button
                onClick={() =>
                  handleUpdateSubmitClick({ title: updateTodoValue }, todo.id)
                }
              >
                submit
              </button>
            )}
            {updatingIndex !== -1 && updatingIndex === index && (
              <button onClick={handleCancelClick}>cancel</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
