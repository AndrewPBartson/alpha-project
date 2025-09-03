import './css/index.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { closeModal } from './features/auth/authSlice'
import useAuthListener from './features/auth/useAuthListener'
import Navbar from './components/Navbar'
import SignInModal from './components/SignInModal'

import ProjectsContainer from './pages/ProjectsContainer'
import JsonViewer from './pages/JsonViewer'

function App() {
  const dispatch = useDispatch()
  useAuthListener() // set user state
  const isModalOpen = useSelector((state) => state.auth.isModalOpen)

  return (
    <Router>
      <div className='App container'>
        <ToastContainer
          position='top-right'
          autoClose={2000}
          style={{ zIndex: 9999 }}
        />
        <Navbar />
        <Routes>
          <Route path='/' element={<ProjectsContainer />} />
          <Route path='/reader' element={<JsonViewer />} />
        </Routes>
      </div>
      {isModalOpen && <SignInModal onClose={() => dispatch(closeModal())} />}
    </Router>
  )
}

export default App
