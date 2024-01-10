import { FaTrash } from "react-icons/fa6";
import { useTodosDispatch } from "../context/TodosContext";
import { deleteTodo, updateTodo } from "../api/todos";

export default function TodoItem({ todo }) {
  const dispatch = useTodosDispatch();
  const onDelete = async (id) => {
    await deleteTodo(id);
    dispatch({
      type: "deleted",
      id,
    });
  };
  const onEdit = async (data) => {
    data.completed = !data.completed;
    const response = await updateTodo(data.id, data);
    dispatch({
      type: "changed",
      data: response.data,
    });
  };
  return (
    <li
      className={`py-4 px-2 font-medium text-lg flex justify-between ${
        todo.completed ? "bg-green-300" : "bg-gray-200"
      }`}
    >
      <span onClick={() => onEdit(todo)} className="hover:cursor-pointer">
        {todo.text}
      </span>
      <button type="button" onClick={() => onDelete(todo.id)}>
        <FaTrash className="hover:text-red-600 hover:cursor-pointer" />
      </button>
    </li>
  );
}
