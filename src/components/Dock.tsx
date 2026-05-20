import { useState } from 'react'

const DOCK_APPS = [
  { id:'about',    icon:'◉', label:'About',   color:'#00fff7' },
  { id:'projects', icon:'⬡', label:'Projects',color:'#bf00ff' },
  { id:'terminal', icon:'⬛', label:'Terminal',color:'#00ff88' },
  { id:'skills',   icon:'◈', label:'Skills',  color:'#ff6b35' },
  { id:'resume',   icon:'☰', label:'Resume',  color:'#00c8ff' },
  { id:'ai',       icon:'◎', label:'AI',      color:'#ff0080' },
  { id:'contact',  icon:'✉', label:'Contact', color:'#ffcc00' },
  { id:'github',   icon:'⌬', label:'GitHub',  color:'#888'    },
  { id:'settings', icon:'⚙', label:'Settings',color:'#aaa'    },
  { id:'sysmon',   icon:'▲', label:'Monitor', color:'#ff6b35' },
]

interface Props { onAppOpen: (id: string) => void; openApps: string[] }

export function Dock({ onAppOpen, openApps }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)
  return (
    <div style={{
      position:'fixed', bottom:'12px', left:'50%', transform:'translateX(-50%)',
      zIndex:900,
      background:'rgba(0,0,0,0.7)', backdropFilter:'blur(30px)',
      border:'1px solid rgba(0,255,247,0.15)', borderRadius:'16px',
      padding:'8px 12px', display:'flex', alignItems:'flex-end', gap:'6px',
      boxShadow:'0 4px 40px rgba(0,255,247,0.1),0 0 80px rgba(191,0,255,0.05)',
    }}>
      {DOCK_APPS.map(app => {
        const isOpen = openApps.includes(app.id)
        const isHov  = hovered === app.id
        return (
          <div key={app.id} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'3px' }}>
            <div style={{
              fontSize:'9px', color:app.color, opacity: isHov ? 1 : 0,
              transition:'opacity 0.2s', whiteSpace:'nowrap',
              background:'rgba(0,0,0,0.8)', padding:'2px 6px', borderRadius:'4px',
              border:`1px solid ${app.color}33`,
            }}>{app.label}</div>
            <div
              onClick={() => onAppOpen(app.id)}
              onMouseEnter={() => setHovered(app.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: isHov ? '52px' : '42px', height: isHov ? '52px' : '42px',
                borderRadius:'12px',
                background: isHov ? `linear-gradient(135deg,${app.color}33,${app.color}11)` : 'rgba(255,255,255,0.05)',
                border:`1px solid ${isHov ? app.color : 'rgba(255,255,255,0.1)'}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', color:app.color, fontSize: isHov ? '22px' : '18px',
                transition:'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                boxShadow: isHov ? `0 0 20px ${app.color}44` : 'none',
                marginBottom: isHov ? '4px' : '0',
              }}
            >{app.icon}</div>
            {isOpen && <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:app.color, opacity:0.8 }} />}
          </div>
        )
      })}
    </div>
  )
}
