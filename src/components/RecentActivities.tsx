import { activitiesData } from '../data/dashboardData'

export default function RecentActivities() {
  return (
    <div className="xl:col-span-2 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Recent Activities</h3>
        <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">View All</a>
      </div>
      <div className="flex flex-col bg-[#1e232e] rounded-xl border border-slate-800 overflow-hidden">
        {activitiesData.map((item, index) => (
          <div
            key={index}
            className={`flex items-center p-4 gap-4 hover:bg-[#252b36] transition-colors ${index < activitiesData.length - 1 ? 'border-b border-slate-800' : ''
              }`}
          >
            <div className="size-10 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-slate-400" style={{ fontSize: 20 }}>
                {item.icon}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {item.text}{' '}
                {item.action && (
                  <span className="font-normal text-slate-400">{item.action} </span>
                )}
                <span className="font-normal text-slate-400">{item.name}</span>
              </p>
              <p className="text-xs text-[#9da6b9]">{item.time}</p>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.badge.color}`}>
              {item.badge.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
