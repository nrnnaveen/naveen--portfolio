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
    ? { position:'fixed', top:'30px', left:0, right:0, bottom:0, zIndex, width:'100vw', height:'calc(100vh - 30px)' }
    : { position:'fixed', left:pos.x, top:pos.y, width:680, height:460, zIndex }

  const controls = [
    { c:'#ff5f57', action: onClose, label:'×' },
    { c:'#ffbd2e', action: () => onMinimize(id), label:'−' },
    { c:'#28c840', action: () => setMaximized(m => !m), label: maximized ? '❐' : '□' },
  ]

  return (
    <div onMouseDown={() => onFocus()} style={{
      ...wStyle,
      background:'rgba(8,8,20,0.92)', backdropFilter:'blur(30px)',
      border:`1px solid ${color}33`, borderRadius: maximized ? '0' : '12px',
      boxShadow:`0 20px 60px rgba(0,0,0,0.8),0 0 30px ${color}11,inset 0 1px 0 rgba(255,255,255,0.05)`,
      display:'flex', flexDirection:'column', overflow:'hidden',
    }}>
      <div onMouseDown={handleMouseDown} style={{
        height:'36px',
        background:`rgba(0,0,0,0.6)`,
        borderBottom:`1px solid ${color}22`,
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 12px', cursor:'move', userSelect:'none', flexShrink:0,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <span style={{ color, fontSize:'14px' }}>{icon}</span>
          <span style={{ color:'#ccc', fontSize:'12px', fontFamily:"'JetBrains Mono',monospace", letterSpacing:'0.5px' }}>{title}</span>
        </div>
        <div className="window-controls" style={{ display:'flex', gap:'6px' }}>
          {controls.map((b, i) => (
            <button key={i} onClick={b.action} style={{
              width:'14px', height:'14px', borderRadius:'50%',
              background:b.c, border:'none', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'9px', color:'rgba(0,0,0,0.6)', fontWeight:'bold',
            }}>{b.label}</button>
          ))}
        </div>
      </div>
      <div style={{ flex:1, overflow:'auto' }}>{children}</div>
    </div>
  )
}
