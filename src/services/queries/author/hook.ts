import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAuthor, getAllAthors } from ".";
import { IAuthor } from "@/utils/types/authors";

export const useAllAuthors = () => {
  return useQuery<IAuthor[]>({
    queryKey: ["allAuthors"],
    queryFn: () => getAllAthors(),
  });
};

export const useCreateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (author: IAuthor) => createAuthor(author),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allAuthors"] });
    },
  });
};
