import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPublisher, deletePublisher, getAllPublisherPaginate } from ".";
import { PaginatedResponse } from "@/utils/types/pagination";
import { IPublisher } from "@/utils/types/publisher";

export const useAllPaginatePublisher = (
  page: number,
  size: number,
  sort: string
) => {
  return useQuery<PaginatedResponse<IPublisher>>({
    queryKey: ["allPublisher", page, size, sort],
    queryFn: () => getAllPublisherPaginate(page, size, sort),
    keepPreviousData: true,
  });
};

export const useCreatePublisher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (publisher: Omit<IPublisher, "id">) =>
      createPublisher(publisher),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPublisher"] });
    },
  });
};

export const useDeletePublisher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePublisher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPublisher"] });
    },
  });
};
