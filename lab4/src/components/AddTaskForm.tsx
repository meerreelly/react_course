import Button from "./Button";
import type { StyleInterface } from "../Interfaces/StyleInterface";
import Typography from "./TypographyComponent";
import Input from "./Input";
import { useState } from "react";

interface AddTaskFormProps extends StyleInterface {
  addTask: (title: string) => void;
}

const AddTaskForm = ({ addTask, ...props }: AddTaskFormProps) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = async () => {
    if (taskTitle.trim() !== "") {
      await addTask(taskTitle.trim());
      setTaskTitle("");
    }
  };
  return (
    <Typography variant="div" {...props}>
      <Input
        type="text"
        placeholder="Add a new task"
        className="flex-grow border border-white rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-white"
        onChange={(e) => {
          setTaskTitle(e.target.value);
        }}
        value={taskTitle}
      />
      <Button
        className="bg-blue-500 border border-white text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleSubmit}
      >
        Add Task
      </Button>
    </Typography>
  );
};
export default AddTaskForm;
