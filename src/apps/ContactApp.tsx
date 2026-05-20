import { useState } from 'react'
import { NAVEEN } from '../data'

export function ContactApp() {
  const [form, setForm] = useState({ name:'', email:'', msg:'' })
  const [sent, setSent] = useState(false)
  const submit = () => {
    if (form.name && form.email && form.msg) { setSent(true); setTimeout(() => setSent(false), 3000); setForm({ name:'', email:'', msg:'' }) }
  }
  const links = [
    { icon:'⌬', label:'GitHub',    val:NAVEEN.github,    url:`https://${NAVEEN.github}`,    color:'#888' },
    { icon:'◈', label:'LinkedIn',  val:NAVEEN.linkedin,  url:`https://${NAVEEN.linkedin}`,  color:'#0088ff' },
    { icon:'✉', label:'Email',     val:NAVEEN.email,     url:`mailto:${NAVEEN.email}`,       color:'#00fff7' },
    { icon:'◉', label:'Portfolio', val:NAVEEN.portfolio, url:`https://${NAVEEN.portfolio}`, color:'#bf00ff' },
  ]
  return (
    <div style={{ padding:'24px', fontFamily:"'JetBrains Mono',monospace", overflow:'auto', height:'100%', color:'#ccc' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          <div style={{ color:'#00fff7', fontSize:'11px', letterSpacing:'2px' }}>CONNECT WITH ME</div>
          {links.map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" style={{ padding:'14px 16px', borderRadius:'10px', background:'rgba(255,255,255,0.02)', border:`1px solid ${l.color}33`, display:'flex', alignItems:'center', gap:'12px', textDecoration:'none' }}>
              <div style={{ width:'36px', height:'36px', borderRadius:'8px', background:`${l.color}15`, border:`1px solid ${l.color}33`, display:'flex', alignItems:'center', justifyContent:'center', color:l.color, fontSize:'16px' }}>{l.icon}</div>
              <div>
                <div style={{ color:'#fff', fontSize:'12px' }}>{l.label}</div>
                <div style={{ color:'#666', fontSize:'10px', marginTop:'2px' }}>{l.val}</div>
              </div>
            </a>
          ))}
          <div style={{ padding:'12px', borderRadius:'8px', background:'rgba(0,255,247,0.03)', border:'1px solid rgba(0,255,247,0.1)' }}>
            <div style={{ color:'#666', fontSize:'10px' }}>📍 {NAVEEN.location}</div>
            <div style={{ color:'#666', fontSize:'10px', marginTop:'4px' }}>📱 {NAVEEN.phone}</div>
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          <div style={{ color:'#00fff7', fontSize:'11px', letterSpacing:'2px' }}>SEND MESSAGE</div>
          {sent && <div style={{ padding:'10px 14px', borderRadius:'8px', background:'rgba(0,255,136,0.1)', border:'1px solid rgba(0,255,136,0.3)', color:'#00ff88', fontSize:'11px' }}>Message sent successfully!</div>}
          {(['name','email'] as const).map(k => (
            <input key={k} type={k==='email'?'email':'text'} placeholder={k==='name'?'Your Name':'Your Email'} value={form[k]} onChange={e => setForm(p => ({ ...p, [k]:e.target.value }))} style={{ padding:'10px 14px', borderRadius:'8px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(0,255,247,0.2)', color:'#fff', outline:'none', fontFamily:"'JetBrains Mono',monospace", fontSize:'12px' }} />
          ))}
          <textarea placeholder="Your Message..." value={form.msg} onChange={e => setForm(p => ({ ...p, msg:e.target.value }))} style={{ minHeight:'100px', padding:'10px 14px', borderRadius:'8px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(0,255,247,0.2)', color:'#fff', outline:'none', resize:'none', fontFamily:"'JetBrains Mono',monospace", fontSize:'12px' }} />
          <button onClick={submit} style={{ padding:'10px', borderRadius:'8px', background:'linear-gradient(135deg,rgba(0,255,247,0.2),rgba(191,0,255,0.2))', border:'1px solid rgba(0,255,247,0.4)', color:'#00fff7', cursor:'pointer', fontFamily:"'JetBrains Mono',monospace", fontSize:'12px', letterSpacing:'2px' }}>SEND MESSAGE</button>
        </div>
      </div>
    </div>
  )
}
