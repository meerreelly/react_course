import React from "react";
import type { StyleInterface } from "../Interfaces/StyleInterface";
import Button from "./Button";
import Input from "./Input";
import Typography from "./TypographyComponent";
import { useCallback } from "react";

interface SearchFormPropse extends StyleInterface {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchForm = ({
  searchTerm,
  setSearchTerm,
  ...props
}: SearchFormPropse) => {
  const handleClear = useCallback(() => setSearchTerm(""), [setSearchTerm]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm]
  );

  return (
    <Typography
      variant={"div"}
      className="flex justify-center items-center flex-row gap-4"
      {...props}
    >
      <Input
        value={searchTerm}
        onChange={handleChange}
        type="text"
        placeholder="Search tasks..."
        className="flex-grow border border-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-white"
      />
      <Button
        onClick={handleClear}
        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        Clear
      </Button>
    </Typography>
  );
};
export default React.memo(SearchForm);
