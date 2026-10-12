import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Services from './pages/Services'
import Weather from './pages/Weather'
import ComponentTree from './pages/ComponentTree'
import Bitacora from './pages/Bitacora'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Portada Corporativa del Grupo 14 */}
        <Route index element={<Home />} />

        {/* Perfil Reutilizable Dinámico por ID (:id) */}
        <Route path="perfil/:id" element={<Profile />} />

        {/* Catálogo de 22 Servicios y Proyectos locales JSON con filtros y búsqueda */}
        <Route path="servicios" element={<Services />} />

        {/* Sede Central y API Meteorológica Open-Meteo */}
        <Route path="clima" element={<Weather />} />

        {/* Árbol de Renderizado Dinámico de Componentes */}
        <Route path="arbol-componentes" element={<ComponentTree />} />

        {/* Bitácora Interactiva con historial TP1 y TP2 */}
        <Route path="bitacora" element={<Bitacora />} />

        {/* Redirección automática de rutas no encontradas a inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
