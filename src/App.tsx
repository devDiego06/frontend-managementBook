import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import ManagementBook from './pages/ManagementBook'
import { sileo, Toaster } from 'sileo';
import ManagementLoan from './pages/ManagementLoan';


export default function App() {


  return (
    <div className="font-display min-h-screen flex overflow-hidden" style={{ backgroundColor: '#101622', color: '#e2e8f0' }}>

      <BrowserRouter>
        <Toaster position='top-right' />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/management-book" element={<ManagementBook />} />
          <Route path='/management-loan' element={<ManagementLoan />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}
