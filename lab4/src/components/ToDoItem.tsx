import React from "react";
import type { StyleInterface } from "../Interfaces/StyleInterface";
import type { Task } from "../Types/Task";
import { useState } from "react";
import Button from "./Button";
import CheckBox from "./CheckBox";
import Typography from "./TypographyComponent";
import Input from "./Input";

interface ToDoItemProps extends StyleInterface {
  task: Task;
  onDelete?: (id: string) => void;
  onChange?: (todo: Task) => void;
}

const ToDoItem = ({ task, onDelete, onChange, ...props }: ToDoItemProps) => {
  const [title, setTitle] = useState(task.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    if (onChange) {
      onChange({ ...task, title });
    }
    setIsEditing(false);
  };

  const handleOnChangeStatus = () => {
    if (onChange) {
      onChange({ ...task, completed: !task.completed });
    }
  };

  const handleNewTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOnDelete = () => {
    if (onDelete) {
      onDelete(task._id);
    }
  };

  const HandleIsEditing = () => {
    setIsEditing(true);
  };

  return (
    <Typography
      variant="div"
      {...props}
      className={`flex border items-center mb-2 gap-2 justify-between rounded-xl p-2 text-white ${
        task.completed ? "bg-green-800" : "bg-[#39466b]"
      }`}
    >
      <CheckBox
        isChecked={task.completed}
        handleCheckboxChange={handleOnChangeStatus}
        className={
          "w-4 h-4 ms-2 text-green-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        }
      />
      {isEditing ? (
        <Input
          value={title}
          onChange={handleNewTitleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      ) : (
        <Typography
          variant="span"
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            cursor: "pointer",
          }}
        >
          {title}
        </Typography>
      )}
      <Typography variant="div" className="flex flex-row gap-2">
        {isEditing ? (
          <Button
            onClick={handleUpdate}
            className={
              "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
            }
          >
            Save
          </Button>
        ) : (
          <Button
            onClick={HandleIsEditing}
            className={
              "focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 me-2"
            }
          >
            Edit
          </Button>
        )}
        <Button
          onClick={handleOnDelete}
          className={
            "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 me-2"
          }
        >
          Delete
        </Button>
      </Typography>
    </Typography>
  );
};

export default React.memo(ToDoItem);
