import { useState, useEffect, useRef } from 'react'
import type { CSSProperties, MouseEvent as ReactMouseEvent, ReactNode } from 'react'

interface Props {
  id: string
  title: string
  icon: string
  color: string
  children: ReactNode
  onClose: () => void
  onMinimize: (id: string) => void
  initialPos: { x: number; y: number }
  zIndex: number
  onFocus: () => void
}

export function AppWindow({ id, title, icon, color, children, onClose, onMinimize, initialPos, zIndex, onFocus }: Props) {
  const [pos, setPos] = useState(initialPos)
  const [maximized, setMaximized] = useState(false)
  const dragging = useRef(false)
  const dragStart = useRef({ x:0, y:0, px:0, py:0 })

  const handleMouseDown = (e: ReactMouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return
    onFocus()
    dragging.current = true
    dragStart.current = { x:e.clientX, y:e.clientY, px:pos.x, py:pos.y }
    e.preventDefault()
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return
      setPos({
        x: dragStart.current.px + (e.clientX - dragStart.current.x),
        y: dragStart.current.py + (e.clientY - dragStart.current.y),
      })
    }
    const onUp = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [])

  const wStyle: CSSProperties = maximized
    ? { position:'fixed', top:'28px', left:0, right:0, bottom:0, zIndex, width:'100vw', height:'calc(100vh - 28px)' }
    : { position:'fixed', left:pos.x, top:pos.y, width:680, height:460, zIndex }

  const controls = [
    { c:'#d75d60', action: onClose, label:'✕' },
    { c:'#daa520', action: () => onMinimize(id), label:'_' },
    { c:'#60a063', action: () => setMaximized(m => !m), label: maximized ? '❐' : '□' },
  ]

  return (
    <div onMouseDown={() => onFocus()} style={{
      ...wStyle,
      background:'#2a2a2a',
      border:'1px solid #444', borderRadius: maximized ? '0' : '4px',
      boxShadow:'0 4px 12px rgba(0,0,0,0.8)',
      display:'flex', flexDirection:'column', overflow:'hidden',
      fontFamily:"'Liberation Mono',monospace",
    }}>
      <div onMouseDown={handleMouseDown} style={{
        height:'28px',
        background:'#3a3a3a',
        borderBottom:'1px solid #444',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 10px', cursor:'move', userSelect:'none', flexShrink:0,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
          <span style={{ color:'#0088ff', fontSize:'12px' }}>{icon}</span>
          <span style={{ color:'#ccc', fontSize:'11px' }}>{title}</span>
        </div>
        <div className="window-controls" style={{ display:'flex', gap:'4px' }}>
          {controls.map((b, i) => (
            <button key={i} onClick={b.action} style={{
              width:'12px', height:'12px', borderRadius:'50%',
              background:b.c, border:'none', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'8px', color:'#000', fontWeight:'bold',
            }}>{b.label}</button>
          ))}
        </div>
      </div>
      <div style={{ flex:1, overflow:'auto' }}>{children}</div>
    </div>
  )
}
