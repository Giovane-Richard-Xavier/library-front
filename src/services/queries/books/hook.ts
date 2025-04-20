import { useQuery } from "@tanstack/react-query";
import { getAllBooksPaginate } from ".";

export const usePaginatedBooks = (page: number, size: number, sort: string) => {
  return useQuery({
    queryKey: ["allBooks", page, size, sort],
    queryFn: () => getAllBooksPaginate(page, size, sort),
    keepPreviousData: true,
  });
};
