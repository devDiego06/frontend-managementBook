import type { Book } from "../types";
import api from "./axios";


//traer todos los libros
export const getBooks = async () => {
    const resposne = api.get<Book[]>("/books")
    return (await resposne).data
}

//traer un libro por id
export const getBookById = async (id: number) => {
    const response = api.get<Book>(`/books/${id}`)
    return (await response).data;
}

//buscar libros por palabra clave
export const getBooksByKeyword = async (keyword: string) => {
    const response = api.get<Book[]>(`/books/search?q=${keyword}`)
    return (await response).data
}


//eliminar libro
export const deleteBook = async (id: number) => {
    const response = api.delete(`/books/${id}`)
    return (await response).data;
}