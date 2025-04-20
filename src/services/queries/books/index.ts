import api from "@/services/api";
import { IBook } from "@/utils/types/book";
import { PaginatedResponse } from "@/utils/types/pagination";

export const getAllBooksPaginate = async (
  page: number = 0,
  size: number = 10,
  sort: string = "createdAt,desc"
): Promise<PaginatedResponse<IBook>> => {
  try {
    const response = await api.get<PaginatedResponse<IBook>>(
      "/bookstore/books",
      {
        params: {
          page,
          size,
          sort,
        },
      }
    );

    return response.data;
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
