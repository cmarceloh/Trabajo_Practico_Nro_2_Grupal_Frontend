import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-col">
          <div className="footer-brand">
            <span className="footer-logo-badge">G14</span>
            <span className="footer-logo-title">Grupo 14 — Desarrollo de Sistemas</span>
          </div>
          <p className="footer-desc">
            Soluciones digitales escalables, diseño centrado en el usuario e ingeniería web con estándares modernos de la industria.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Secciones Rápidas</h4>
          <ul className="footer-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/servicios">Servicios & Proyectos</Link></li>
            <li><Link to="/clima">Sede Central & Clima</Link></li>
            <li><Link to="/arbol-componentes">Árbol de Componentes</Link></li>
            <li><Link to="/bitacora">Bitácora de Desarrollo</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Marco Académico</h4>
          <p className="footer-text"><strong>Institución:</strong> IFTS 29</p>
          <p className="footer-text"><strong>Carrera:</strong> Tecnicatura Superior en Desarrollo de Software</p>
          <p className="footer-text"><strong>Materia:</strong> Desarrollo Frontend | TP2 React 2026</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Grupo 14. Todos los derechos reservados. Desarrollado con Vite, React y React Router v6.</p>
      </div>
    </footer>
  )
}
