import { FormDataPublisher } from "@/app/(admin)/publisher/page";
import api from "@/services/api";
import { PaginatedResponse } from "@/utils/types/pagination";
import { IPublisher } from "@/utils/types/publisher";

export const getAllPublisherPaginate = async (
  page: number,
  size: number,
  sort: string
) => {
  try {
    const request = await api.get<PaginatedResponse<IPublisher>>(
      "/bookstore/publishers",
      {
        params: {
          page,
          size,
          sort,
        },
      }
    );

    return request.data;
  } catch (error) {
    console.error("Error fetching authors:", error);
    return {
      content: [],
      pageable: {
        pageNumber: 0,
        pageSize: size,
        sort: {
          sorted: false,
          unsorted: true,
          empty: true,
        },
        offset: 0,
        paged: false,
        unpaged: true,
      },
      totalPages: 0,
      totalElements: 0,
      last: true,
      size: size,
      number: page,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true,
      },
      numberOfElements: 0,
      first: true,
      empty: true,
    };
  }
};

export const createPublisher = async (data: Omit<IPublisher, "id">) => {
  try {
    const request = await api.post("/bookstore/publishers", data);

    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export const editPublisher = async (id: string, data: FormDataPublisher) => {
  try {
    const request = await api.put(`/bookstore/publishers/${id}`, data);

    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePublisher = async (id: string) => {
  try {
    const request = await api.delete(`/bookstore/publishers/${id}`);

    return request.data;
  } catch (error) {
    console.log(error);
  }
};
