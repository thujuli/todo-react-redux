import TodoItem from "./TodoItem";
import { useTodos } from "../context/TodosContext";

export default function TodoList() {
  const todos = useTodos();
  return (
    <ul className="max-w-7xl mx-auto flex flex-col gap-y-1">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
