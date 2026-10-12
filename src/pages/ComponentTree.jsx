import React, { useState } from 'react'
import './ComponentTree.css'

// Modelo estructurado del árbol real de componentes de la aplicación
const initialTreeData = {
  id: 'root-app',
  nombre: 'App',
  tipo: 'Componente Raíz',
  descripcion: 'Punto de entrada de la aplicación; inicializa ThemeProvider y BrowserRouter con las rutas declarativas.',
  props: 'ninguna',
  hooks: ['useTheme'],
  expanded: true,
  hijos: [
    {
      id: 'main-layout',
      nombre: 'MainLayout',
      tipo: 'Layout Estructural',
      descripcion: 'Plantilla compartida que encapsula Sidebar, Header, Outlet y Footer con estado responsive de apertura.',
      props: 'children / Outlet',
      hooks: ['useState (sidebarOpen)'],
      expanded: true,
      hijos: [
        {
          id: 'sidebar',
          nombre: 'Sidebar',
          tipo: 'Navegación Compartida',
          descripcion: 'Barra lateral persistente con NavLink activos, identidad corporativa, selector de tema y drawer móvil.',
          props: 'isOpen: boolean, onClose: function',
          hooks: ['useTheme'],
          expanded: true,
          hijos: [
            {
              id: 'navlink-items',
              nombre: 'NavLink (Ítems)',
              tipo: 'Componente de Enrutamiento',
              descripcion: 'Enlaces a Inicio, Servicios, Clima, Árbol de Renderizado y Bitácora con clase activa dinámica.',
              props: 'to: string, className: function',
              hooks: ['useMatch', 'useResolvedPath'],
              expanded: false,
              hijos: [],
            },
            {
              id: 'team-nav-links',
              nombre: 'TeamLinks (Perfiles)',
              tipo: 'Subnavegación Dinámica',
              descripcion: 'Renderizado de avatar y enlaces hacia /perfil/:id para los 4 integrantes desde JSON.',
              props: 'integrantes: array',
              hooks: [],
              expanded: false,
              hijos: [],
            },
          ],
        },
        {
          id: 'header',
          nombre: 'Header',
          tipo: 'Encabezado Global',
          descripcion: 'Barra superior con botón hamburguesa para móviles, migas de pan automáticas y botón de cambio de tema.',
          props: 'onToggleSidebar: function',
          hooks: ['useTheme', 'useLocation'],
          expanded: false,
          hijos: [],
        },
        {
          id: 'outlet',
          nombre: 'Outlet (React Router)',
          tipo: 'Contenedor de Vistas',
          descripcion: 'Espacio dinámico donde se monta la página activa según la URL actual del navegador.',
          props: 'context',
          hooks: ['useOutlet'],
          expanded: true,
          hijos: [
            {
              id: 'page-home',
              nombre: 'Home (Portada)',
              tipo: 'Página / Vista',
              descripcion: 'Presentación de la consultora Grupo 14, sección Hero, métricas y grilla de integrantes.',
              props: 'ninguna',
              hooks: ['useState (integranteDestacado)'],
              expanded: true,
              hijos: [
                {
                  id: 'card-team',
                  nombre: 'TeamCard (Tarjetas de Miembro)',
                  tipo: 'Componente de Tarjeta',
                  descripcion: 'Renderiza foto, nombre, rol, badges de tecnologías y enlace directo a /perfil/:id.',
                  props: 'integrante: object, onHover: function',
                  hooks: [],
                  expanded: false,
                  hijos: [],
                },
              ],
            },
            {
              id: 'page-profile',
              nombre: 'Profile (Perfil Reutilizable)',
              tipo: 'Página Dinámica',
              descripcion: 'Vista unificada con pestañas de habilidades, semblanza, películas/discos y formulario de contacto.',
              props: 'parámetro :id de ruta',
              hooks: ['useParams', 'useState (activeTab, mensajeEnviado)'],
              expanded: false,
              hijos: [
                {
                  id: 'media-card',
                  nombre: 'MediaCard (Películas y Discos)',
                  tipo: 'Componente Multimedia',
                  descripcion: 'Tarjetas con carátula, título y año de álbumes y películas favoritas de cada integrante.',
                  props: 'item: object',
                  hooks: [],
                  expanded: false,
                  hijos: [],
                },
              ],
            },
            {
              id: 'page-services',
              nombre: 'Services (Catálogo JSON)',
              tipo: 'Página de Datos Locales',
              descripcion: 'Búsqueda en tiempo real, filtros por categoría y tecnología sobre 22 registros con estado vacío.',
              props: 'serviciosData: array',
              hooks: ['useState (searchTerm, category, expandedCards)', 'useMemo'],
              expanded: true,
              hijos: [
                {
                  id: 'card-service',
                  nombre: 'ServiceCard (Tarjetas Expandibles)',
                  tipo: 'Componente de Tarjeta',
                  descripcion: 'Renderizado interactivo de servicio con botón para expandir/contraer detalles técnicos.',
                  props: 'servicio: object, isExpanded: boolean, onToggle: function',
                  hooks: [],
                  expanded: false,
                  hijos: [],
                },
              ],
            },
            {
              id: 'page-weather',
              nombre: 'Weather (Sede Central)',
              tipo: 'Página de API Externa',
              descripcion: 'Consumo de Open-Meteo para CABA con 3 estados (Carga, Error, Éxito) y botón de reintento.',
              props: 'ninguna',
              hooks: ['useState (data, loading, error)', 'useEffect', 'useCallback'],
              expanded: false,
              hijos: [],
            },
            {
              id: 'page-tree',
              nombre: 'ComponentTree (Árbol Dinámico)',
              tipo: 'Página Interactiva',
              descripcion: 'Representación visual jerárquica con nodos interactivos que se expanden y contraen.',
              props: 'ninguna',
              hooks: ['useState (treeData, selectedNode)'],
              expanded: false,
              hijos: [],
            },
            {
              id: 'page-bitacora',
              nombre: 'Bitacora (Bitácora Grupal)',
              tipo: 'Página de Registro Histórico',
              descripcion: 'Acordeón interactivo con las entradas del TP1 y TP2 con filtros por etapa de trabajo.',
              props: 'bitacoraData: array',
              hooks: ['useState (filtroEtapa, abiertoId)'],
              expanded: false,
              hijos: [],
            },
          ],
        },
        {
          id: 'footer',
          nombre: 'Footer',
          tipo: 'Pie de Página Compartido',
          descripcion: 'Cierre institucional con créditos de la consultora, IFTS 29 y enlaces de navegación interna.',
          props: 'ninguna',
          hooks: [],
          expanded: false,
          hijos: [],
        },
      ],
    },
  ],
}

