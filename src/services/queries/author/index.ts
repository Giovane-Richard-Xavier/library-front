import { FormDataAuthor } from "@/app/(admin)/authors/page";
import api from "@/services/api";
import { IAuthor } from "@/utils/types/authors";
import { PaginatedResponse } from "@/utils/types/pagination";

export const createAuthor = async (data: FormDataAuthor) => {
  try {
    const request = await api.post("/bookstore/authors", data);

    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPaginateAllAthors = async (
  page: number = 0,
  size: number = 10,
  sort: string = "createdAt,desc"
): Promise<PaginatedResponse<IAuthor>> => {
  try {
    const response = await api.get<PaginatedResponse<IAuthor>>(
      "/bookstore/authors",
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

export const getAllAthors = async (): Promise<IAuthor[]> => {
  try {
    const request = await api.get("/bookstore/authors");

    return request.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const editAuthor = async (id: string, data: FormDataAuthor) => {
  try {
    const request = await api.put(`/bookstore/authors/${id}`, data);

    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAuthor = async (id: string) => {
  try {
    const request = await api.delete(`/bookstore/authors/${id}`);

    return request.data;
  } catch (error) {
    console.log(error);
  }
};
