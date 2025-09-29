import Typography from "./TypographyComponent";
import type { StyleInterface } from "../Interfaces/StyleInterface";
import ToDoItem from "./ToDoItem";
import AddTaskForm from "./AddTaskForm";
import Loading from "./Loading";
import { useTodos } from "../hooks/useTodos";

const ToDoList = ({ ...props }: StyleInterface) => {
  const {
    data: tasks,
    error,
    isLoading,
    deleteTodo,
    addTodo,
    updateTodo,
  } = useTodos();

  if (error) {
    return <Typography variant="div">Failed to load</Typography>;
  }

  const handleAdd = async (title: string) => {
    await addTodo(title);
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
  };

  const handleChange = async (id: string, state: boolean) => {
    await updateTodo(id, state);
  };

  return (
    <Typography variant="div" {...props}>
      <Typography variant="h1" className="text-white text-3xl mb-4 font-bold">
        To-Do List
      </Typography>
      <AddTaskForm addTask={(title) => handleAdd(title)} />
      <Typography
        variant="div"
        className={
          "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-5 min-w-[90%]"
        }
      >
        {isLoading ? (
          <Loading />
        ) : (
          tasks?.map((task) => (
            <ToDoItem
              key={task._id}
              task={task}
              onDelete={(id) => handleDelete(id)}
              onChange={(id, state) => handleChange(id, state)}
            />
          ))
        )}
      </Typography>
    </Typography>
  );
};

export default ToDoList;
