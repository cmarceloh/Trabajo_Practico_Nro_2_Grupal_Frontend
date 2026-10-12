import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from './ThemeContext'
import './Header.css'

export default function Header({ onToggleSidebar }) {
  const { darkMode, toggleDarkMode } = useTheme()
  const location = useLocation()

  // Generamos un breadcrumb o título dinámico según la ruta
  const getPageTitle = (path) => {
    if (path === '/') return 'Inicio / Portada Corporativa'
    if (path === '/servicios') return 'Servicios & Proyectos'
    if (path === '/clima') return 'Sede Central & Telemetría Climática'
    if (path === '/arbol-componentes') return 'Árbol de Renderizado de Componentes'
    if (path === '/bitacora') return 'Bitácora de Desarrollo del Equipo'
    if (path.startsWith('/perfil/')) return 'Perfil Profesional del Integrante'
    return 'Grupo 14'
  }

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="header-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Alternar menú lateral"
        >
          <span className="menu-icon">☰</span>
        </button>
        <div className="header-breadcrumbs">
          <Link to="/" className="breadcrumb-root">Grupo 14</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{getPageTitle(location.pathname)}</span>
        </div>
      </div>

      <div className="header-right">
        <div className="header-badge">
          <span className="badge-dot"></span>
          <span>IFTS 29</span>
        </div>

        <button
          onClick={toggleDarkMode}
          className="header-theme-btn"
          aria-label="Alternar tema de color"
          title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}
