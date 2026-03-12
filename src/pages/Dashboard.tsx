import StatCard from '../components/StatCard'
import RecentActivities from '../components/RecentActivities'
import QuickActions from '../components/QuickActions'
import PopularBooks from '../components/PopularBooks'
import { statsData } from '../data/dashboardData'
import { useEffect, useState } from 'react'
import { getBooks } from '../data/axiosBook'
import type { Book } from '../types'

export default function Dashboard() {

  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    getBooks().then(data => setBooks(data))
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
            <StatCard key={stat.label} {...stat} />
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
