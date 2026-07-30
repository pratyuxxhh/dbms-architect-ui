import { useState, useEffect, useCallback } from 'react'

export function useResizablePanels() {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem('dbms_sidebar_width')
    return saved ? parseInt(saved, 10) : 260
  })

  const [inspectorWidth, setInspectorWidth] = useState(() => {
    const saved = localStorage.getItem('dbms_inspector_width')
    return saved ? parseInt(saved, 10) : 320
  })

  const [isInspectorOpen, setIsInspectorOpen] = useState(() => {
    const saved = localStorage.getItem('dbms_inspector_open')
    return saved !== null ? saved === 'true' : true
  })

  // Persist panel widths
  useEffect(() => {
    localStorage.setItem('dbms_sidebar_width', sidebarWidth.toString())
  }, [sidebarWidth])

  useEffect(() => {
    localStorage.setItem('dbms_inspector_width', inspectorWidth.toString())
  }, [inspectorWidth])

  useEffect(() => {
    localStorage.setItem('dbms_inspector_open', isInspectorOpen.toString())
  }, [isInspectorOpen])

  // Drag handler for Left Sidebar
  const startResizingSidebar = useCallback((mouseDownEvent) => {
    mouseDownEvent.preventDefault()
    const startX = mouseDownEvent.clientX
    const startWidth = sidebarWidth

    const onMouseMove = (mouseMoveEvent) => {
      const newWidth = Math.max(200, Math.min(420, startWidth + (mouseMoveEvent.clientX - startX)))
      setSidebarWidth(newWidth)
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.body.style.cursor = 'default'
      document.body.style.userSelect = 'auto'
    }

    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [sidebarWidth])

  // Drag handler for Right Inspector
  const startResizingInspector = useCallback((mouseDownEvent) => {
    mouseDownEvent.preventDefault()
    const startX = mouseDownEvent.clientX
    const startWidth = inspectorWidth

    const onMouseMove = (mouseMoveEvent) => {
      const newWidth = Math.max(260, Math.min(480, startWidth - (mouseMoveEvent.clientX - startX)))
      setInspectorWidth(newWidth)
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.body.style.cursor = 'default'
      document.body.style.userSelect = 'auto'
    }

    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [inspectorWidth])

  const toggleInspector = useCallback(() => {
    setIsInspectorOpen((prev) => !prev)
  }, [])

  return {
    sidebarWidth,
    inspectorWidth,
    isInspectorOpen,
    startResizingSidebar,
    startResizingInspector,
    toggleInspector,
  }
}
