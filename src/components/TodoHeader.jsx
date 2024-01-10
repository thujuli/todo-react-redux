import { useState } from "react";
import { useTodosDispatch } from "../context/TodosContext";
import { createTodo } from "../api/todos";

export default function TodoHeader() {
  const [todo, setTodo] = useState("");
  const dispatch = useTodosDispatch();
  const onCreate = async (data) => {
    const response = await createTodo({ text: data, completed: false });
    dispatch({
      type: "added",
      data: response.data,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(todo);
    setTodo("");
  };
  return (
    <div className="max-w-7xl mx-auto bg-indigo-700 py-20 px-5">
      <h1 className="font-semibold text-5xl text-center text-white">
        Todo List
      </h1>
      <form onSubmit={handleSubmit} className="flex gap-x-2 mt-5">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add todo"
          className="h-12 rounded-md w-full px-3 font-medium"
        />
        <button
          type="submit"
          className="bg-green-500 h-12 rounded px-4 font-semibold"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
