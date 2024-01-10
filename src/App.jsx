import { createTodo, deleteTodo, getTodos, updateTodo } from "./api/todos";
import { useEffect, useReducer } from "react";
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";

function App() {
  const [todos, dispatch] = useReducer(todosReducer, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getTodos();
      dispatch({
        type: "fetch",
        data: response.data,
      });
    };
    fetchData();
  }, []);
  const handleCreate = async (data) => {
    const response = await createTodo({ text: data, completed: false });
    dispatch({
      type: "added",
      data: response.data,
    });
  };
  const handleDelete = async (id) => {
    await deleteTodo(id);
    dispatch({
      type: "deleted",
      id,
    });
  };
  const handleEdit = async (id, data) => {
    data.completed = !data.completed;
    const response = await updateTodo(id, data);
    dispatch({
      type: "changed",
      data: response.data,
    });
  };
  return (
    <>
      <TodoHeader onCreate={handleCreate} />
      <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit} />
    </>
  );
}

const todosReducer = (todos, action) => {
  switch (action.type) {
    case "fetch":
      return action.data;
    case "added":
      return [...todos, action.data];
    case "deleted":
      return todos.filter((todo) => todo.id !== action.id);
    case "changed":
      return todos.map((todo) =>
        todo.id === action.data.id ? action.data : todo
      );
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
};

export default App;
