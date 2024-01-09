import { FaTrash } from "react-icons/fa6";

export default function TodoItem({ todo, onDelete, onEdit }) {
  return (
    <li
      className={`py-4 px-2 font-medium text-lg flex justify-between ${
        todo.completed ? "bg-green-300" : "bg-gray-200"
      }`}
    >
      <span
        onClick={() => onEdit(todo.id, todo)}
        className="hover:cursor-pointer"
      >
        {todo.text}
      </span>
      <button type="button" onClick={() => onDelete(todo.id)}>
        <FaTrash className="hover:text-red-600 hover:cursor-pointer" />
      </button>
    </li>
  );
}
