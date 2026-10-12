# TP2 — Proyecto React en Equipo | Grupo 14

**Materia:** Frontend — IFTS 29  
**Carrera:** Tecnicatura Superior en Desarrollo de Software  
**Cuatrimestre:** 2do Cuatrimestre 2026  
**Comisión / Grupo:** Grupo 14 — Desarrollo de Sistemas  

> Aplicación web Single Page Application (SPA) desarrollada con React, Vite y React Router v6. Representa la evolución y migración del TP1 a una arquitectura modular orientada a componentes, incorporando consumo de APIs públicas, catálogo de datos locales con filtrado en tiempo real, árbol de renderizado interactivo y bitácora ampliada.

🔗 **Sitio web publicado en Vercel:** [https://tp2-front-ifts29-grupo-14.vercel.app/](https://tp2-front-ifts29-grupo-14.vercel.app/)  
📦 **Repositorio GitHub:** [https://github.com/cmarceloh/Trabajo_Practico_Nro_2_Grupal_Frontend](https://github.com/cmarceloh/Trabajo_Practico_Nro_2_Grupal_Frontend)

---

## 📑 Índice de Contenidos

- [TP2 — Proyecto React en Equipo | Grupo 14](#tp2--proyecto-react-en-equipo--grupo-14)
  - [📑 Índice de Contenidos](#-índice-de-contenidos)
  - [👥 Integrantes del Equipo y Responsabilidades](#-integrantes-del-equipo-y-responsabilidades)
  - [🎯 Descripción y Objetivos del Proyecto](#-descripción-y-objetivos-del-proyecto)
  - [🚀 Funcionalidades y Criterios Cumplidos (Nivel Propone / Supera)](#-funcionalidades-y-criterios-cumplidos-nivel-propone--supera)
  - [🛠️ Tecnologías y Librerías Utilizadas](#️-tecnologías-y-librerías-utilizadas)
  - [🎨 Identidad Visual y Diseño](#-identidad-visual-y-diseño)
  - [🌳 Arquitectura y Estructura del Proyecto](#-arquitectura-y-estructura-del-proyecto)
  - [🤖 Declaración Formal de Uso de Inteligencia Artificial (Criterio 15)](#-declaración-formal-de-uso-de-inteligencia-artificial-criterio-15)
  - [💻 Guía de Instalación y Ejecución Local](#-guía-de-instalación-y-ejecución-local)
  - [☁️ Despliegue en Vercel](#️-despliegue-en-vercel)
  - [📝 Licencia y Marco Académico](#-licencia-y-marco-académico)

---

## 👥 Integrantes del Equipo y Responsabilidades

| Integrante | Rol en el Proyecto | Perfil GitHub | Responsabilidades Principales |
| :--- | :--- | :--- | :--- |
| **Carlos Marcelo Hernandez** | Desarrollador Full Stack / Líder Técnico | [@cmarceloh](https://github.com/cmarceloh) | Configuración de Vite, arquitectura base de componentes, enrutamiento con React Router v6 y maquetación del árbol de renderizado dinámico. |
| **Valeria Noemi Fernandez** | Diseñadora UI/UX / Frontend | [@Valuchi81](https://github.com/Valuchi81) | Migración del sistema de diseño del TP1 a CSS modular, maquetación responsiva de Sidebar, Header y propuesta estética integral para perfiles. |
| **Micaela Laila Gargiulo** | Desarrolladora Frontend / Lógica de Estado | [@MicaelaGargiulo](https://github.com/MicaelaGargiulo) | Estructuración del catálogo de 22 servicios JSON, implementación de búsqueda en tiempo real, filtros reactivos (`useMemo`) y acordeones expandibles. |
| **Damaris Rodriguez** | QA Engineer / Desarrolladora Backend | [@damrodriguezz](https://github.com/damrodriguezz) | Integración del servicio de clima con la API de Open-Meteo, manejo riguroso de estados (carga/error/éxito), recarga interactiva y bitácora interactiva. |

---

## 🎯 Descripción y Objetivos del Proyecto

El proyecto **TP2: Proyecto React en Equipo** consiste en la evolución del portal corporativo de **"Grupo 14 - Desarrollo de Sistemas"**, migrando la solución original construida en HTML5, CSS3 y JS vainilla hacia el ecosistema moderno de **React 18** impulsado por el empaquetador **Vite**.

### Objetivos Clave:
1. **Componentización y Reutilización:** Sustituir páginas HTML aisladas por componentes reutilizables mediante paso de *props* y rutas parametrizadas.
2. **Navegación Fluida (SPA):** Implementar navegación sin recargas mediante `react-router-dom` v6, manteniendo una experiencia cerrada y accesible donde ninguna pantalla exija el botón "Atrás" del navegador.
3. **Persistencia y Modos Duales:** Preservar la identidad de Grupo 14 con su paleta de colores corporativa (tonos grafito y acentos en verde azulado/teal) y un modo oscuro persistente en `localStorage` sincronizado con React Context.
4. **Interactividad Dinámica:** Permitir la exploración de 22 servicios locales, telemetría ambiental en tiempo real y el análisis visual de la arquitectura de la aplicación.

---

## 🚀 Funcionalidades y Criterios Cumplidos (Nivel Propone / Supera)

- **Criterio 01 y 06 — Repositorio, Publicación y Navegación Completa:** Repositorio público, deploy en Vercel con archivo `vercel.json` configurado con reglas de reescritura (`rewrites`) para recargar cualquier URL profunda sin error 404.
- **Criterio 04 y 05 — Sidebar Compartida y Menú Responsive:** Menú lateral unificado con `NavLink` (marcado visual activo), branding de la consultora, lista directa a perfiles y botón colapsable tipo hamburguesa para dispositivos móviles.
- **Criterio 07 y 08 — Portada y Perfiles Dinámicos Reutilizables:** Portada corporativa con métricas y tarjetas interactivas. Componente `Profile.jsx` dinámico para los 4 integrantes (`/perfil/:id`) con pestañas funcionales (habilidades, biografía, películas/discos favoritos y formulario de contacto).
- **Criterio 10 y 11 — Datos Locales JSON con Búsqueda y Filtros:** Archivo `servicios_o_proyectos.json` con **22 registros detallados**. Incluye búsqueda en tiempo real, filtros por categoría y tecnología, tarjetas expandibles/contraíbles, estado vacío y botón para restablecer filtros.
- **Criterio 12 — API Pública y Sede Central (Open-Meteo):** Sección "Sede Central & Clima" para CABA. Implementa los 3 estados: **Cargando** (spinner indicador), **Error** (mensaje explicativo con reintento) y **Éxito** (tarjeta con temperatura, sensación térmica, humedad, viento y estado WMO traducido). Botón interactivo *"Actualizar datos climáticos"* para refrescar la consulta.
- **Criterio 13 — Árbol de Renderizado Dinámico:** Esquema interactivo que refleja fielmente la jerarquía real de componentes en ejecución (`App -> MainLayout -> Sidebar / Header -> Outlet -> Pages -> Cards`). Permite colapsar y expandir ramas mediante clic y cuenta con inspector de props y hooks en vivo.
- **Criterio 14 — Bitácora Interactiva:** Historial de 10 entradas (4 de TP1 y 6 de TP2) estructuradas en acordeones desplegables con filtros por etapa de trabajo.
- **Criterio 09 — Propuesta Estética Integral ("Supera"):** Coherencia gráfica completa basada en el TP1, reutilización de fotos y recursos multimedia originales, microinteracciones, contrastes certificados y variables CSS nativas.

---

## 🛠️ Tecnologías y Librerías Utilizadas

| Herramienta / Tecnología | Versión | Uso en el Proyecto |
| :--- | :--- | :--- |
| **React** | `^18.3.1` | Librería principal de UI y gestión de componentes declarativos. |
| **React DOM** | `^18.3.1` | Renderizado sobre el árbol DOM virtual y montaje en `index.html`. |
| **React Router DOM** | `^6.23.1` | Enrutamiento SPA, rutas dinámicas (`/perfil/:id`), `NavLink` y `Outlet`. |
| **Vite** | `^5.2.11` | Entorno de desarrollo rápido y empaquetador con ESM nativo. |
| **Open-Meteo API** | v1 REST | API pública meteorológica consumida mediante Fetch sin clave privada. |
| **CSS3 Custom Properties** | - | Sistema de diseño de variables para modo claro y modo oscuro. |
| **Google Fonts (Inter)** | CDN | Tipografía corporativa en pesos 300, 400, 500, 600 y 700. |
| **Vercel** | - | Plataforma de alojamiento cloud con integración continua. |

---

## 🎨 Identidad Visual y Diseño

El proyecto respeta y expande la paleta cromática original establecida en el TP1:

| Variable CSS | Modo Claro | Modo Oscuro | Uso Semántico |
| :--- | :--- | :--- | :--- |
| `--bg` | `#f4f3ef` | `#111513` | Fondo principal de la aplicación |
| `--surface` | `#ffffff` | `#191d1b` | Fondos de tarjetas, paneles y contenedores |
| `--surface-2` | `#ecebe6` | `#222824` | Fondos secundarios y botones de acción |
| `--text` | `#202321` | `#f0f0ea` | Tipografía principal de lectura |
| `--muted` | `#70746f` | `#a5aaa6` | Textos secundarios y metadatos |
| `--accent` | `#168276` | `#43b8aa` | Color de acento corporativo (Verde azulado / Teal) |
| `--nav` | `#202522` | `#0b0e0d` | Barra lateral y pie de página |

---

## 🌳 Arquitectura y Estructura del Proyecto

```text
Trabajo_Practico_Nro_2_Grupal_Frontend-main/
├── public/
│   └── img/                         # Recursos gráficos, fotos de miembros y carátulas de TP1
│       ├── capturas/
│       ├── damaris/
│       ├── marcelo/
│       ├── micaela/
│       ├── valeria/
│       └── hero-imagen.png
├── src/
│   ├── assets/                      # Íconos y activos empaquetados
│   ├── components/                  # Componentes estructurales y compartidos
│   │   ├── Footer.css / .jsx        # Pie de página institucional
│   │   ├── Header.css / .jsx        # Barra superior con menú hamburguesa y breadcrumbs
│   │   ├── MainLayout.css / .jsx    # Layout con Sidebar + Header + Outlet + Footer
│   │   ├── Sidebar.css / .jsx       # Barra lateral compartida con NavLink y drawer móvil
│   │   └── ThemeContext.jsx         # Contexto y hook para alternar tema claro/oscuro
│   ├── data/                        # Colecciones de datos locales
│   │   ├── bitacora.json            # 10 entradas históricas (TP1 + TP2)
│   │   ├── integrantes.json         # Datos biográficos, habilidades y medios de los 4 miembros
│   │   └── servicios_o_proyectos.json # 22 registros detallados con filtros y acordeones
│   ├── pages/                       # Vistas principales de la aplicación
│   │   ├── Bitacora.css / .jsx      # Bitácora con acordeón y filtros por etapa
│   │   ├── ComponentTree.css / .jsx # Árbol interactivo del DOM virtual e inspector
│   │   ├── Home.css / .jsx          # Portada corporativa con métricas y tarjetas
│   │   ├── Profile.css / .jsx       # Perfil reutilizable con pestañas interactivas
│   │   ├── Services.css / .jsx      # Catálogo con buscador, filtros y estado vacío
│   │   └── Weather.css / .jsx       # Telemetría de sede central consumiendo Open-Meteo
│   ├── services/
│   │   └── weatherService.js        # Consumo de API y mapeo de códigos meteorológicos WMO
│   ├── App.jsx                      # Definición de rutas con React Router v6
│   ├── index.css                    # Estilos globales y reset
│   └── main.jsx                     # Punto de entrada de React con BrowserRouter
├── index.html                       # HTML base para el bundler de Vite
├── package.json                     # Declaración de dependencias y scripts de ejecución
├── vercel.json                      # Configuración de reescritura para rutas SPA en Vercel
├── vite.config.js                   # Configuración del servidor de desarrollo Vite
└── README.md                        # Documentación técnica completa
```

---

## 🤖 Declaración Formal de Uso de Inteligencia Artificial (Criterio 15)

En cumplimiento de las pautas de cátedra para el nivel **Propone**, se detalla formalmente el uso de herramientas de Inteligencia Artificial diferenciando la aplicación y el modelo específico utilizado por cada integrante:

| Integrante | Aplicación | Modelo Exacto | Tareas y Contenidos Asistidos |
| :--- | :--- | :--- | :--- |
| **Carlos Marcelo Hernandez** | **Google Antigravity** | **Gemini 3.8 Flash** | Asistencia en la configuración del entorno Vite, estructuración del árbol interactivo de componentes y lógica del layout compartido. |
| **Valeria Noemi Fernandez** | **Google Antigravity** | **Gemini 3.8 Flash** | Asistencia en la conversión de reglas de diseño del TP1 a CSS modular, diseño del panel drawer móvil y contraste en modo dual. |
| **Micaela Laila Gargiulo** | **Google Antigravity** | **Gemini 3.8 Flash** | Asistencia en la sintaxis de filtros combinados con `useMemo`, generación de datos para los 22 servicios y lógica de búsqueda reactiva. |
| **Damaris Rodriguez** | **Google Antigravity** | **Gemini 3.8 Flash** | Asistencia en la integración de la API REST de Open-Meteo, manejo defensivo de estados asíncronos y formato del componente de bitácora. |

### Alcance de la Asistencia:
- **Lo que asistió la IA:** Estructuración de código repetitivo de componentes en React, optimización de consultas a la API abierta y refinamiento de la redacción documental técnica en formato Markdown.
- **Lo que fue creado por el equipo:** La arquitectura conceptual, la autoría de los datos personales y biografías, las decisiones visuales, la validación funcional en el navegador y la toma de decisiones metodológicas.

---

## 💻 Guía de Instalación y Ejecución Local

Para clonar y poner en funcionamiento el proyecto en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/cmarceloh/Trabajo_Practico_Nro_2_Grupal_Frontend.git
   cd Trabajo_Practico_Nro_2_Grupal_Frontend/Trabajo_Practico_Nro_2_Grupal_Frontend-main
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   *La consola indicará el puerto local (por defecto `http://localhost:5173/`).*

4. **Compilar para producción (Build):**
   ```bash
   npm run build
   ```

5. **Previsualizar la compilación de producción:**
   ```bash
   npm run preview
   ```

---

## ☁️ Despliegue en Vercel

El proyecto está configurado para despliegue directo en **Vercel**. El archivo [`vercel.json`](vercel.json) contiene la siguiente regla crítica para evitar errores 404 al refrescar rutas del enrutador de React:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 📝 Licencia y Marco Académico

Desarrollado como trabajo práctico evaluativo para la cátedra de **Desarrollo Frontend** de la carrera de **Tecnicatura Superior en Desarrollo de Software** del **Instituto de Formación Técnica Superior N° 29 (IFTS 29)**, Ciudad Autónoma de Buenos Aires, Argentina.
