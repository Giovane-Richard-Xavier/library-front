import { FormDataAuthor } from "@/app/(admin)/authors/page";
import api from "@/services/api";
import { IAuthor } from "@/utils/types/authors";

export const createAuthor = async (data: FormDataAuthor) => {
  try {
    const request = await api.post("/bookstore/authors", data);

    return request.data;
  } catch (error) {
    console.log(error);
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
