import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from './ThemeContext'
import integrantesData from '../data/integrantes.json'
import './Sidebar.css'

export default function Sidebar({ isOpen, onClose }) {
  const { darkMode, toggleDarkMode } = useTheme()

  const navItems = [
    { to: '/', label: 'Inicio', icon: '🏢' },
    { to: '/servicios', label: 'Servicios & Proyectos', icon: '📂' },
    { to: '/clima', label: 'Sede Central & Clima', icon: '🌤️' },
    { to: '/arbol-componentes', label: 'Árbol de Renderizado', icon: '🌳' },
    { to: '/bitacora', label: 'Bitácora de Desarrollo', icon: '📓' },
  ]

  return (
    <>
      {/* Fondo oscuro para móvil al abrir la sidebar */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />}

      <aside className={`app-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <NavLink to="/" onClick={onClose} className="sidebar-logo">
            <span className="logo-badge">G14</span>
            <div className="logo-text">
              <span className="logo-main">Grupo 14</span>
              <span className="logo-sub">Desarrollo de Sistemas</span>
            </div>
          </NavLink>
          <button
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Navegación Principal</div>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.to} className="nav-item">
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-section-title">Perfiles del Equipo</div>
          <ul className="nav-list team-nav-list">
            {integrantesData.map((integrante) => (
              <li key={integrante.id} className="nav-item">
                <NavLink
                  to={`/perfil/${integrante.id}`}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `nav-link team-link ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  <img
                    src={integrante.avatar}
                    alt={integrante.nombre}
                    className="nav-avatar"
                  />
                  <div className="team-link-info">
                    <span className="team-link-name">{integrante.nombre.split(' ')[0]}</span>
                    <span className="team-link-role">{integrante.rol.split('&')[0]}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="theme-toggle-container">
            <span className="theme-label">
              {darkMode ? 'Modo Oscuro' : 'Modo Claro'}
            </span>
            <button
              onClick={toggleDarkMode}
              className="btn-theme-toggle"
              aria-label="Cambiar tema visual"
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <div className="sidebar-meta">
            <span>IFTS 29 | Frontend 2026</span>
          </div>
        </div>
      </aside>
    </>
  )
}
