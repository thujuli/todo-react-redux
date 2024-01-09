import { useState } from "react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./api/todos";
import { useEffect } from "react";
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getTodos();
      setTodos(response.data);
    };
    fetchData();
  }, []);
  const handleCreate = async (data) => {
    const response = await createTodo({ text: data, completed: false });
    setTodos([...todos, response.data]);
  };
  const handleDelete = async (id) => {
    await deleteTodo(id);
    const newTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newTodo);
  };
  const handleEdit = async (id, data) => {
    data.completed = !data.completed;
    const response = await updateTodo(id, data);
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        return response.data;
      }
      return todo;
    });
    setTodos(newTodo);
  };
  return (
    <>
      <TodoHeader onCreate={handleCreate} />
      <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit} />
    </>
  );
}

export default App;
