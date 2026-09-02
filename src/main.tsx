// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import Admin from './pages/Admin'

// Find the root element in index.html
const container = document.getElementById('root')

// Ensure the container exists before rendering
if (container) {
  const root = createRoot(container)

  if (window.location.href.includes('/admin')) {
    root.render(
      <StrictMode>
        <Admin />
      </StrictMode>,
    )
  } else {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  }
}

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     {window.location.href.includes('/admin') ? (
//       <div id='nc-root' key='admin-body' />
//     ) : (
//       <App />
//     )}
//   </StrictMode>
// )
