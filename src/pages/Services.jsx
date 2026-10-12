import React, { useState, useMemo } from 'react'
import serviciosData from '../data/servicios_o_proyectos.json'
import './Services.css'

export default function Services() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [selectedTech, setSelectedTech] = useState('Todas')
  // Conjunto de IDs expandidos para ver detalles
  const [expandedCards, setExpandedCards] = useState({})

  // Extraemos las categorías y tecnologías únicas para los selectores
  const categories = useMemo(() => {
    const set = new Set(serviciosData.map((s) => s.categoria))
    return ['Todas', ...Array.from(set)]
  }, [])

  const technologies = useMemo(() => {
    const set = new Set(serviciosData.map((s) => s.tecnologia))
    return ['Todas', ...Array.from(set)]
  }, [])

  // Filtrado en tiempo real según término de búsqueda, categoría y tecnología
  const filteredServices = useMemo(() => {
    return serviciosData.filter((item) => {
      const matchSearch =
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descripcionCorta.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.detalles.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cliente.toLowerCase().includes(searchTerm.toLowerCase())

      const matchCategory =
        selectedCategory === 'Todas' || item.categoria === selectedCategory

      const matchTech =
        selectedTech === 'Todas' || item.tecnologia === selectedTech

      return matchSearch && matchCategory && matchTech
    })
  }, [searchTerm, selectedCategory, selectedTech])

  // Alternar el estado expandido de una tarjeta individual
  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Restablecer todos los filtros
  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('Todas')
    setSelectedTech('Todas')
  }

  return (
    <div className="services-container animate-fade-in">
      <div className="services-header">
        <div className="badge badge-accent">Catálogo Corporativo de Software</div>
        <h1 className="services-title">Servicios, Tecnologías & Proyectos</h1>
        <p className="services-desc">
          Explorá los <strong>22 registros detallados</strong> de proyectos y servicios desarrollados por el equipo de Grupo 14.
          Utilizá la barra de búsqueda en tiempo real o los filtros por categoría y tecnología para encontrar soluciones específicas.
        </p>
      </div>

      {/* Controles de Búsqueda y Filtros */}
      <div className="filter-panel">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por palabra clave, cliente o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
              title="Borrar texto"
            >
              ✕
            </button>
          )}
        </div>

        <div className="filter-selectors">
          <div className="selector-group">
            <label htmlFor="catSelect">Categoría:</label>
            <select
              id="catSelect"
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="selector-group">
            <label htmlFor="techSelect">Tecnología:</label>
            <select
              id="techSelect"
              className="filter-select"
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
            >
              {technologies.map((tech) => (
                <option key={tech} value={tech}>
                  {tech}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleResetFilters}
            className="btn-secondary btn-reset-filters"
            title="Restablecer todos los filtros"
          >
            🔄 Restablecer
          </button>
        </div>
      </div>

      {/* Indicador de contador de resultados */}
      <div className="results-counter">
        <span>Mostrando <strong>{filteredServices.length}</strong> de <strong>{serviciosData.length}</strong> registros totales</span>
        {(searchTerm || selectedCategory !== 'Todas' || selectedTech !== 'Todas') && (
          <span className="filter-active-tag">Filtros aplicados</span>
        )}
      </div>

      {/* Listado dinámico de Tarjetas */}
      {filteredServices.length > 0 ? (
        <div className="services-grid">
          {filteredServices.map((servicio) => {
            const isExpanded = !!expandedCards[servicio.id]

            return (
              <div
                key={servicio.id}
                className={`service-card ${isExpanded ? 'card-expanded' : ''}`}
              >
                <div className="card-top-row">
                  <span className="card-icon">{servicio.icono}</span>
                  <div className="card-badges">
                    <span className="card-cat-badge">{servicio.categoria}</span>
                    <span className="card-tech-badge">{servicio.tecnologia}</span>
                  </div>
                </div>

                <h3 className="card-title">{servicio.titulo}</h3>
                <p className="card-short-desc">{servicio.descripcionCorta}</p>

                <div className="card-meta-row">
                  <span><strong>Cliente:</strong> {servicio.cliente}</span>
                  <span><strong>Estado:</strong> {servicio.estado}</span>
                </div>

                {/* Panel expandible interactivo */}
                {isExpanded && (
                  <div className="card-details-drawer animate-fade-in">
                    <h4 className="details-heading">Detalles Técnicos & Implementación:</h4>
                    <p className="details-text">{servicio.detalles}</p>

                    <div className="details-extra">
                      <p><strong>Duración estimada:</strong> {servicio.duracion}</p>
                      <strong>Alcance del proyecto:</strong>
                      <ul className="details-scope-list">
                        {servicio.alcance.map((item, idx) => (
                          <li key={idx}>✓ {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="card-action-bar">
                  <button
                    onClick={() => toggleExpand(servicio.id)}
                    className="btn-secondary btn-toggle-expand"
                  >
                    {isExpanded ? '▲ Ocultar Detalles' : '▼ Ver Información Adicional'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Estado vacío con botón de restablecer (Criterio 11 - Propone) */
        <div className="empty-state-box animate-fade-in">
          <div className="empty-icon">🔍</div>
          <h3>No se encontraron resultados</h3>
          <p>
            No hay registros que coincidan con la búsqueda "{searchTerm}" o los filtros seleccionados.
          </p>
          <button onClick={handleResetFilters} className="btn-primary">
            Restablecer filtros y ver los 22 registros
          </button>
        </div>
      )}
    </div>
  )
}
