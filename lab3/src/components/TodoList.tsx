import Typography from "./TypographyComponent";
import type { StyleInterface } from "../Interfaces/StyleInterface";
import type { Task } from "../Types/Task";
import ToDoItem from "./ToDoItem";
import { useState } from "react";
import AddTaskForm from "./AddTaskForm";

const ToDoList = ({ ...props }: StyleInterface) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const AddTask = (title: string) => {
    setTasks([...tasks, { id: tasks.length + 1, title }]);
  };

  return (
    <Typography variant="div" {...props}>
      <Typography variant="h1" className="text-white text-3xl mb-4 font-bold">
        To-Do List
      </Typography>
      <AddTaskForm addTask={AddTask} />
      <Typography
        variant="div"
        className={
          "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-5 min-w-[90%]"
        }
      >
        {tasks.map((task) => (
          <ToDoItem
            key={task.id}
            task={task}
            onDelete={(id) => deleteTask(id)}
          />
        ))}
      </Typography>
    </Typography>
  );
};

export default ToDoList;
