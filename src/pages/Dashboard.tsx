import StatCard from '../components/StatCard'
import RecentActivities from '../components/RecentActivities'
import QuickActions from '../components/QuickActions'
import PopularBooks from '../components/PopularBooks'
import { useEffect, useState } from 'react'
import { getBooks } from '../data/axiosBook'
import { BookStatus, type Book, type StatItem } from '../types'
import { sileo } from 'sileo'


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

export default function Dashboard() {

  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    sileo.promise(getBooks().then(data => setBooks(data)), {
      loading: { title: 'Cargando informacion...', duration: 4000 },
      success: { title: 'Informacion cargada', duration: 4000 },
      error: { title: 'Error al cargar la informacion', duration: 2000 }
    })
  }, [])

  return (
    <main className="flex-1 ml-0 lg:ml-72 h-screen overflow-y-auto p-6 lg:p-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h2>
            <p className="text-[#9da6b9] mt-1">Welcome back, here's what's happening at the library today.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1.5 text-slate-400">search</span>
              <input
                type="text"
                placeholder="Search catalog..."
                className="pl-10 pr-4 py-2.5 rounded-lg bg-[#1e232e] border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64 text-sm"
              />
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {statsData.map((stat) => (
            <StatCard key={stat.label} {...stat}
              value={stat.label === 'Total Books' ? books.length : stat.value &&
                stat.label === 'Active Loans' ? books.filter(book => book.status === BookStatus.BORROWED).length :
                stat.value &&
                  stat.label === 'Overdue Books' ? books.filter(book => book.status === BookStatus.RESERVED).length : stat.value}
            />
          ))}
        </div>

        {/* Activities & Quick Actions */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <RecentActivities />
          <QuickActions />
        </div>

        {/* Popular Books */}
        <PopularBooks books={books} />



      </div>
    </main>
  )
}
