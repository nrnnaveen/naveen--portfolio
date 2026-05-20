import { useState } from 'react'

const ICONS = [
  { id:'about',    icon:'◉', label:'About Me',    color:'#00fff7' },
  { id:'projects', icon:'⬡', label:'Projects',    color:'#bf00ff' },
  { id:'terminal', icon:'⬛', label:'Terminal',    color:'#00ff88' },
  { id:'resume',   icon:'☰', label:'Resume',      color:'#00c8ff' },
  { id:'skills',   icon:'◈', label:'Skills',      color:'#ff6b35' },
  { id:'ai',       icon:'◎', label:'AI Assistant',color:'#ff0080' },
  { id:'contact',  icon:'✉', label:'Contact',     color:'#ffcc00' },
  { id:'github',   icon:'⌬', label:'GitHub',      color:'#888'    },
  { id:'sysmon',   icon:'▲', label:'Sys Monitor', color:'#ff6b35' },
  { id:'settings', icon:'⚙', label:'Settings',    color:'#aaa'    },
]

interface Props { onOpen: (id: string) => void }

function DesktopIcon({ id, icon, label, color, onOpen }: typeof ICONS[0] & { onOpen: (id: string) => void }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onDoubleClick={() => onOpen(id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', padding:'8px', borderRadius:'10px', cursor:'pointer', background: hov ? 'rgba(255,255,255,0.06)' : 'transparent', border: hov ? `1px solid ${color}33` : '1px solid transparent', width:'72px', transition:'all 0.2s' }}
    >
      <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:`${color}15`, border:`1px solid ${color}33`, display:'flex', alignItems:'center', justifyContent:'center', color, fontSize:'20px', boxShadow: hov ? `0 0 16px ${color}44` : 'none', transition:'all 0.2s' }}>{icon}</div>
      <span style={{ color: hov ? '#fff' : '#aaa', fontSize:'10px', textAlign:'center', fontFamily:"'JetBrains Mono',monospace", lineHeight:'1.3', textShadow: hov ? `0 0 8px ${color}` : 'none' }}>{label}</span>
    </div>
  )
}

export function Desktop({ onOpen }: Props) {
  return (
    <div style={{ position:'fixed', inset:0, top:'30px', zIndex:2, display:'grid', gridTemplateColumns:'repeat(auto-fill,80px)', gridTemplateRows:'repeat(auto-fill,90px)', alignContent:'start', padding:'16px', gap:'4px' }}>
      {ICONS.map(icon => <DesktopIcon key={icon.id} {...icon} onOpen={onOpen} />)}
    </div>
  )
}
