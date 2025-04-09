import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAuthor,
  editAuthor,
  getAllAthors,
  getPaginateAllAthors,
} from ".";
import { IAuthor, PaginatedResponse } from "@/utils/types/authors";

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
    queryKey: ["authors", page, size, sort],
    queryFn: () => getPaginateAllAthors(page, size, sort),
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
