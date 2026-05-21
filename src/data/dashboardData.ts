import type { StatItem, BookItem } from "../types";




export const popularBooksData: BookItem[] = [
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    status: { label: 'All Copies Out', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
    loans: 42,

  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    status: { label: 'Available (2)', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
    loans: 38,

  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    status: { label: 'Reserved', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
    loans: 31,
  }
]
