import Typography from "./TypographyComponent";
import type { StyleInterface } from "../Interfaces/StyleInterface";
import ToDoItem from "./ToDoItem";
import AddTaskForm from "./AddTaskForm";
import Loading from "./Loading";
import { useTodos } from "../hooks/useTodos";
import Paginator from "./Paginator";
import SearchForm from "./SearchForm";
import type { Task } from "../Types/Task";

const ToDoList = ({ ...props }: StyleInterface) => {
  const {
    data: tasks,
    error,
    isLoading,
    deleteTodo,
    addTodo,
    updateTodo,
    searchTerm,
    setSearchTerm,
    page,
    size,
    nextPage,
    prevPage,
    changeSize,
    isLoadingMore,
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

  const handleChange = async (todo: Task) => {
    await updateTodo(todo);
  };

  return (
    <Typography variant="div" {...props}>
      <Typography variant="h1" className="text-white text-3xl mb-4 font-bold">
        To-Do List
      </Typography>
      <Typography
        variant="div"
        className="w-full flex mb-4 flrx-row gap-2 justify-center"
      >
        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <AddTaskForm addTask={(title) => handleAdd(title)} />
      </Typography>

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
              onDelete={handleDelete}
              onChange={handleChange}
            />
          ))
        )}
      </Typography>
      <Paginator
        page={page}
        size={size}
        NextPage={nextPage}
        PrevPage={prevPage}
        ChangeSize={changeSize}
        isLoadingMore={isLoadingMore}
      />
    </Typography>
  );
};

export default ToDoList;
