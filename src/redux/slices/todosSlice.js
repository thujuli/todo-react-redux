import { createSlice } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, editTodo, fetchTodos } from "../thunks/todoThunk";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
    error: null,
    status: "idle",
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload.id);
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      state.data = state.data.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.completed = !todo.completed;
          return todo;
        } else {
          return todo;
        }
      });
    });
  },
});

export const selectAllTodos = (state) => state.todos.data;
export const todoStatus = (state) => state.todos.status;
export const todoError = (state) => state.todos.error;
export default todosSlice.reducer;
