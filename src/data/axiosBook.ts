import type { Book, Loan } from "../types";
import api from "./axios";


//crear libro
export const createBook = async (book: Book) => {
    const response = api.post<Book>("/books", book);
    return (await response).data
}

//crear prestamo
export const createLoan = async (loan: Loan) => {
    const response = api.post<Loan>("/loans", loan);
    return (await response).data
}

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