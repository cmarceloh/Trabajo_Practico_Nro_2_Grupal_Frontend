import React, { useState, useMemo } from 'react'
import bitacoraData from '../data/bitacora.json'
import './Bitacora.css'

export default function Bitacora() {
  const [selectedEtapa, setSelectedEtapa] = useState('Todas')
  // Almacena qué IDs de acordeón se encuentran abiertos
  const [abiertos, setAbiertos] = useState({ 'bit-10': true, 'bit-05': true, 'bit-01': true })

  // Extraemos las etapas únicas
  const etapas = useMemo(() => {
    const list = new Set(bitacoraData.map((b) => b.etapa.split(' - ')[0]))
    return ['Todas', ...Array.from(list)]
  }, [])

  // Filtrado reactivo de las entradas
  const bitacoraFiltrada = useMemo(() => {
    if (selectedEtapa === 'Todas') return bitacoraData
    return bitacoraData.filter((b) => b.etapa.startsWith(selectedEtapa))
  }, [selectedEtapa])

  // Alternar apertura/cierre de un ítem individual
  const toggleAcordeon = (id) => {
    setAbiertos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Abrir o cerrar todos los acordeones
  const alternarTodos = (abrir) => {
    const nuevoEstado = {}
    bitacoraData.forEach((b) => {
      nuevoEstado[b.id] = abrir
    })
    setAbiertos(nuevoEstado)
  }

  return (
    <div className="bitacora-container animate-fade-in">
      <div className="bitacora-header">
        <div className="badge badge-accent">Criterio 14 — Historial & Trazabilidad</div>
        <h1 className="bitacora-title">Bitácora de Desarrollo del Equipo</h1>
        <p className="bitacora-desc">
          Registro cronológico y reflexivo de las decisiones arquitectónicas, desafíos técnicos y soluciones aplicadas
          por <strong>Grupo 14</strong> a lo largo de las entregas de <strong>TP1 y TP2</strong>.
        </p>
      </div>

      {/* Barra de Filtros y Control de Acordeón */}
      <div className="bitacora-controls-card">
        <div className="etapa-filter-group">
          <span className="filter-label">Filtrar por Etapa de Trabajo:</span>
          <div className="etapa-chips">
            {etapas.map((etapa) => (
              <button
                key={etapa}
                className={`chip-filter-btn ${selectedEtapa === etapa ? 'chip-active' : ''}`}
                onClick={() => setSelectedEtapa(etapa)}
              >
                {etapa === 'Todas' ? '📑 Todas las Entradas' : `📌 ${etapa}`}
              </button>
            ))}
          </div>
        </div>

        <div className="accordion-bulk-actions">
          <button onClick={() => alternarTodos(true)} className="btn-secondary btn-sm">
            ▼ Desplegar Todos
          </button>
          <button onClick={() => alternarTodos(false)} className="btn-secondary btn-sm">
            ▲ Plegar Todos
          </button>
        </div>
      </div>

      {/* Listado de Entradas con Acordeón Interactivo */}
      <div className="bitacora-timeline">
        {bitacoraFiltrada.map((item) => {
          const isOpen = !!abiertos[item.id]

          return (
            <article
              key={item.id}
              className={`timeline-entry-card ${isOpen ? 'entry-open' : ''}`}
            >
              <header
                className="entry-header-clickable"
                onClick={() => toggleAcordeon(item.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
              >
                <div className="entry-title-block">
                  <div className="entry-meta-top">
                    <span className="entry-badge-etapa">{item.etapa}</span>
                    <span className="entry-date">📅 {item.fecha}</span>
                    <span className="entry-author">✍️ {item.autor}</span>
                  </div>
                  <h3 className="entry-title">{item.titulo}</h3>
                  <p className="entry-summary">{item.resumen}</p>
                </div>

                <div className="entry-toggle-indicator">
                  <span className="toggle-symbol">{isOpen ? '▲' : '▼'}</span>
                </div>
              </header>

              {isOpen && (
                <div className="entry-body-drawer animate-fade-in">
                  <div className="entry-content-box">
                    <h4 className="box-subtitle">Descripción del Hito & Solución Técnica:</h4>
                    <p className="entry-full-text">{item.contenido}</p>
                  </div>

                  <div className="entry-learnings-box">
                    <h4 className="box-subtitle">Aprendizajes Clave:</h4>
                    <div className="learnings-tags">
                      {item.aprendizajes.map((apr, i) => (
                        <span key={i} className="learning-tag">
                          💡 {apr}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
