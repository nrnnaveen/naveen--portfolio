import { useState, useEffect } from 'react'

const BOOT_LINES = [
  'Booting Naveen-OS kernel 6.9.1-arch1-1',
  'Initializing memory... OK',
  'Loading modules... OK',
  'Starting services... OK',
  'Wayland compositor (GNOME) started',
  'Welcome, M. Naveen',
  'Login successful ✓',
]

interface Props { onDone: () => void }

export function BootScreen({ onDone }: Props) {
  const [lines, setLines] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines(l => [...l, BOOT_LINES[i] ?? ''])
        i++
      } else {
        clearInterval(id)
        setTimeout(() => setDone(true), 400)
        setTimeout(() => onDone(), 1000)
      }
    }, 120)
    return () => clearInterval(id)
  }, [onDone])

  return (
    <div style={{
      position:'fixed', inset:0, background:'#000', zIndex:9999,
      display:'flex', flexDirection:'column', justifyContent:'center',
      alignItems:'flex-start', padding:'40px 60px',
      fontFamily:"'Liberation Mono',monospace",
      opacity: done ? 0 : 1, transition:'opacity 0.4s ease',
    }}>
      <div style={{ marginBottom:'32px' }}>
        <div style={{ color:'#fff', fontSize:'14px', letterSpacing:'1px' }}>NAVEEN-OS v2025.1</div>
      </div>
      <div style={{ width:'100%', maxWidth:'700px' }}>
        {lines.map((l, i) => {
          const line = l || ''
          return (
          <div key={i} style={{
            color: line.includes('✓') ? '#0f0' : '#888',
            fontSize:'12px', lineHeight:'1.7',
            opacity:0, animation:`fadeInLine 0.1s ease ${i * 0.08}s forwards`,
          }}>{line}</div>
          )
        })}
      </div>
    </div>
  )
}
