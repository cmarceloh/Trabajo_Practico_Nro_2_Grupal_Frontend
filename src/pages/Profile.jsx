import React, { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import integrantesData from '../data/integrantes.json'
import './Profile.css'

export default function Profile() {
  const { id } = useParams()
  // Pestaña activa interactiva: 'biografia', 'habilidades', 'multimedia', 'contacto'
  const [activeTab, setActiveTab] = useState('habilidades')
  // Estado interactivo de mensaje de contacto enviado
  const [mensajeEnviado, setMensajeEnviado] = useState(false)
  const [textoMensaje, setTextoMensaje] = useState('')

  // Buscamos el integrante según el id en la URL
  const integrante = integrantesData.find((item) => item.id === id)

  if (!integrante) {
    return (
      <div className="profile-not-found animate-fade-in">
        <div className="not-found-card">
          <h2>Perfil no encontrado</h2>
          <p>El identificador "{id}" no corresponde a ningún integrante de Grupo 14.</p>
          <Link to="/" className="btn-primary">
            ← Volver a la Portada
          </Link>
        </div>
      </div>
    )
  }

  // Integrantes adyacentes para navegación cruzada
  const currentIndex = integrantesData.findIndex((item) => item.id === id)
  const prevIntegrante =
    integrantesData[(currentIndex - 1 + integrantesData.length) % integrantesData.length]
  const nextIntegrante =
    integrantesData[(currentIndex + 1) % integrantesData.length]

  const handleEnviarMensaje = (e) => {
    e.preventDefault()
    if (!textoMensaje.trim()) return
    setMensajeEnviado(true)
    setTimeout(() => {
      setTextoMensaje('')
      setMensajeEnviado(false)
    }, 4000)
  }

  return (
    <div className="profile-page-container animate-fade-in">
      {/* Barra de navegación de retorno e inter-perfiles */}
      <div className="profile-top-bar">
        <Link to="/" className="btn-secondary btn-back-home">
          ← Volver a la Portada
        </Link>
        <div className="profile-switch-links">
          <Link to={`/perfil/${prevIntegrante.id}`} className="switch-link">
            ‹ {prevIntegrante.nombre.split(' ')[0]}
          </Link>
          <span className="switch-sep">|</span>
          <Link to={`/perfil/${nextIntegrante.id}`} className="switch-link">
            {nextIntegrante.nombre.split(' ')[0]} ›
          </Link>
        </div>
      </div>

      <div className="profile-layout-grid">
        {/* Columna Izquierda: Tarjeta de identidad y datos principales */}
        <aside className="profile-sidebar-card">
          <div className="profile-avatar-container">
            <img
              src={integrante.avatar}
              alt={`Avatar de ${integrante.nombre}`}
              className="profile-avatar-large"
            />
          </div>

          <h1 className="profile-name">{integrante.nombre}</h1>
          <p className="profile-role-badge">{integrante.rol}</p>

          <div className="profile-meta-list">
            <div className="meta-row">
              <span className="meta-icon">📍</span>
              <span className="meta-val">{integrante.ubicacion}</span>
            </div>
            <div className="meta-row">
              <span className="meta-icon">🎂</span>
              <span className="meta-val">{integrante.edad} años</span>
            </div>
            <div className="meta-row">
              <span className="meta-icon">🎓</span>
              <span className="meta-val">IFTS 29 - Desarrollo de Software</span>
            </div>
          </div>

          <a
            href={integrante.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-github-profile"
          >
            <span>Visitar Perfil GitHub</span>
            <span className="github-user-tag">@{integrante.usuarioGithub}</span>
          </a>

          {/* Especialidades Clave */}
          <div className="profile-specialties">
            <h4 className="specialties-title">Especialidades</h4>
            <div className="specialties-tags">
              {integrante.especialidades.map((esp, i) => (
                <span key={i} className="badge badge-accent">
                  {esp}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Columna Derecha: Pestañas Interactivas Funcionales */}
        <div className="profile-content-area">
          {/* Navegador de Pestañas */}
          <div className="profile-tabs-header">
            <button
              className={`tab-btn ${activeTab === 'habilidades' ? 'tab-btn-active' : ''}`}
              onClick={() => setActiveTab('habilidades')}
            >
              🛠️ Habilidades & Tecnologías
            </button>
            <button
              className={`tab-btn ${activeTab === 'biografia' ? 'tab-btn-active' : ''}`}
              onClick={() => setActiveTab('biografia')}
            >
              📖 Biografía & Trayectoria
            </button>
            <button
              className={`tab-btn ${activeTab === 'multimedia' ? 'tab-btn-active' : ''}`}
              onClick={() => setActiveTab('multimedia')}
            >
              🎬 Favoritos Multimedia
            </button>
            <button
              className={`tab-btn ${activeTab === 'contacto' ? 'tab-btn-active' : ''}`}
              onClick={() => setActiveTab('contacto')}
            >
              💬 Contacto Profesional
            </button>
          </div>

          {/* Contenido de la pestaña HABILIDADES */}
          {activeTab === 'habilidades' && (
            <div className="tab-panel animate-fade-in">
              <div className="panel-box">
                <h3 className="panel-title">Stack Tecnológico & Competencias</h3>
                <p className="panel-desc">
                  Herramientas, lenguajes y metodologías dominadas por {integrante.nombre.split(' ')[0]}.
                </p>

                <div className="skills-grid-detailed">
                  {integrante.habilidades.map((hab, index) => (
                    <div key={index} className="skill-item-card">
                      <span className="skill-bullet">⚡</span>
                      <span className="skill-name">{hab}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel-box">
                <h3 className="panel-title">Aportes e Hitos en el Proyecto</h3>
                <ul className="milestones-list">
                  {integrante.hitos.map((hito, idx) => (
                    <li key={idx} className="milestone-item">
                      <span className="milestone-check">✓</span>
                      <span>{hito}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Contenido de la pestaña BIOGRAFÍA */}
          {activeTab === 'biografia' && (
            <div className="tab-panel animate-fade-in">
              <div className="panel-box">
                <h3 className="panel-title">Semblanza Profesional</h3>
                <div className="bio-quote">
                  <p>{integrante.biografia}</p>
                </div>

                <div className="bio-details-grid">
                  <div className="bio-detail-card">
                    <h4>Rol dentro de Grupo 14</h4>
                    <p>{integrante.rol}</p>
                  </div>
                  <div className="bio-detail-card">
                    <h4>Base de Operaciones</h4>
                    <p>{integrante.ubicacion}</p>
                  </div>
                  <div className="bio-detail-card">
                    <h4>Institución Académica</h4>
                    <p>IFTS 29 - Cuarto Cuatrimestre</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contenido de la pestaña MULTIMEDIA (Películas y Discos de TP1) */}
          {activeTab === 'multimedia' && (
            <div className="tab-panel animate-fade-in">
              <div className="panel-box">
                <h3 className="panel-title">🎬 Películas Favoritas</h3>
                <div className="media-showcase-grid">
                  {integrante.favoritos.peliculas.map((peli, idx) => (
                    <div key={idx} className="media-card">
                      <div className="media-poster-wrap">
                        <img
                          src={peli.img}
                          alt={peli.titulo}
                          className="media-poster-img"
                        />
                      </div>
                      <div className="media-info">
                        <span className="media-title">{peli.titulo}</span>
                        {peli.anio && <span className="media-year">{peli.anio}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel-box">
                <h3 className="panel-title">🎵 Discos & Álbumes Favoritos</h3>
                <div className="media-showcase-grid">
                  {integrante.favoritos.discos.map((disco, idx) => (
                    <div key={idx} className="media-card">
                      <div className="media-poster-wrap">
                        <img
                          src={disco.img}
                          alt={disco.titulo}
                          className="media-poster-img"
                        />
                      </div>
                      <div className="media-info">
                        <span className="media-title">{disco.titulo}</span>
                        {disco.anio && <span className="media-year">{disco.anio}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contenido de la pestaña CONTACTO (Interacción funcional directa) */}
          {activeTab === 'contacto' && (
            <div className="tab-panel animate-fade-in">
              <div className="panel-box">
                <h3 className="panel-title">Envío de Mensaje o Consulta</h3>
                <p className="panel-desc">
                  Contactá directamente a {integrante.nombre.split(' ')[0]} para coordinar desarrollos, soporte o revisiones de código.
                </p>

                {mensajeEnviado ? (
                  <div className="contact-success-alert">
                    <span className="success-icon">✓</span>
                    <div>
                      <h4>¡Mensaje transmitido con éxito!</h4>
                      <p>
                        Tu mensaje fue registrado en el buzón local de {integrante.nombre.split(' ')[0]}.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleEnviarMensaje} className="contact-form-profile">
                    <div className="form-group">
                      <label htmlFor="mensajeInput">Mensaje o propuesta técnica:</label>
                      <textarea
                        id="mensajeInput"
                        rows="4"
                        className="form-textarea"
                        placeholder={`Escribe una consulta para ${integrante.nombre.split(' ')[0]}...`}
                        value={textoMensaje}
                        onChange={(e) => setTextoMensaje(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn-primary">
                      Enviar Mensaje a {integrante.nombre.split(' ')[0]} 🚀
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
