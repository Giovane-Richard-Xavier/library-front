import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBook, getAllBooksPaginate } from ".";
import { IBook } from "@/utils/types/book";

export const usePaginatedBooks = (page: number, size: number, sort: string) => {
  return useQuery({
    queryKey: ["allBooks", page, size, sort],
    queryFn: () => getAllBooksPaginate(page, size, sort),
    keepPreviousData: true,
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<IBook, "id">) => createBook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBooks"] });
    },
  });
};
