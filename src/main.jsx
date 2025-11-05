import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { BrowserRouter, Route, Routes } from 'react-router'    // Core Routing Engine → Routes, Route, useParams
import { BrowserRouter, Route, Routes } from 'react-router-dom'   // Web-Specifc Version → react-router, BrowserRouter, Link, NavLink
import DetailView from './routes/DetailView.jsx'
import './index.css'
import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      {/* DashBoard → Main Page */}
      <Route path="/" element={<App />} />

      {/* Detail View for each Pokemon */}
      <Route path="/pokemon/:name" element={<DetailView />} />
    </Routes>
  </BrowserRouter>
)