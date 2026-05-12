import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main/global.css'
import Layout from './main/layout.tsx'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element "#root" was not found.')
}

createRoot(rootElement).render(
  <StrictMode>
    <Layout />
  </StrictMode>,
)
