"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Mail, User, Calendar, RotateCcw } from "lucide-react";
import { BookStatus, type Loan, type Book } from "../types";

interface LoanManagementTableProps {
    title?: string;
    className?: string;
    loans: Loan[];
    bookMap: Record<number, Book>;
    isLoading: boolean;
    onReturnBook: (loanId: number) => void;
}

export function LoanManagementTable({
    title = "Historial de Préstamos",
    className = "",
    loans,
    bookMap,
    isLoading,
    onReturnBook
}: LoanManagementTableProps) {
    const [hoveredLoan, setHoveredLoan] = useState<number | null>(null);
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

    const handleReturn = async (loanId: number) => {
        onReturnBook(loanId);
        setSelectedLoan(null);
    };

    const openLoanModal = (loan: Loan) => {
        setSelectedLoan(loan);
    };

    const closeLoanModal = () => {
        setSelectedLoan(null);
    };

    // Formatear fecha
    const formatDate = (date?: Date | string) => {
        if (!date) return "—";
        const d = new Date(date);
        return d.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    // Verificar si el préstamo está vencido
    const isOverdue = (loan: Loan) => {
        if (loan.status === BookStatus.AVAILABLE) return false;
        if (!loan.dueDate) return false;
        return new Date(loan.dueDate) < new Date();
    };

    // Obtener el status para mostrar
    const getLoanDisplayStatus = (loan: Loan): "active" | "returned" | "overdue" => {
        if (loan.status === BookStatus.AVAILABLE || loan.returnDate) return "returned";
        if (isOverdue(loan)) return "overdue";
        return "active";
    };

    const getStatusBadge = (loan: Loan) => {
        const displayStatus = getLoanDisplayStatus(loan);
        switch (displayStatus) {
            case "active":
                return (
                    <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                        <span className="text-blue-400 text-sm font-medium">Prestado</span>
                    </div>
                );
            case "returned":
                return (
                    <div className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                        <span className="text-green-400 text-sm font-medium">Devuelto</span>
                    </div>
                );
            case "overdue":
                return (
                    <div className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                        <span className="text-red-400 text-sm font-medium">Vencido</span>
                    </div>
                );
        }
    };

    const getStatusGradient = (loan: Loan) => {
        const displayStatus = getLoanDisplayStatus(loan);
        switch (displayStatus) {
            case "active":
                return "from-blue-500/10 to-transparent";
            case "returned":
                return "from-green-500/10 to-transparent";
            case "overdue":
                return "from-red-500/10 to-transparent";
        }
    };

    // Obtener nombre del libro
    const getBookTitle = (bookId: number) => {
        return bookMap[bookId]?.title ?? `Libro #${bookId}`;
    };

    const getBookAuthor = (bookId: number) => {
        return bookMap[bookId]?.author ?? "—";
    };

    if (isLoading) {
        return (
            <div className={`w-full max-w-7xl mx-auto p-6 ${className}`}>
                <div className="relative border border-border/30 rounded-2xl p-6 bg-card">
                    <div className="flex items-center justify-center py-12">
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <RotateCcw className="w-5 h-5" />
                            </motion.div>
                            <span>Cargando préstamos...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full max-w-7xl mx-auto ${className}`}>
            <div className="relative border border-border/30 rounded-2xl p-6 bg-card">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <h1 className="text-xl font-medium text-foreground">{title}</h1>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {loans.filter(l => getLoanDisplayStatus(l) === "active").length} Activos • {loans.filter(l => getLoanDisplayStatus(l) === "returned").length} Devueltos • {loans.filter(l => getLoanDisplayStatus(l) === "overdue").length} Vencidos
                        </div>
                    </div>
                </div>

                {/* Table */}
                <motion.div
                    className="space-y-2"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.08,
                                delayChildren: 0.1,
                            }
                        }
                    }}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Headers */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <div className="col-span-1">No</div>
                        <div className="col-span-2">Libro</div>
                        <div className="col-span-2">Prestatario</div>
                        <div className="col-span-2">Email</div>
                        <div className="col-span-2">Fecha Préstamo</div>
                        <div className="col-span-2">Fecha Devolución</div>
                        <div className="col-span-1">Estado</div>
                    </div>

                    {/* Loan Rows */}
                    {loans.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
                            <p>No hay préstamos registrados</p>
                        </div>
                    ) : (
                        loans.map((loan, index) => (
                            <motion.div
                                key={loan.id ?? index}
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        x: -25,
                                        scale: 0.95,
                                        filter: "blur(4px)"
                                    },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                        scale: 1,
                                        filter: "blur(0px)",
                                        transition: {
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 28,
                                            mass: 0.6,
                                        },
                                    },
                                }}
                                className="relative cursor-pointer"
                                onMouseEnter={() => setHoveredLoan(loan.id ?? index)}
                                onMouseLeave={() => setHoveredLoan(null)}
                                onClick={() => openLoanModal(loan)}
                            >
                                <motion.div
                                    className="relative bg-muted/50 border border-border/50 rounded-xl p-4 overflow-hidden"
                                    whileHover={{
                                        y: -1,
                                        transition: { type: "spring", stiffness: 400, damping: 25 }
                                    }}
                                >
                                    {/* Status gradient overlay */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-l ${getStatusGradient(loan)} pointer-events-none`}
                                        style={{
                                            backgroundSize: "30% 100%",
                                            backgroundPosition: "right",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                    />

                                    {/* Grid Content */}
                                    <div className="relative grid grid-cols-12 gap-4 items-center">
                                        {/* Number */}
                                        <div className="col-span-1">
                                            <span className="text-2xl font-bold text-muted-foreground">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        {/* Book Title */}
                                        <div className="col-span-2 flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                            <span className="text-foreground font-medium truncate">
                                                {getBookTitle(loan.id || 0)}
                                            </span>
                                        </div>

                                        {/* Borrower Name */}
                                        <div className="col-span-2 flex items-center gap-2">
                                            <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                            <span className="text-foreground truncate">
                                                {loan.borrowerName}
                                            </span>
                                        </div>

                                        {/* Email */}
                                        <div className="col-span-2">
                                            <span className="text-foreground text-sm truncate block">
                                                {loan.borrowerEmail}
                                            </span>
                                        </div>

                                        {/* Loan Date */}
                                        <div className="col-span-2">
                                            <span className="text-foreground text-sm">
                                                {formatDate(loan.loanDate)}
                                            </span>
                                        </div>

                                        {/* Due Date */}
                                        <div className="col-span-2">
                                            <span className={`text-sm ${isOverdue(loan) && getLoanDisplayStatus(loan) !== "returned" ? "text-red-400 font-semibold" : "text-foreground"}`}>
                                                {formatDate(loan.dueDate)}
                                            </span>
                                        </div>

                                        {/* Status */}
                                        <div className="col-span-1">
                                            {getStatusBadge(loan)}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))
                    )}
                </motion.div>

                {/* Loan Detail Overlay - Inside Card */}
                <AnimatePresence>
                    {selectedLoan && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col rounded-2xl z-10 overflow-hidden"
                        >
                            {/* Header with Actions */}
                            <div className="relative bg-gradient-to-r from-muted/50 to-transparent p-4 border-b border-border/30 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="text-2xl font-bold text-muted-foreground">
                                        {String(loans.indexOf(selectedLoan) + 1).padStart(2, "0")}
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-foreground">
                                            {getBookTitle(selectedLoan?.id || 0)}
                                        </h3>
                                        <span className="text-sm text-muted-foreground">
                                            por {getBookAuthor(selectedLoan?.id || 0)}
                                        </span>
                                    </div>
                                </div>


                                {/* Action Buttons in Header */}
                                <div className="flex items-center gap-2">
                                    {/* Return Book */}
                                    {getLoanDisplayStatus(selectedLoan) !== "returned" && selectedLoan.id && (
                                        <motion.button
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-sm transition-colors"
                                            onClick={() => selectedLoan.id && handleReturn(selectedLoan.id)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <RotateCcw className="w-3 h-3" />
                                            Devolver Libro
                                        </motion.button>
                                    )}

                                    {/* Close Button */}
                                    <motion.button
                                        className="w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center border border-border/50 ml-2"
                                        onClick={closeLoanModal}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <X className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                                {/* Loan Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {/* Borrower Name */}
                                    <div className="bg-muted/40 rounded-lg p-3 border border-border/30">
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                            <User className="w-3 h-3" />
                                            Prestatario
                                        </label>
                                        <div className="text-sm font-medium mt-1">
                                            {selectedLoan.borrowerName}
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="bg-muted/40 rounded-lg p-3 border border-border/30">
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                            <Mail className="w-3 h-3" />
                                            Email
                                        </label>
                                        <div className="text-sm font-medium mt-1">
                                            {selectedLoan.borrowerEmail}
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="bg-muted/40 rounded-lg p-3 border border-border/30">
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            Estado
                                        </label>
                                        <div className="mt-1">
                                            {getStatusBadge(selectedLoan)}
                                        </div>
                                    </div>
                                </div>

                                {/* Dates Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {/* Loan Date */}
                                    <div className="bg-muted/40 rounded-lg p-3 border border-border/30">
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3" />
                                            Fecha de Préstamo
                                        </label>
                                        <div className="text-sm font-medium mt-1">
                                            {formatDate(selectedLoan.loanDate)}
                                        </div>
                                    </div>

                                    {/* Due Date */}
                                    <div className="bg-muted/40 rounded-lg p-3 border border-border/30">
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3" />
                                            Fecha Límite
                                        </label>
                                        <div className={`text-sm font-medium mt-1 ${isOverdue(selectedLoan) && getLoanDisplayStatus(selectedLoan) !== "returned" ? "text-red-400" : ""}`}>
                                            {formatDate(selectedLoan.dueDate)}
                                        </div>
                                    </div>

                                    {/* Return Date */}
                                    <div className="bg-muted/40 rounded-lg p-3 border border-border/30">
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3" />
                                            Fecha de Devolución
                                        </label>
                                        <div className="text-sm font-medium mt-1">
                                            {selectedLoan.returnDate ? formatDate(selectedLoan.returnDate) : "Pendiente"}
                                        </div>
                                    </div>
                                </div>

                                {/* Book Info */}
                                <div className="bg-muted/40 rounded-lg p-3 border border-border/30">
                                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                                        <BookOpen className="w-3 h-3" />
                                        Información del Libro
                                    </label>
                                    <div className="grid grid-cols-2 gap-3 mt-2">
                                        <div>
                                            <span className="text-xs text-muted-foreground">Título</span>
                                            <p className="text-sm font-medium">{getBookTitle(selectedLoan.id || 0)}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-muted-foreground">Autor</span>
                                            <p className="text-sm font-medium">{getBookAuthor(selectedLoan.id || 0)}</p>
                                        </div>
                                        {bookMap[selectedLoan.id || 0]?.isbn && (
                                            <div>
                                                <span className="text-xs text-muted-foreground">ISBN</span>
                                                <p className="text-sm font-mono font-medium">{bookMap[selectedLoan.id || 0]?.isbn}</p>
                                            </div>
                                        )}
                                        {bookMap[selectedLoan.id || 0]?.publicationYear && (
                                            <div>
                                                <span className="text-xs text-muted-foreground">Año de Publicación</span>
                                                <p className="text-sm font-medium">{bookMap[selectedLoan.id || 0]?.publicationYear}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default LoanManagementTable;