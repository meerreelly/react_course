import type { StyleInterface } from "../Interfaces/StyleInterface";
import type { Task } from "../Types/Task";
import { useState } from "react";
import Button from "./Button";
import CheckBox from "./CheckBox";
import Typography from "./TypographyComponent";

interface ToDoItemProps extends StyleInterface {
  task: Task;
  onDelete?: (id: string) => void;
}

const ToDoItem = ({ task, onDelete, ...props }: ToDoItemProps) => {
  const [isDone, setIsDone] = useState(Boolean);

  const changeStatus = () => {
    setIsDone(!isDone);
  };

  return (
    <Typography
      variant="div"
      {...props}
      className={`flex border items-center mb-2 gap-2 justify-between rounded-xl p-2 text-white ${
        isDone ? "bg-green-800" : "bg-[#39466b]"
      }`}
    >
      <CheckBox
        isChecked={isDone}
        handleCheckboxChange={changeStatus}
        className={
          "w-4 h-4 ms-2 text-green-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        }
      />
      <Typography
        variant="span"
        style={{
          textDecoration: isDone ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {task.title}
      </Typography>
      <Button
        onClick={() => onDelete && onDelete(task.id)}
        className={
          "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 me-2"
        }
      >
        Delete
      </Button>
    </Typography>
  );
};

export default ToDoItem;
