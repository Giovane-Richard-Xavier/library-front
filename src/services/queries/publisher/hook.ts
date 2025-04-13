import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPublisher,
  deletePublisher,
  editPublisher,
  getAllPublishers,
  getFilterPublishers,
} from ".";
import { PaginatedResponse } from "@/utils/types/pagination";
import { IPublisher } from "@/utils/types/publisher";
import { FormDataPublisher } from "@/app/(admin)/publisher/page";

export const useAllPublishers = () => {
  return useQuery<IPublisher[]>({
    queryKey: ["allPublisher"],
    queryFn: () => getAllPublishers(),
  });
};

export const useAllPaginatePublisher = (
  page: number,
  size: number,
  sort: string
) => {
  return useQuery<PaginatedResponse<IPublisher>>({
    queryKey: ["allPublisher", page, size, sort],
    queryFn: () => getFilterPublishers(page, size, sort),
    keepPreviousData: true,
  });
};

export const useCreatePublisher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (publisher: FormDataPublisher) => createPublisher(publisher),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPublisher"] });
    },
  });
};

export const useEditPublisher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormDataPublisher }) =>
      editPublisher(id, data),
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
