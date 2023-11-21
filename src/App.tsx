import { useEffect, useState } from "react";
import { useCreateTodo, useDeleteTodo } from "./mutations";
import { useTodos } from "./queries";

function App() {
  const [editingIndex, setEditingIndex] = useState(-1);
  const { data } = useTodos();
  const createMutation = useCreateTodo();
  const deleteMutation = useDeleteTodo();

  const handleNewClick = (data) => {
    createMutation.mutate({ title: "yoyo" });
  };

  const handleDeleteClick = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input type="text" value={"test"} placeholder="Create a new todo" />
      <button onClick={handleNewClick}>Add Todo</button>
      <ul>
        {data?.map((todo, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
            ) : (
              <>{todo.title}</>
            )}
            <button onClick={() => handleDeleteClick(todo.id)}>Delete</button>
            <button onClick={() => handleEditClick(index)}>
              {editingIndex === index ? "submit" : "edit"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
