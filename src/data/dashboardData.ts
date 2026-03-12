import type { StatItem, ActivityItem, BookItem } from "../types";

export const statsData: StatItem[] = [
  {
    label: 'Total Books',
    value: '12,450',
    icon: 'library_books',
    iconBg: 'bg-blue-50 bg-blue-900/20',
    iconColor: 'text-primary',
  },
  {
    label: 'Active Loans',
    value: '342',
    icon: 'assignment_return',
    iconBg: 'bg-purple-50 bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    label: 'Overdue Books',
    value: '15',
    icon: 'warning',
    iconBg: 'bg-orange-50 bg-orange-900/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
]

export const activitiesData: ActivityItem[] = [
  {
    icon: 'keyboard_return',
    text: 'The Great Gatsby',
    action: 'returned by',
    name: 'John Doe',
    time: 'Today, 10:23 AM',
    badge: { label: 'Returned', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  },
  {
    icon: 'outbound',
    text: 'Design Systems',
    action: 'borrowed by',
    name: 'Sarah Smith',
    time: 'Today, 09:15 AM',
    badge: { label: 'Loaned', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
  },
  {
    icon: 'person_add',
    text: 'New member registration:',
    action: '',
    name: 'Michael Chen',
    time: 'Yesterday, 4:45 PM',
    badge: { label: 'New User', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
  },
  {
    icon: 'warning',
    text: '1984',
    action: 'marked as overdue for',
    name: 'Alex Johnson',
    time: 'Yesterday, 2:00 PM',
    badge: { label: 'Overdue', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
  },
]

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
