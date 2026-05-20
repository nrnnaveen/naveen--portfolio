import { useState, useEffect } from 'react'
export function CursorGlow() {
  const [pos, setPos] = useState({ x:-100, y:-100 })
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x:e.clientX, y:e.clientY })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])
  return (
    <div style={{ position:'fixed', left:pos.x-150, top:pos.y-150, width:'300px', height:'300px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,255,247,0.04) 0%,transparent 70%)', pointerEvents:'none', zIndex:9998, transition:'left 0.05s,top 0.05s' }} />
  )
}
