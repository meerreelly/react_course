import Button from "./Button";
import type { StyleInterface } from "../Interfaces/StyleInterface";
import Typography from "./TypographyComponent";
import Input from "./Input";
import { useState, useCallback } from "react";

interface AddTaskFormProps extends StyleInterface {
  addTask: (title: string) => void;
}

const AddTaskForm = ({ addTask, ...props }: AddTaskFormProps) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = useCallback(async () => {
    if (taskTitle.trim() !== "") {
      await addTask(taskTitle.trim());
      setTaskTitle("");
    }
  }, [taskTitle, addTask]);

  return (
    <Typography
      variant={"div"}
      className="flex justify-center items-center flex-row gap-4"
      {...props}
    >
      <Input
        type="text"
        placeholder="Add a new task"
        className="flex-grow border border-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-white"
        onChange={(e) => {
          setTaskTitle(e.target.value);
        }}
        value={taskTitle}
      />
      <Button
        className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
        onClick={handleSubmit}
      >
        Add Task
      </Button>
    </Typography>
  );
};
export default AddTaskForm;
