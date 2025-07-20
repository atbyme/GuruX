import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Ai from './pages/Ai'
import Dashboard from './pages/Dashboard'
import ReactPage from './pages/React'  // your component import with new name

const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/ai' element={<Ai />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/react' element={<ReactPage />} />
            </Routes>
        </div>
    )
}

export default App
