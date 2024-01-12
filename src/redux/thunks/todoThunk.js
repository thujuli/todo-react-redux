import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get("http://localhost:3000/todos");
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (data) => {
  const response = await axios.post("http://localhost:3000/todos", data);
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const response = await axios.delete(`http://localhost:3000/todos/${id}`);
  return response.data;
});

export const editTodo = createAsyncThunk("todos/editTodo", async (data) => {
  const response = await axios.put(
    `http://localhost:3000/todos/${data.id}`,
    data
  );
  return response.data;
});
