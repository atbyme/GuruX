import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Ai from './pages/Ai'
import Dashboard from './pages/Dashboard'
import ReactPage from './pages/React'
import SparkHub from './pages/Sparkhub'; // ✅ Use same name as component


const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/ai' element={<Ai />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/react' element={<ReactPage />} />
                <Route path='/sparkhub' element={<SparkHub />} />


            </Routes>
        </div>
    )
}

export default App
