import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAuthor,
  deleteAuthor,
  editAuthor,
  getAllAthors,
  getFilterAthors,
} from ".";
import { IAuthor } from "@/utils/types/authors";
import { PaginatedResponse } from "@/utils/types/pagination";

export const useAllAuthors = () => {
  return useQuery<IAuthor[]>({
    queryKey: ["allAuthors"],
    queryFn: () => getAllAthors(),
  });
};

export const usePaginatedAuthors = (
  page: number,
  size: number,
  sort: string
) => {
  return useQuery<PaginatedResponse<IAuthor>>({
    queryKey: ["allAuthors", page, size, sort],
    queryFn: () => getFilterAthors(page, size, sort),
    keepPreviousData: true,
  });
};

export const useCreateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (author: Omit<IAuthor, "id">) => createAuthor(author),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAuthors"] });
    },
  });
};

export const useEditAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<IAuthor, "id"> }) =>
      editAuthor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAuthors"] });
    },
  });
};

export const useDeleteAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAuthor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAuthors"] });
    },
  });
};
