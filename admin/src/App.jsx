import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import Add from './pages/Add/Add'
import List from './pages/List/List' 
import Orders from './pages/Orders/Orders'
import LoginPage from './pages/LoginPage/LoginPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route 
          path='/*' 
          element={
            <AdminProtectedRoute>
              <div>
                <Navbar />
                <hr />
                <div className='app-content'>
                  <Sidebar />
                  <Routes>
                    <Route path='/' element={<Navigate to="/add" />} />
                    <Route path='/add' element={<Add />} />
                    <Route path='/list' element={<List />} />
                    <Route path='/orders' element={<Orders />} />
                  </Routes>
                </div>
              </div>
            </AdminProtectedRoute>
          } 
        />
      </Routes>
    </div>
  )
}

export default App
