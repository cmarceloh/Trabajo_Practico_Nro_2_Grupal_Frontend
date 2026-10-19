import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import integrantesData from '../data/integrantes.json'
import './Home.css'

export default function Home() {
  const [integranteDestacado, setIntegranteDestacado] = useState(null)

  const metricas = [
    { valor: '4', etiqueta: 'Integrantes Especialistas', icono: '👥' },
    { valor: '22', etiqueta: 'Proyectos & Soluciones', icono: '📦' },
    { valor: '100%', etiqueta: 'React SPA & Modular', icono: '⚛️' },
    { valor: 'CABA', etiqueta: 'Sede Central Operativa', icono: '📍' },
  ]

  return (
    <div className="home-container animate-fade-in">
      {/* Sección Hero fiel al TP1 y extendida para TP2 */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-tag-dot"></span>
            <span>Consultora Tecnológica de Software</span>
          </div>

          <h1 className="hero-title">
            Desarrollo de <span className="highlight-text">Sistemas Web</span>
          </h1>

          <p className="hero-description">
            Construimos soluciones digitales eficientes, escalables y accesibles a través
            del trabajo colaborativo. Aplicamos las mejores prácticas de arquitectura modular,
            diseño responsivo y desarrollo Frontend en React para crear experiencias web de alta calidad.
          </p>

          <div className="hero-actions">
            <Link to="/servicios" className="btn-primary">
              Explorar 22 Servicios & Proyectos →
            </Link>
            <Link to="/clima" className="btn-secondary">
              Ver Sede Central & Clima
            </Link>
          </div>

          <div className="hero-metrics">
            {metricas.map((m, idx) => (
              <div key={idx} className="metric-item">
                <span className="metric-val">{m.valor}</span>
                <span className="metric-lbl">{m.etiqueta}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src="/img/hero-imagen.png"
            alt="Ilustración corporativa de desarrollo web de Grupo 14"
            className="hero-img-element"
          />
        </div>
      </section>

      {/* Grilla interactiva de Integrantes con tarjetas interactivas */}
      <section className="team-section">
        <div className="section-header">
          <span className="section-badge">Equipo Profesional</span>
          <h2 className="section-title">Conocé a los integrantes de nuestro equipo</h2>
          <p className="section-subtitle">
            Hacé clic en cualquier tarjeta para explorar el perfil detallado, trayectoria, habilidades y medios favoritos de cada miembro.
          </p>
        </div>

        <div className="team-grid">
          {integrantesData.map((integrante) => {
            const isHovered = integranteDestacado === integrante.id
            return (
              <div
                key={integrante.id}
                className={`team-card ${isHovered ? 'team-card-active' : ''}`}
                onMouseEnter={() => setIntegranteDestacado(integrante.id)}
                onMouseLeave={() => setIntegranteDestacado(null)}
              >
                <div className="team-card-banner">
                  <span className="member-loc">📍 {integrante.ubicacion.split(',')[0]}</span>
                  <span className="member-age">{integrante.edad} años</span>
                </div>

                <div className="team-avatar-box">
                  <img
                    src={integrante.avatar}
                    alt={`Fotografía de ${integrante.nombre}`}
                    className="team-avatar-img"
                  />
                  <span className="avatar-status-badge">✓</span>
                </div>

                <div className="team-card-body">
                  <h3 className="team-member-name">{integrante.nombre}</h3>
                  <p className="team-member-role">{integrante.rol}</p>

                  <div className="team-skills-chips">
                    {integrante.habilidades.slice(0, 3).map((hab, i) => (
                      <span key={i} className="chip">
                        {hab}
                      </span>
                    ))}
                    {integrante.habilidades.length > 3 && (
                      <span className="chip chip-more">
                        +{integrante.habilidades.length - 3}
                      </span>
                    )}
                  </div>

                  <p className="team-member-bio">
                    {integrante.biografia.slice(0, 105)}...
                  </p>

                  <div className="team-card-footer">
                    <Link
                      to={`/perfil/${integrante.id}`}
                      className="btn-primary btn-profile-action"
                    >
                      Ver Perfil Completo →
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Tarjeta de Acceso Rápido a Secciones Clave */}
      <section className="quick-access-section">
        <div className="quick-card">
          <div className="quick-icon">📊</div>
          <h3>Catálogo de Servicios</h3>
          <p>Explorá 22 soluciones tecnológicas con buscador en tiempo real y filtros por tecnología.</p>
          <Link to="/servicios" className="btn-secondary">Ir al Catálogo</Link>
        </div>

        <div className="quick-card">
          <div className="quick-icon">🌤️</div>
          <h3>Sede Central CABA</h3>
          <p>Telemetría climática en vivo consumiendo la API de Open-Meteo con reintentos y estados.</p>
          <Link to="/clima" className="btn-secondary">Ver Clima en Vivo</Link>
        </div>

        <div className="quick-card">
          <div className="quick-icon">🌳</div>
          <h3>Arquitectura React</h3>
          <p>Árbol de renderizado interactivo que demuestra la jerarquía de componentes del TP2.</p>
          <Link to="/arbol-componentes" className="btn-secondary">Explorar Árbol</Link>
        </div>

        <div className="quick-card">
          <div className="quick-icon">📓</div>
          <h3>Bitácora de Desarrollo</h3>
          <p>Registro histórico actualizado de decisiones técnicas, dificultades y soluciones.</p>
          <Link to="/bitacora" className="btn-secondary">Leer Bitácora</Link>
        </div>
      </section>
    </div>
  )
}
