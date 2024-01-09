import axios from "axios";

export const getTodos = async () => {
  return await axios.get("http://localhost:3000/todos");
};
export const createTodo = async (data) => {
  return await axios.post("http://localhost:3000/todos", data);
};
export const deleteTodo = async (id) => {
  return await axios.delete(`http://localhost:3000/todos/${id}`);
};
export const updateTodo = async (id, data) => {
  return await axios.put(`http://localhost:3000/todos/${id}`, data);
};
