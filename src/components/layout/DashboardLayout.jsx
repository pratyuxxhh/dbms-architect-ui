import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import MainContent from './MainContent'
import HistoryFile from './HistoryFile'
import InspectorPanel from '../dashboard/InspectorPanel'
import { useResizablePanels } from '../../hooks/useResizablePanels'

export default function DashboardLayout({
  children,
  selectedDialect,
  onSelectDialect,
  generationStatus = 'idle',
  fileSizeKb = null,
  promptLength = 0,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null)
  const { pathname } = useLocation()
  const isPlayground = pathname === '/playground'
  const {
    sidebarWidth,
    inspectorWidth,
    isInspectorOpen,
    startResizingSidebar,
    startResizingInspector,
    toggleInspector,
  } = useResizablePanels()

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen])

  // Keyboard shortcut Ctrl+B to toggle Inspector
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault()
        toggleInspector()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleInspector])

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  )

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-background text-primary font-sans relative overflow-hidden flex">
      {/* 1. Left Sidebar Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        width={sidebarWidth}
        onSelectHistoryItem={setSelectedHistoryItem}
      />

      {/* Resizable Handle 1: Left Sidebar Drag Border (Desktop) */}
      <div
        onMouseDown={startResizingSidebar}
        style={{ left: `${sidebarWidth}px` }}
        className="fixed top-0 bottom-0 z-30 w-1.5 cursor-col-resize hover:bg-amber-500/50 active:bg-amber-500 transition-colors hidden lg:block select-none"
        title="Drag to resize sidebar"
      />

      {/* 2. Main Middle Workspace Container */}
      <div
        style={{
          paddingLeft: isDesktop ? `${sidebarWidth}px` : '0px',
          paddingRight: isDesktop && isInspectorOpen && !isPlayground ? `${inspectorWidth}px` : '0px',
        }}
        className="flex-1 flex flex-col min-h-screen transition-all duration-150 min-w-0"
      >
        <Topbar
          onMenuClick={() => setIsSidebarOpen(true)}
          onToggleInspector={toggleInspector}
          isInspectorOpen={isInspectorOpen}
        />
        <MainContent>
          {selectedHistoryItem ? (
            <HistoryFile
              filename={selectedHistoryItem.filename}
              content={selectedHistoryItem.content}
              onClose={() => setSelectedHistoryItem(null)}
            />
          ) : (
            children
          )}
        </MainContent>
      </div>

      {/* Resizable Handle 2: Right Inspector Drag Border (Desktop) */}
      {isInspectorOpen && (
        <div
          onMouseDown={startResizingInspector}
          style={{ right: `${inspectorWidth}px` }}
          className="fixed top-0 bottom-0 z-30 w-1.5 cursor-col-resize hover:bg-amber-500/50 active:bg-amber-500 transition-colors hidden lg:block select-none"
          title="Drag to resize inspector"
        />
      )}

      {/* 3. Right Inspector Panel Component */}
      <InspectorPanel
        isOpen={isInspectorOpen}
        onClose={toggleInspector}
        width={inspectorWidth}
        selectedDialect={selectedDialect}
        onSelectDialect={onSelectDialect}
        generationStatus={generationStatus}
        fileSizeKb={fileSizeKb}
        promptLength={promptLength}
      />
    </div>
  )
}