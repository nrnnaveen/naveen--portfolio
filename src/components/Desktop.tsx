import { useState } from 'react'

const ICONS = [
  { id:'about',    icon:'◉', label:'About Me',    color:'#0088ff' },
  { id:'projects', icon:'⬡', label:'Projects',    color:'#0088ff' },
  { id:'terminal', icon:'⬛', label:'Terminal',    color:'#0088ff' },
  { id:'resume',   icon:'☰', label:'Resume',      color:'#0088ff' },
  { id:'skills',   icon:'◈', label:'Skills',      color:'#0088ff' },
  { id:'ai',       icon:'◎', label:'AI Assistant',color:'#0088ff' },
  { id:'contact',  icon:'✉', label:'Contact',     color:'#0088ff' },
  { id:'github',   icon:'⌬', label:'GitHub',      color:'#0088ff' },
  { id:'sysmon',   icon:'▲', label:'Sys Monitor', color:'#0088ff' },
  { id:'settings', icon:'⚙', label:'Settings',    color:'#0088ff' },
]

interface Props { onOpen: (id: string) => void }

function DesktopIcon({ id, icon, label, color, onOpen }: typeof ICONS[0] & { onOpen: (id: string) => void }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onDoubleClick={() => onOpen(id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', padding:'6px', borderRadius:'4px', cursor:'pointer', background: hov ? '#3a3a3a' : 'transparent', border: hov ? '1px solid #555' : '1px solid transparent', width:'68px', transition:'all 0.15s', fontFamily:"'Liberation Mono',monospace" }}
    >
      <div style={{ width:'40px', height:'40px', borderRadius:'4px', background:'#3a3a3a', border:`1px solid ${hov ? '#0088ff' : '#555'}`, display:'flex', alignItems:'center', justifyContent:'center', color, fontSize:'18px', transition:'all 0.15s' }}>{icon}</div>
      <span style={{ color: hov ? '#fff' : '#aaa', fontSize:'10px', textAlign:'center', lineHeight:'1.2' }}>{label}</span>
    </div>
  )
}

export function Desktop({ onOpen }: Props) {
  return (
    <div style={{ position:'fixed', inset:0, top:'28px', zIndex:2, display:'grid', gridTemplateColumns:'repeat(auto-fill,80px)', gridTemplateRows:'repeat(auto-fill,90px)', alignContent:'start', padding:'12px', gap:'4px' }}>
      {ICONS.map(icon => <DesktopIcon key={icon.id} {...icon} onOpen={onOpen} />)}
    </div>
  )
}
