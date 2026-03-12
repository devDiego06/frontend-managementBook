import { useEffect, useState } from 'react'
import { type Book, BookStatus } from '../types'
import { getBookById } from '../data/axiosBook';

const statusMap: Record<BookStatus, { label: string; class: string }> = {
  [BookStatus.AVAILABLE]: { label: 'Disponible', class: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' },
  [BookStatus.BORROWED]: { label: 'Prestado', class: 'bg-amber-500/10 text-amber-500 border border-amber-500/20' },
  [BookStatus.RESERVED]: { label: 'Reservado', class: 'bg-blue-500/10 text-blue-500 border border-blue-500/20' },
}

type PropsBooks = {
  books: Book[]
  deleteBookHandler?: (id: number) => void
}

const loanBookHandler = (bookId: number) => {

  const [loanBook, setLoanBook] = useState<Book | null>(null)



  return (
    <div className='fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex items-center justify-center bg-[#1e232e]'>
      {/* formulario para prestar libro */}
      <form action="">
        <input type="text" placeholder='Nombre' />
        <input type="email" placeholder='Email' />
        <button type="submit">Prestar</button>
      </form>
    </div>
  )
}

export default function PopularBooks({ books, deleteBookHandler }: PropsBooks) {

  //obtener la ruta actual
  const currentPath = window.location.pathname
  console.log(loanBookHandler);


  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-bold text-white">Libros</h3>
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm text-[#9da6b9]">
          <thead className="bg-[#1e232e] text-xs uppercase text-slate-300">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">Titulo</th>
              <th scope="col" className="px-6 py-4 font-semibold">Autor</th>
              <th scope="col" className="px-6 py-4 font-semibold">Estado</th>
              <th scope="col" className="px-6 py-4 font-semibold">Prestamos</th>
              {
                currentPath === '/management-book' ? (
                  <>
                    <th scope="col" className="px-6 py-4 font-semibold">ISBN</th>
                    <th scope="col" className="px-6 py-4 font-semibold">Acciones</th>
                  </>
                ) : null
              }
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 bg-[#111318]">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-[#1e232e] transition-colors">
                <td className="px-6 py-4 font-medium text-white">
                  <div className="flex items-center gap-3">
                    {book.title}
                  </div>
                </td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusMap[book.status]?.class || 'bg-slate-500/10 text-slate-400 border border-slate-500/20'}`}>
                    {statusMap[book.status]?.label || book.status}
                  </span>
                </td>
                <td className="px-6 py-4">{50}</td>
                {
                  currentPath === '/management-book' ? (
                    <>
                      <td className="px-6 py-4">{book.isbn}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button onClick={() => deleteBookHandler?.(book.id)} className="text-red-600
                         hover:text-red-800 cursor-pointer ml-2"><span className="material-symbols-outlined">delete</span></button>
                        <button
                          onClick={() => loanBookHandler(book.id)}
                          className="text-blue-600 hover:text-blue-800 cursor-pointer ml-2"><span className="material-symbols-outlined">swap_horiz</span></button>
                      </td>
                    </>
                  ) : null
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
