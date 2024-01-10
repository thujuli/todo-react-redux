import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { getTodos } from "../api/todos";
import { useContext } from "react";

export const TodosContext = createContext(null);
export const TodosDispatchContext = createContext(null);

export default function TodosProvider({ children }) {
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

  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
}

export const useTodos = () => {
  return useContext(TodosContext);
};

export const useTodosDispatch = () => {
  return useContext(TodosDispatchContext);
};

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