export default function ComponentTree() {
  const [treeData, setTreeData] = useState(initialTreeData)
  const [selectedNode, setSelectedNode] = useState(initialTreeData)

  // Función recursiva para alternar la expansión de un nodo por id
  const toggleNodeExpansion = (nodeId) => {
    const updateRecursive = (node) => {
      if (node.id === nodeId) {
        return { ...node, expanded: !node.expanded }
      }
      if (node.hijos && node.hijos.length > 0) {
        return {
          ...node,
          hijos: node.hijos.map(updateRecursive),
        }
      }
      return node
    }

    setTreeData(updateRecursive(treeData))
  }

  // Expandir todos los nodos recursivamente
  const expandAll = (expand) => {
    const updateAll = (node) => ({
      ...node,
      expanded: expand,
      hijos: node.hijos ? node.hijos.map(updateAll) : [],
    })
    setTreeData(updateAll(treeData))
  }

  // Componente recursivo para renderizar cada nodo
  const TreeNode = ({ node, level = 0 }) => {
    const hasChildren = node.hijos && node.hijos.length > 0
    const isSelected = selectedNode?.id === node.id

    return (
      <div className="tree-node-wrapper">
        <div
          className={`tree-node-item level-${level} ${isSelected ? 'node-selected' : ''}`}
          onClick={() => setSelectedNode(node)}
        >
          {hasChildren ? (
            <button
              className="node-toggle-btn"
              onClick={(e) => {
                e.stopPropagation()
                toggleNodeExpansion(node.id)
              }}
              title={node.expanded ? 'Contraer rama' : 'Expandir rama'}
            >
              {node.expanded ? '▼' : '►'}
            </button>
          ) : (
            <span className="node-leaf-icon">•</span>
          )}

          <div className="node-content">
            <span className="node-name">&lt;{node.nombre}&gt;</span>
            <span className="node-type-tag">{node.tipo}</span>
          </div>

          <span className="node-hint">Clic para inspeccionar</span>
        </div>

        {hasChildren && node.expanded && (
          <div className="tree-node-children">
            {node.hijos.map((hijo) => (
              <TreeNode key={hijo.id} node={hijo} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="tree-container animate-fade-in">
      <div className="tree-header">
        <div className="badge badge-accent">Criterio 13 — Jerarquía Real de Componentes</div>
        <h1 className="tree-title">Árbol de Renderizado de Componentes</h1>
        <p className="tree-desc">
          Esta vista representa la <strong>jerarquía real de componentes</strong> de nuestra aplicación React en tiempo de ejecución.
          Podés <strong>expandir y contraer</strong> los nodos haciendo clic en los botones laterales o seleccionar cualquier elemento
          para examinar sus responsabilidades, hooks y propiedades en el panel inspector.
        </p>
      </div>

      <div className="tree-actions-bar">
        <div className="tree-bulk-buttons">
          <button onClick={() => expandAll(true)} className="btn-secondary btn-sm">
            ➕ Expandir Todo el Árbol
          </button>
          <button onClick={() => expandAll(false)} className="btn-secondary btn-sm">
            ➖ Contraer Todo el Árbol
          </button>
        </div>
        <span className="tree-hint-text">
          💡 Los nodos con flechas son componentes contenedores con hijos anidados.
        </span>
      </div>

      <div className="tree-interactive-layout">
        {/* Lado izquierdo: Árbol interactivo */}
        <div className="tree-canvas-card">
          <div className="canvas-header">
            <h3>Estructura Jerárquica del Virtual DOM</h3>
            <span className="canvas-badge">React 18 Component Tree</span>
          </div>
          <div className="tree-nodes-list">
            <TreeNode node={treeData} />
          </div>
        </div>

        {/* Lado derecho: Inspector de componentes */}
        <div className="tree-inspector-card">
          <div className="inspector-header">
            <h3>Inspector de Componente</h3>
            <span className="inspector-status">Detalles en Vivo</span>
          </div>

          {selectedNode ? (
            <div className="inspector-body animate-fade-in">
              <div className="inspector-title-row">
                <span className="inspector-tag-type">{selectedNode.tipo}</span>
                <h2 className="inspector-component-name">&lt;{selectedNode.nombre}&gt;</h2>
              </div>

              <div className="inspector-section">
                <h4>Descripción y Rol Arquitectónico:</h4>
                <p>{selectedNode.descripcion}</p>
              </div>

              <div className="inspector-section">
                <h4>Propiedades (Props):</h4>
                <div className="inspector-code-box">
                  <code>{selectedNode.props}</code>
                </div>
              </div>

              <div className="inspector-section">
                <h4>Hooks de React Empleados:</h4>
                {selectedNode.hooks && selectedNode.hooks.length > 0 ? (
                  <div className="hooks-tags">
                    {selectedNode.hooks.map((h, i) => (
                      <span key={i} className="badge badge-accent">
                        {h}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">Componente sin hooks de estado directo (presentacional / controlado).</p>
                )}
              </div>

              <div className="inspector-section">
                <h4>Subcomponentes Hijos:</h4>
                <p className="text-muted">
                  {selectedNode.hijos && selectedNode.hijos.length > 0
                    ? `Contiene ${selectedNode.hijos.length} rama(s) directa(s).`
                    : 'Componente terminal (nodo hoja en el árbol).'}
                </p>
              </div>
            </div>
          ) : (
            <div className="inspector-empty">
              <p>Seleccioná un componente en el árbol para ver sus características.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
