import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import './MainLayout.css'

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="layout-root">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="layout-main">
        <Header onToggleSidebar={toggleSidebar} />

        <main className="layout-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  )
}
