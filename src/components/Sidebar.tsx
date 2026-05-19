
interface NavItem {
  icon: string
  label: string
  path: string
}

const navItems: NavItem[] = [
  { icon: 'dashboard', label: 'Dashboard', path: '/' },
  { icon: 'menu_book', label: 'Books', path: '/management-book' },
  { icon: 'book_online', label: 'Loans', path: '/management-loan' },
]


export default function Sidebar() {

  const currentPath = window.location.pathname

  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-slate-800 h-screen overflow-y-auto fixed left-0 top-0 bottom-0 z-50" style={{ backgroundColor: '#111318' }}>
      <div className="flex flex-col h-full p-4 justify-between">
        <div className="flex flex-col gap-8">
          {/* Branding */}
          <div className="flex gap-3 items-center px-2 pt-2">
            <div className="bg-primary/20 flex items-center justify-center rounded-lg size-10 text-primary">
              <span className="material-symbols-outlined" style={{ fontSize: 28 }}>local_library</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-lg font-bold leading-none">LibAdmin</h1>
              <p className="text-[#9da6b9] text-xs font-normal">Management System</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 ">
            {navItems.map(({ icon, label, path }) => {
              const isActive = currentPath === path
              return (
                <a
                  key={label}
                  href={path}
                  className={`active flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-[#9da6b9] hover:bg-[#1e232e]'
                    }`}
                >
                  <span className="material-symbols-outlined">{icon}</span>
                  <p className="text-sm font-medium leading-normal">{label}</p>
                </a>
              )
            }
            )}
          </nav>
        </div>
      </div>
    </aside>
  )
}
