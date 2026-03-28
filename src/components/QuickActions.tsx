import { useState } from "react"
import ModalForm from "./ModalForm"

interface ActionButton {
  label: string
  description: string
  icon: string
  primary?: boolean
}

const actions: ActionButton[] = [
  { label: 'Add New Book', description: 'Catalog a new arrival', icon: 'add_circle', primary: true },
  { label: 'Register Loan', description: 'Check out a book to a user', icon: 'qr_code_scanner' },
]

export default function QuickActions() {

  const [isOpen, setIsOpen] = useState(false)
  const [isLoan, setIsLoan] = useState(false)




  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold text-white">Quick Actions</h3>
      <div className="flex flex-col gap-3">
        {actions.map(({ label, description, icon, primary }) =>
          primary ? (
            <button
              onClick={() => {
                setIsLoan(false)
                setIsOpen(true)
              }}
              key={label}
              className="group flex items-center justify-between p-4 bg-[#1e232e] text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              <div className="flex flex-col items-start gap-1">
                <span className="font-bold text-sm">{label}</span>
                <span className="text-xs text-white/70 group-hover:text-white/90">{description}</span>
              </div>
              <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                <span className="material-symbols-outlined">{icon}</span>
              </div>
            </button>
          ) : (
            <button
              onClick={() => {
                setIsLoan(label === 'Register Loan' ? true : false)
                setIsOpen(true)
              }}
              key={label}
              className="group flex items-center justify-between p-4 bg-[#1e232e] border border-slate-800 rounded-xl hover:border-primary/50 transition-all"
            >
              <div className="flex flex-col items-start gap-1">
                <span className="font-bold text-sm text-white">{label}</span>
                <span className="text-xs text-[#9da6b9]">{description}</span>
              </div>
              <div className="bg-slate-800 p-2 rounded-lg text-slate-400 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">{icon}</span>
              </div>
            </button>
          )
        )}
      </div>
      {isOpen && (
        <ModalForm onClose={() => setIsOpen(false)} isLoan={isLoan} />
      )}
    </div>
  )
}
