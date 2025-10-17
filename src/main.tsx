import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MindMapDemo from './pages/MindMapDemo'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/mindmap-demo" element={<MindMapDemo />} />
        <Route path="/" element={<Navigate to="/mindmap-demo" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
