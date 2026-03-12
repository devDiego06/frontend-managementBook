import { useEffect, useState } from "react";
import PopularBooks from "../components/PopularBooks";
import { BookStatus, type Book } from "../types";
import { getBooks, deleteBook, getBooksByKeyword, getBookById } from "../data/axiosBook";
import { sileo } from "sileo";
import { title } from "process";
import api from "../data/axios";

export default function ManagementBook() {

    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        sileo.promise(getBooks().then(data => setBooks(data)), {
            loading: { title: 'Cargando libros...', duration: 4000 },
            success: { title: 'Libros cargados correctamente', duration: 4000 },
            error: { title: 'Error al cargar los libros', duration: 2000 }
        })
    }, [])


    //buscar por title, isbn o autor
    // const handleSearchTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault()
    //     const value = e.target.value
    //     if (value === '') {
    //         getBooks().then(data => setBooks(data))
    //         return
    //     }
    //     const filteredBooks = books.filter(book => book.title.toLowerCase().includes(value.toLowerCase()) || book.author.toLocaleLowerCase().includes(value.toLowerCase()) || book.isbn.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
    //     setBooks(filteredBooks)
    // }

    //buscar libro por titulo o autor
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.value
        if (value === '') {
            getBooks().then(data => setBooks(data))
        }
        getBooksByKeyword(value).then(data => setBooks(data))
    }

    //prestar libro
    const borrowBookHandler = (bookId: number, borrowerName: string, borrowerEmail: string) => {



        if (books.find(book => book.id === bookId)?.status !== BookStatus.AVAILABLE) {
            return sileo.error({
                title: 'Libro no disponible',
                duration: 2000
            })
        }


    }


    //eliminar libro
    const deleteBookHandler = (id: number) => {
        sileo.promise(deleteBook(id).then(() => {
            getBooks().then(data => setBooks(data))
        }), {
            loading: { title: 'Eliminando libro...', duration: 4000 },
            success: { title: 'Libro eliminado correctamente', duration: 4000 },
            error: { title: 'Error al eliminar el libro', duration: 2000 }
        })
    }

    return (
        <main className="flex-1 ml-0 lg:ml-72 h-screen overflow-y-auto p-6 lg:p-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col m-4" >
                    <h2 className="text-3xl font-bold tracking-tight text-white">Administracion de Libros</h2>
                    <p className="text-[#9da6b9] mt-1">Lista de libros</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1.5 text-slate-400">add</span>
                        <button
                            className="pl-5 pr-2 py-2.5 rounded-lg bg-[#1e232e] border border-slate-700 text-white focus:outline-none w-full md:w-64 text-sm group-hover:bg-[#1e232e] group-hover:text-white"
                        >
                            Agregar Libro
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex gap-4 w-full items-center mb-10 mt-5">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1.5  text-slate-400">search</span>
                        <input
                            type="text"
                            placeholder="Buscar libro por nombre, autor, ISBN"
                            onChange={handleSearch}
                            className="pl-10 pr-4 py-2.5 rounded-lg bg-[#1e232e] border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64 text-sm"
                        />
                    </div>
                </div>



                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1.5  text-slate-400 cursor-pointer pr-5">filter_alt</span>
                    <select name="select" id="select" className="bg-[#1e232e] text-white pr-10 px-10 py-2 rounded-lg">
                        <option value="all" selected={true}>Todos</option>
                        <option value="available" selected={false}>Disponible</option>
                        <option value="loaned" selected={false}>Prestados</option>
                        <option value="expired" selected={false}>Vencidos</option>
                    </select>
                </div>
            </div>


            <PopularBooks books={books} deleteBookHandler={deleteBookHandler} />

        </main>
    )
}
