import { useState } from 'react'

const DOCK_APPS = [
  { id:'about',    icon:'◉', label:'About',   color:'#0088ff' },
  { id:'projects', icon:'⬡', label:'Projects',color:'#0088ff' },
  { id:'terminal', icon:'⬛', label:'Terminal',color:'#0088ff' },
  { id:'skills',   icon:'◈', label:'Skills',  color:'#0088ff' },
  { id:'resume',   icon:'☰', label:'Resume',  color:'#0088ff' },
  { id:'ai',       icon:'◎', label:'AI',      color:'#0088ff' },
  { id:'contact',  icon:'✉', label:'Contact', color:'#0088ff' },
  { id:'github',   icon:'⌬', label:'GitHub',  color:'#0088ff' },
  { id:'settings', icon:'⚙', label:'Settings',color:'#0088ff' },
  { id:'sysmon',   icon:'▲', label:'Monitor', color:'#0088ff' },
]

interface Props { onAppOpen: (id: string) => void; openApps: string[] }

export function Dock({ onAppOpen, openApps }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)
  return (
    <div style={{
      position:'fixed', bottom:'8px', left:'50%', transform:'translateX(-50%)',
      zIndex:900,
      background:'#2a2a2a',
      border:'1px solid #444', borderRadius:'8px',
      padding:'6px 8px', display:'flex', alignItems:'center', gap:'4px',
      fontFamily:"'Liberation Mono',monospace",
    }}>
      {DOCK_APPS.map(app => {
        const isOpen = openApps.includes(app.id)
        const isHov  = hovered === app.id
        return (
          <div key={app.id} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'2px' }}>
            <div
              onClick={() => onAppOpen(app.id)}
              onMouseEnter={() => setHovered(app.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: '32px', height: '32px',
                borderRadius:'4px',
                background: isHov ? '#404040' : 'transparent',
                border:`1px solid ${isHov ? '#666' : '#444'}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', color:'#0088ff', fontSize: '16px',
                transition:'all 0.15s',
              }}
              title={app.label}
            >{app.icon}</div>
            {isOpen && <div style={{ width:'2px', height:'2px', borderRadius:'50%', background:'#0088ff' }} />}
          </div>
        )
      })}
    </div>
  )
}
