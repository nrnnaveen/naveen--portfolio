import { useState } from 'react'
import { NAVEEN } from '../data'

export function ProjectsApp() {
  const [selected, setSelected] = useState<number | null>(null)
  const p = selected !== null ? NAVEEN.projects[selected] : null
  return (
    <div style={{ display:'flex', height:'100%', fontFamily:"'JetBrains Mono',monospace" }}>
      <div style={{ width:'200px', borderRight:'1px solid rgba(0,255,247,0.1)', overflow:'auto', flexShrink:0 }}>
        {NAVEEN.projects.map((proj, i) => (
          <div key={i} onClick={() => setSelected(i)} style={{
            padding:'12px 14px', cursor:'pointer',
            borderBottom:'1px solid rgba(255,255,255,0.04)',
            background: selected === i ? 'rgba(0,255,247,0.07)' : 'transparent',
            borderLeft: selected === i ? `2px solid ${proj.color}` : '2px solid transparent',
            transition:'all 0.2s',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <span style={{ color:proj.color, fontSize:'10px' }}>●</span>
              <span style={{ color: selected === i ? '#fff' : '#aaa', fontSize:'11px', lineHeight:'1.4' }}>{proj.name}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex:1, padding:'24px', overflow:'auto' }}>
        {p ? (
          <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
              <div style={{
                width:'44px', height:'44px', borderRadius:'10px',
                background:`${p.color}22`, border:`1px solid ${p.color}44`,
                display:'flex', alignItems:'center', justifyContent:'center',
                color:p.color, fontSize:'20px',
              }}>⬡</div>
              <div>
                <div style={{ color:'#fff', fontSize:'15px', fontWeight:'600' }}>{p.name}</div>
                <div style={{ color:p.color, fontSize:'10px', letterSpacing:'1px', marginTop:'2px' }}>PROJECT</div>
              </div>
            </div>
            <p style={{ color:'#aaa', fontSize:'12px', lineHeight:'1.8', borderLeft:`2px solid ${p.color}`, paddingLeft:'12px' }}>{p.desc}</p>
            <div>
              <div style={{ color:'#555', fontSize:'10px', letterSpacing:'2px', marginBottom:'8px' }}>TECH STACK</div>
              <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
                {p.tech.map((t, i) => (
                  <span key={i} style={{
                    padding:'3px 10px', borderRadius:'12px', fontSize:'10px',
                    background:`${p.color}15`, border:`1px solid ${p.color}44`, color:p.color,
                  }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ padding:'12px', borderRadius:'8px', background:'rgba(0,0,0,0.4)', border:'1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ color:'#555', fontSize:'10px', marginBottom:'6px' }}>$ git log --oneline</div>
              <div style={{ color:'#00ff88', fontSize:'11px' }}>abc1234 feat: initial commit</div>
              <div style={{ color:'#00fff7', fontSize:'11px' }}>def5678 feat: {p.name.toLowerCase().replace(/ /g,'-')}-core</div>
              <div style={{ color:'#aaa', fontSize:'11px' }}>ghi9012 docs: add README</div>
            </div>
          </div>
        ) : (
          <div style={{ height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'12px', color:'#333' }}>
            <span style={{ fontSize:'40px' }}>⬡</span>
            <div style={{ color:'#444', fontSize:'12px' }}>Select a project</div>
          </div>
        )}
      </div>
    </div>
  )
}
