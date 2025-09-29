import "./App.css";
import ToDoList from "./components/TodoList";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className=" bg-[#0F172A] min-h-screen min-w-screen">
      <ToDoList
        className={"flex flex-col align-center min-w-screen items-center pt-6"}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
