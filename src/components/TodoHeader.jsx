import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/thunks/todoThunk";

export default function TodoHeader() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [addStatus, setAddStatus] = useState("idle");
  const canSave = [text].every(Boolean) && addStatus === "idle";
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddStatus("pending");
        await dispatch(addTodo({ text, completed: false })).unwrap();
        setText("");
      } catch (error) {
        console.log(`Failed to save the todo:`, error.message);
      } finally {
        setAddStatus("idle");
      }
    }
  };
  return (
    <div className="max-w-7xl mx-auto bg-indigo-700 py-20 px-5">
      <h1 className="font-semibold text-5xl text-center text-white">
        Todo List
      </h1>
      <form onSubmit={handleSubmit} className="flex gap-x-2 mt-5">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add todo"
          className="h-12 rounded-md w-full px-3 font-medium"
        />
        <button
          type="submit"
          className={`h-12 rounded px-4 font-semibold ${
            addStatus === "idle" ? "bg-green-500" : "bg-slate-500"
          }`}
          disabled={addStatus !== "idle"}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
