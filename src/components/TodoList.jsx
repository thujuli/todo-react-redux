import TodoItem from "./TodoItem";

export default function TodoList({ todos, onDelete, onEdit }) {
  return (
    <ul className="max-w-7xl mx-auto flex flex-col gap-y-1">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
