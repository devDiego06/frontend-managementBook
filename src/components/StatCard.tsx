import type { StatItem } from '../data/dashboardData'

type Props = StatItem

export default function StatCard({ label, value, icon, iconBg, iconColor }: Props) {
  return (
    <div className="flex flex-col gap-1 rounded-xl p-5 bg-[#1e232e] border border-slate-800 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-[#9da6b9] text-sm font-medium">{label}</p>
        <div className={`${iconBg} p-2 rounded-lg ${iconColor}`}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{icon}</span>
        </div>
      </div>
      <div className="flex items-baseline gap-2 mt-2">
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}
