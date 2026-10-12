import React, { useState, useEffect, useCallback } from 'react'
import { fetchClimaSedeCentral } from '../services/weatherService'
import './Weather.css'

export default function Weather() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null)

  // Función controlada para cargar o reintentar los datos climáticos
  const loadWeatherData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchClimaSedeCentral()
      setData(result)
      setUltimaActualizacion(new Date())
    } catch (err) {
      setError(err.message || 'Error desconocido al intentar obtener el reporte del clima.')
    } finally {
      setLoading(false)
    }
  }, [])

  // useEffect se dispara en el montaje inicial del componente (Criterio 12)
  useEffect(() => {
    loadWeatherData()
  }, [loadWeatherData])

  return (
    <div className="weather-container animate-fade-in">
      <div className="weather-header">
        <div className="badge badge-accent">API Pública & Telemetría Edilicia</div>
        <h1 className="weather-title">Sede Central & Reporte Climático en Vivo</h1>
        <p className="weather-desc">
          En esta sección se simula el centro de operaciones físico de <strong>Grupo 14</strong>,
          ubicado estratégicamente en la <strong>Ciudad Autónoma de Buenos Aires (CABA)</strong>.
        </p>
      </div>

      {/* Tarjeta explicativa de la API (Criterio 12) */}
      <div className="api-info-card">
        <div className="api-info-header">
          <span className="api-icon">🌐</span>
          <div>
            <h3>¿Qué aporta esta API a la aplicación?</h3>
            <p className="api-url-info">
              Consumida directamente desde <code>Open-Meteo API</code> (sin clave privada / CORS abierto).
            </p>
          </div>
        </div>
        <p className="api-explanation">
          Proporciona <strong>telemetría ambiental y reporte meteorológico en tiempo real</strong> para
          monitorear las condiciones climáticas de nuestra sede central (temperatura real, sensación térmica,
          humedad relativa, velocidad de los vientos y condición del cielo mediante códigos WMO normalizados).
          Permite evaluar la viabilidad de operaciones en terreno, protocolos de confort térmico y eficiencia energética en servidores locales.
        </p>
      </div>

      {/* ESTADO 1: CARGANDO (Spinner y mensaje controlado) */}
      {loading && (
        <div className="weather-state-card weather-loading-state">
          <div className="weather-spinner"></div>
          <h3>Consultando satélites meteorológicos en tiempo real...</h3>
          <p>Conectando con la API de Open-Meteo para las coordenadas de CABA (-34.6037, -58.3816)</p>
        </div>
      )}

      {/* ESTADO 2: ERROR (Mensaje controlado con botón de reintento - Criterio 12) */}
      {!loading && error && (
        <div className="weather-state-card weather-error-state">
          <div className="error-icon">⚠️</div>
          <h3>Fallo en la comunicación con el servicio de clima</h3>
          <p className="error-message-text">{error}</p>
          <div className="error-actions">
            <button onClick={loadWeatherData} className="btn-primary btn-retry">
              🔄 Reintentar Consulta Ahora
            </button>
          </div>
        </div>
      )}

      {/* ESTADO 3: ÉXITO (Renderizado de métricas y datos climáticos - Nivel Propone) */}
      {!loading && !error && data && (
        <div className="weather-dashboard animate-fade-in">
          {/* Tarjeta Principal del Clima */}
          <div className="weather-hero-card">
            <div className="weather-hero-top">
              <div className="location-info">
                <span className="location-tag">📍 Sede Central Grupo 14</span>
                <h2 className="location-name">Ciudad Autónoma de Buenos Aires</h2>
                <span className="location-coords">
                  Lat: {data.latitud}° | Long: {data.longitud}° | Alt: {data.elevacion}m
                </span>
              </div>
              <div className="weather-sky-badge">
                <span className="sky-icon">{data.iconoClima}</span>
                <span className="sky-condition">{data.descripcionClima}</span>
              </div>
            </div>

            <div className="weather-hero-main">
              <div className="temp-display">
                <span className="temp-number">{Math.round(data.temperatura)}</span>
                <span className="temp-unit">°C</span>
              </div>
              <div className="temp-details">
                <div className="detail-item">
                  <span className="detail-label">Sensación Térmica:</span>
                  <span className="detail-value">{Math.round(data.sensacionTermica)}°C</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Período:</span>
                  <span className="detail-value">{data.esDeDia ? '☀️ Diurno' : '🌙 Nocturno'}</span>
                </div>
              </div>
            </div>

            <div className="weather-metrics-grid">
              <div className="weather-metric-card">
                <span className="m-icon">💧</span>
                <div className="m-info">
                  <span className="m-label">Humedad Relativa</span>
                  <span className="m-val">{data.humedad}%</span>
                </div>
              </div>

              <div className="weather-metric-card">
                <span className="m-icon">💨</span>
                <div className="m-info">
                  <span className="m-label">Velocidad del Viento</span>
                  <span className="m-val">{data.velocidadViento} km/h</span>
                </div>
              </div>

              <div className="weather-metric-card">
                <span className="m-icon">⏱️</span>
                <div className="m-info">
                  <span className="m-label">Zona Horaria</span>
                  <span className="m-val">{data.zonaHoraria}</span>
                </div>
              </div>

              <div className="weather-metric-card">
                <span className="m-icon">🟢</span>
                <div className="m-info">
                  <span className="m-label">Estado de la Sede</span>
                  <span className="m-val text-success">Operativa 100%</span>
                </div>
              </div>
            </div>

            <div className="weather-footer-action">
              <span className="update-timestamp">
                Última sincronización satelital:{' '}
                {ultimaActualizacion ? ultimaActualizacion.toLocaleTimeString('es-AR') : '--:--'}
              </span>
              <button onClick={loadWeatherData} className="btn-primary btn-refresh">
                🔄 Actualizar datos climáticos (En Vivo)
              </button>
            </div>
          </div>

          {/* Información de la Sede Física de la Consultora */}
          <div className="hq-details-grid">
            <div className="hq-card">
              <h3>🏢 Instalaciones & Oficinas</h3>
              <p>
                Nuestra base operativa cuenta con laboratorios de pruebas de software,
                servidores de desarrollo continuo y salas de reuniones equipadas para
                videoconferencias remotas de alta definición.
              </p>
              <ul className="hq-list">
                <li>✓ Centro de cómputos con refrigeración redundante</li>
                <li>✓ Conectividad de fibra óptica dedicada simétrica</li>
                <li>✓ Espacios ergonómicos para trabajo colaborativo</li>
              </ul>
            </div>

            <div className="hq-card">
              <h3>🛡️ Protocolo Climático y Seguridad</h3>
              <p>
                En base a los datos obtenidos por la API pública, los sistemas edilicios
                regulan de forma automatizada las cargas de aire acondicionado y
                disparan alertas preventivas ante ráfagas de viento mayores a 50 km/h o tormentas eléctricas.
              </p>
              <ul className="hq-list">
                <li>✓ Ajuste automatizado de climatizadores según temperatura externa</li>
                <li>✓ Protección contra picos de tensión y descargas atmosféricas</li>
                <li>✓ Continuidad operativa garantizada mediante SAI/UPS</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
