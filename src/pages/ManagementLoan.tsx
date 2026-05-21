import { useEffect, useState } from "react";
import LoanManagementTable from "../components/ManagementTable";
import { getBooks, returnLoan, getLoans } from "../data/axiosBook";

import { BookStatus, type Book, type Loan } from "../types";

type BookMap = Record<number, Book>;

export default function ManagementLoan() {

    const [loans, setLoans] = useState<Loan[]>([]);
    const [bookMap, setBookMap] = useState<BookMap>({});
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isLoan, setIsLoan] = useState(true);

    // Obtener préstamos y libros
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [loansData, booksData] = await Promise.all([
                getLoans(),
                getBooks()
            ]);
            setLoans(loansData);

            // Crear mapa de libros por ID
            const map: BookMap = {};
            booksData.forEach((book: Book) => {
                if (book.id) map[book.id] = book;
            });
            setBookMap(map);
        } catch (error) {
            console.error("Error al cargar datos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleReturnBook = async (loanId: number) => {
        try {
            await returnLoan(loanId);
            fetchData();
        } catch (error) {
            console.error("Error al devolver libro:", error);
        }
    };



    const isOverdue = (loan: Loan) => {
        if (loan.status === BookStatus.AVAILABLE) return false;
        if (!loan.dueDate) return false;
        return new Date(loan.dueDate) < new Date();
    };

    const getLoanDisplayStatus = (loan: Loan): "active" | "returned" | "overdue" => {
        if (loan.status === BookStatus.AVAILABLE || loan.returnDate) return "returned";
        if (isOverdue(loan)) return "overdue";
        return "active";
    };

    const filteredLoans = loans.filter((loan) => {
        // 1. Filtrar por término de búsqueda (nombre o correo)
        const matchesSearch =
            loan.borrowerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            loan.borrowerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (bookMap[loan.book?.id || loan.bookId || 0]?.title?.toLowerCase() || "").includes(searchQuery.toLowerCase());

        // 2. Filtrar por estado
        const loanStatus = getLoanDisplayStatus(loan);
        let matchesStatus = true;
        if (statusFilter === "available") matchesStatus = loanStatus === "returned"; // Disponible == Devuelto
        if (statusFilter === "loaned") matchesStatus = loanStatus === "active";     // Prestados == Activos
        if (statusFilter === "expired") matchesStatus = loanStatus === "overdue";   // Vencidos == Atrasados

        return matchesSearch && matchesStatus;
    });

    return (
        <main className="flex-1 ml-0 lg:ml-72 h-screen overflow-y-auto p-6 lg:p-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col m-4" >
                    <h2 className="text-3xl font-bold tracking-tight text-white">Administrador   de Prestamos</h2>
                    <p className="text-[#9da6b9] mt-1">Historial de prestamos</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1.5 text-slate-400">add</span>
                        <button
                            className="pl-5 pr-2 py-2.5 rounded-lg bg-[#1e232e] border border-slate-700 text-white focus:outline-none w-full md:w-64 text-sm group-hover:bg-[#1e232e] group-hover:text-white"
                        >
                            Agregar Prestamo
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
                            placeholder="Buscar prestamo por nombre o correo"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2.5 rounded-lg bg-[#1e232e] border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64 text-sm"
                        />
                    </div>
                </div>



                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1.5  text-slate-400 cursor-pointer pr-5">filter_alt</span>
                    <select
                        name="select"
                        id="select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-[#1e232e] text-white pr-10 px-10 py-2 rounded-lg cursor-pointer"
                    >
                        <option value="all">Todos</option>
                        <option value="available">Disponible</option>
                        <option value="loaned">Prestados</option>
                        <option value="expired">Vencidos</option>
                    </select>
                </div>
            </div>

            <LoanManagementTable
                loans={filteredLoans}
                bookMap={bookMap}
                isLoading={isLoading}
                onReturnBook={handleReturnBook}
                isLoan={isLoan}
            />


        </main>
    )
}
