import React from "react";
import type { StyleInterface } from "../Interfaces/StyleInterface";
import Button from "./Button";
import Typography from "./TypographyComponent";

interface PaginatorProps extends StyleInterface {
  page: number;
  size: number;
  NextPage: () => void;
  PrevPage: () => void;
  ChangeSize: (newSize: number) => void;
  isLoadingMore?: boolean;
}

const Paginator = ({
  page,
  size,
  NextPage,
  PrevPage,
  ChangeSize,
  isLoadingMore,
  ...props
}: PaginatorProps) => {
  return (
    <Typography
      variant="div"
      {...props}
      className="flex justify-between items-center gap-4 my-4"
    >
      <Button
        onClick={PrevPage}
        disabled={page === 1}
        className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </Button>
      <Typography variant="span" className="text-white">
        Page: {page}
      </Typography>
      <Button
        onClick={NextPage}
        disabled={!isLoadingMore}
        className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </Button>
      <select
        value={size}
        onChange={(e) => ChangeSize(Number(e.target.value))}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </Typography>
  );
};
export default React.memo(Paginator);
