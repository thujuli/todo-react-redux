import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import {
  selectAllTodos,
  todoStatus as status,
} from "../redux/slices/todosSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../redux/thunks/todoThunk";

export default function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(selectAllTodos);
  const todoStatus = useSelector(status);

  useEffect(() => {
    if (todoStatus == "idle") {
      dispatch(fetchTodos());
    }
  }, [todoStatus, dispatch]);
  return (
    <ul className="max-w-7xl mx-auto flex flex-col gap-y-1">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
