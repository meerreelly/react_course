import useSWR from "swr";
import type { Task } from "../Types/Task";
import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useTodos = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const url = `https://68df0394898434f41356911d.mockapi.io/todos/todos`;
  const { data, error, isLoading, mutate } = useSWR<Task[]>(
    url + `?page=${page}&limit=${size}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
    }
  );

  useEffect(() => {
    if (data) {
      setIsLoadingMore(data.length >= size);
    }
  }, [data, size]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const todos = useMemo(() => {
    if (!data) return [];
    return data.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const changeSize = (newSize: number) => {
    setPage(1);
    setSize(newSize);
  };

  const deleteTodo = async (idToDelete: string) => {
    try {
      await mutate(
        async (current = []) => {
          await fetch(`${url}/${idToDelete}`, { method: "DELETE" });
          return current.filter((todo) => todo._id !== idToDelete);
        },
        {
          rollbackOnError: true,
          revalidate: true,
        }
      );
      toast.success("Todo deleted successfully");
      setPage(1);
    } catch (error) {
      toast.error("Error deleting todo");
      console.error("Error deleting todo:", error);
    }
  };

  const addTodo = async (title: string) => {
    try {
      await mutate(
        async (current = []) => {
          await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, completed: false }),
          });
          return [...current];
        },
        {
          rollbackOnError: true,
          revalidate: true,
        }
      );
      toast.success("Todo added successfully");
    } catch (error) {
      toast.error("Error adding todo");
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (todoToEdit: Task) => {
    try {
      await mutate(
        async (current = []) => {
          await fetch(`${url}/${todoToEdit._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(todoToEdit),
          });
          return current.map((todo) =>
            todo._id === todoToEdit._id ? todoToEdit : todo
          );
        },
        {
          rollbackOnError: true,
          revalidate: false,
        }
      );
      toast.success("Todo updated successfully");
    } catch (error) {
      toast.error("Error updating todo");
      console.error("Error updating todo:", error);
    }
  };

  return {
    data: todos,
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
  };
};
