import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../redux/thunks/todoThunk";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [isDeleted, setIsDeleted] = useState(true);
  const [isEdited, setIsEdited] = useState(true);
  const handleDelete = async () => {
    if (isDeleted) {
      try {
        setIsDeleted(false);
        await dispatch(deleteTodo(todo.id)).unwrap();
      } catch (error) {
        console.log(`Failed to delete the todo: ${error.message}`);
      } finally {
        setIsDeleted(true);
      }
    }
  };
  const handleEdit = async () => {
    if (isEdited) {
      try {
        setIsEdited(false);
        await dispatch(editTodo(todo)).unwrap();
      } catch (error) {
        console.log(`Failed to edit the todo: ${error.message}`);
      } finally {
        setIsEdited(true);
      }
    }
  };
  return (
    <li
      className={`py-4 px-2 font-medium text-lg flex justify-between ${
        todo.completed ? "bg-green-300" : "bg-gray-200"
      }`}
    >
      <span
        onClick={handleEdit}
        className={`${isEdited ? "hover:cursor-pointer" : "hover:cursor-wait"}`}
      >
        {todo.text}
      </span>
      <button type="button" onClick={handleDelete} disabled={!isDeleted}>
        <FaTrash
          className={`${
            isDeleted
              ? "hover:text-red-600 hover:cursor-pointer"
              : "hover:text-slate-500 hover:cursor-wait"
          }`}
        />
      </button>
    </li>
  );
}
