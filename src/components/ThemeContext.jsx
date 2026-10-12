import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    // Al inicializar revisamos si el usuario guardó su preferencia en localStorage
    const savedTheme = localStorage.getItem('tema')
    if (savedTheme) {
      return savedTheme === 'oscuro'
    }
    // O si el sistema prefiere modo oscuro
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Sincronizamos la clase .dark-mode en el body como se enseñó en el TP1 y la teoría
    if (darkMode) {
      document.body.classList.add('dark-mode')
      localStorage.setItem('tema', 'oscuro')
    } else {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('tema', 'claro')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider')
  }
  return context
}
