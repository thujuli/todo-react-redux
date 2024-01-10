import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import TodosProvider from "./context/TodosContext";

function App() {
  return (
    <>
      <TodosProvider>
        <TodoHeader />
        <TodoList />
      </TodosProvider>
    </>
  );
}

export default App;
