import axios from "axios";
import { useState, useEffect } from "react";
import { createBook, createLoan, getBooks } from "../data/axiosBook";
import { BookStatus, type Book } from "../types";
import { sileo } from "sileo";

interface ModalFormProps {
    onClose: () => void;
    isLoan?: boolean;
    onSuccess?: () => void;
}

export default function ModalForm({ onClose, isLoan, onSuccess }: ModalFormProps) {

    const [form, setForm] = useState<Book>({
        title: '',
        author: '',
        isbn: 0,
        publicationYear: 0
    })

    const [loanForm, setLoanForm] = useState({
        bookId: 0,
        borrowerName: '',
        borrowerEmail: ''
    })

    const [availableBooks, setAvailableBooks] = useState<Book[]>([])

    useEffect(() => {
        if (isLoan) {
            getBooks().then(data => {
                setAvailableBooks(data.filter((book: Book) => book.status === BookStatus.AVAILABLE))
            })
        }
    }, [isLoan])

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<String>('')

    //actualizar cualquier campo del form
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //actualizar formulario de prestamo
    const handleChangeLoanInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setLoanForm({
            ...loanForm,
            [name]: name === 'bookId' ? Number(value) : value
        })
    }

    console.log(loanForm);


    //validar el formulario que no este vacio y que el año sea valido
    const ValidateForm = () => {
        if (form.title === '' || form.author === '' || form.isbn === 0 || form.publicationYear === 0 || form.publicationYear >= new Date().getFullYear() && form.publicationYear <= 1000) {
            return false
        }
        return true
    }

    //validar formulario de prestamo
    const ValidateLoanForm = () => {
        if (loanForm.bookId === 0 || loanForm.borrowerName === '' || loanForm.borrowerEmail === '') {
            return false
        }
        return true
    }

    //crear el libro, 
    const onSubmit = async () => {

        setErrors('')
        setIsLoading(true)

        try {
            await createBook(form)
            onClose()
            if (onSuccess) onSuccess()

        } catch (error: any) {
            if (axios.AxiosError) {
                setErrors(error.response?.data?.message || sileo.error({
                    title: 'Error al crear el libro',
                    description: 'Todos los campos son obligatorios'
                }))
            }
        }
        finally {
            setIsLoading(false)
        }

        console.log('libro creado');

    }

    //crear el prestamo
    const onSubmitLoan = async () => {
        setErrors('')
        setIsLoading(true)

        try {
            await createLoan(loanForm)
            onClose()
            if (onSuccess) onSuccess()
        } catch (error: any) {
            if (axios.AxiosError) {
                setErrors(error.response?.data?.message || 'Error al crear el prestamo')
            }
        } finally {
            setIsLoading(false)
        }
    }


    return (


        <>
            {/* Fondo difuminado */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={onClose} // cierra al hacer click afuera
            />

            {
                isLoan ? (
                    < div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                        <form className="bg-[#111318] rounded-2xl shadow-xl p-6 w-full max-w-md pointer-events-auto">

                            {/* Header */}
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-lg text-white font-bold">Registrar Prestamo</h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Campos del formulario para prestamo*/}
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="text-sm font-medium text-white">Libro</label>
                                    <select
                                        className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none text-black focus:border-blue-500"
                                        onChange={handleChangeLoanInput}
                                        value={loanForm.bookId}
                                        name="bookId"
                                    >
                                        <option value={0} disabled>Seleccione un libro</option>
                                        {availableBooks.map(book => (
                                            <option key={book.id} value={book.id}>{book.title} - {book.author}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-white">Nombre de quien recibe</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Juan Perez"
                                        className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-black outline-none focus:border-blue-500"
                                        onChange={handleChangeLoanInput}
                                        value={loanForm.borrowerName}
                                        name="borrowerName"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-white">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Ej: juan@gmail.com"
                                        className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-black outline-none focus:border-blue-500"
                                        onChange={handleChangeLoanInput}
                                        value={loanForm.borrowerEmail}
                                        name="borrowerEmail"
                                    />
                                </div>
                            </div>

                            {/* Botones */}
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-2 rounded-lg border border-gray-200 text-sm font-medium text-white hover:bg-slate-50 hover:text-black"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    onClick={onSubmitLoan}
                                    disabled={!ValidateLoanForm()}
                                    className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Guardar
                                </button>
                            </div>

                        </form>
                    </div >
                ) : (
                    < div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                        <form className="bg-[#111318] rounded-2xl shadow-xl p-6 w-full max-w-md pointer-events-auto">

                            {/* Header */}
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-lg text-white font-bold">Agregar Libro</h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-600 text-xl"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Campos del formulario */}
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="text-sm font-medium text-white">Título</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Don Quijote"
                                        className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none text-black focus:border-blue-500"
                                        onChange={handleChangeInput}
                                        value={form.title}
                                        name="title"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-white">Autor</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Cervantes"
                                        className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-black outline-none focus:border-blue-500"
                                        onChange={handleChangeInput}
                                        value={form.author}
                                        name="author"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-white">ISBN</label>
                                    <input
                                        type="number"
                                        maxLength={13}
                                        placeholder="Ej: 978XXXXXXXXXX"
                                        className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-black outline-none focus:border-blue-500"
                                        onChange={handleChangeInput}
                                        value={form.isbn}
                                        name="isbn"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-white">Año de publicación</label>
                                    <input
                                        type="number"
                                        placeholder="Ej: 2024"
                                        className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-black outline-none focus:border-blue-500"
                                        onChange={handleChangeInput}
                                        value={form.publicationYear}
                                        name="publicationYear"
                                    />
                                </div>
                            </div>

                            {/* Botones */}
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-2 rounded-lg border border-gray-200 text-sm font-medium text-white hover:bg-slate-50 hover:text-black"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    onClick={onSubmit}
                                    disabled={!ValidateForm()}
                                    className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Guardar
                                </button>
                            </div>

                        </form>
                    </div >
                )
            }
        </>
    )
}