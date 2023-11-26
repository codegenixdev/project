import { SubmitHandler, useForm } from "react-hook-form";
import { Todo } from "../types/todo";
import { useCreateTodo } from "../services/mutations";

export default function NewTodo() {
  const { register, handleSubmit } = useForm<Todo>({
    defaultValues: { checked: false, title: "" },
  });

  const createTodoMutation = useCreateTodo();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
      <h4>New todo:</h4>
      <input placeholder="Title" {...register("title")} />
      <br />
      <input placeholder="Description" {...register("description")} />

      <br />
      <input type="submit" value="Create todo" />
    </form>
  );
}
