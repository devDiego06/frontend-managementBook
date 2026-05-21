export interface StatItem {
    label: string
    value: string
    icon: string
    iconBg: string
    iconColor: string
}

export interface Badge {
    label: string
    color: string
}


export enum BookStatus {
    AVAILABLE = 'AVAILABLE', // DISPONIBLE
    BORROWED = 'BORROWED',   // ACTUALMENTE PRESTADO
    RESERVED = 'RESERVED'    // RESERVADO
}

export interface BookItem {
    title: string
    author: string
    status: BookStatus
    loans: number
}

export type Stats = {
    totalBooks: number,
    availableBooks: number,
    borrowedBooks: number,
    activeLoans: number,
    overdueLoans: number
}


export interface Book {
    id?: number
    title: string
    author: string
    isbn: number
    publicationYear: number
    status?: BookStatus
    createdAt?: Date
}

export interface Loan {
    id?: number
    bookId?: number
    book?: Book
    borrowerName: string
    borrowerEmail: string
    loanDate?: Date
    dueDate?: Date
    status?: BookStatus
    returnDate?: Date
}