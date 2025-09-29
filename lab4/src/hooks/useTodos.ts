import useSWR, { mutate } from "swr";
import type { Task } from "../Types/Task";
import toast from "react-hot-toast";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const url = "https://crudcrud.com/api/c3ba03ae441846d099a4227ae08da761/todos";

export const useTodos = () => {
  const { data, error, isLoading } = useSWR<Task[]>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  const deleteTodo = async (idToDelete: string) => {
    mutate(data?.filter((todo) => todo._id !== idToDelete), false);
    try {
      await fetch(`${url}/${idToDelete}`, { method: "DELETE" });
      toast.success("Todo deleted successfully");
    } catch (error) {
      toast.error("Error deleting todo");
      console.error("Error deleting todo:", error);
    }

    mutate(url);
  };

  const addTodo = async (title: string) => {
    const newTodo = { title, completed: false };
    mutate([...(data || []), newTodo], false);
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      toast.success("Todo added successfully");
    } catch (error) {
      toast.error("Error adding todo");
      console.error("Error adding todo:", error);
    }
    mutate(url);
  };

  const updateTodo = async (id: string, state: boolean) => {
    const todoToUpdate = data?.find((todo) => todo._id === id);
    if (!todoToUpdate) return;
    const updatedTodo = { ...todoToUpdate, completed: state };
    try {
      await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTodo.title,
          completed: updatedTodo.completed,
        }),
      });
      toast.success("Todo updated successfully");
    } catch (error) {
      toast.error("Error updating todo");
      console.error("Error updating todo:", error);
    }
  };

  return {
    data,
    error,
    isLoading,
    deleteTodo,
    addTodo,
    updateTodo,
  };
};
