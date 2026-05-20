import { NAVEEN } from '../data'
export function ResumeApp() {
  return (
    <div style={{ padding:'24px', fontFamily:"'JetBrains Mono',monospace", overflow:'auto', height:'100%', color:'#ccc' }}>
      <div style={{ padding:'20px', borderRadius:'10px', marginBottom:'20px', background:'linear-gradient(135deg,rgba(0,255,247,0.05),rgba(191,0,255,0.05))', border:'1px solid rgba(0,255,247,0.2)' }}>
        <div style={{ fontSize:'22px', fontWeight:'bold', color:'#fff', letterSpacing:'2px' }}>M. NAVEEN</div>
        <div style={{ color:'#00fff7', fontSize:'12px', letterSpacing:'3px', marginTop:'2px' }}>ASPIRING DATA ENGINEER</div>
        <div style={{ display:'flex', gap:'16px', marginTop:'12px', flexWrap:'wrap' }}>
          {[NAVEEN.email, NAVEEN.phone, NAVEEN.location].map((v, i) => (<span key={i} style={{ color:'#888', fontSize:'11px' }}>• {v}</span>))}
        </div>
      </div>
      {[
        { title:'CAREER OBJECTIVE', content:<p style={{ color:'#aaa', fontSize:'12px', lineHeight:'1.8' }}>{NAVEEN.objective}</p> },
        { title:'EDUCATION', content:
          <div>{NAVEEN.education.map((e, i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'8px 10px', background:'rgba(0,0,0,0.3)', borderRadius:'6px', borderLeft:'2px solid #00fff7', marginBottom:'6px' }}>
              <div><div style={{ color:'#fff', fontSize:'12px' }}>{e.label}</div><div style={{ color:'#bf00ff', fontSize:'11px' }}>{e.place}</div></div>
              <div style={{ textAlign:'right' }}><div style={{ color:'#666', fontSize:'10px' }}>{e.year}</div><div style={{ color:'#00ff88', fontSize:'11px' }}>{e.score}</div></div>
            </div>
          ))}</div>
        },
        { title:'TECHNICAL SKILLS', content:
          <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
            {NAVEEN.skills.map((s, i) => (<span key={i} style={{ padding:'3px 10px', background:'rgba(0,255,247,0.08)', border:'1px solid rgba(0,255,247,0.25)', borderRadius:'12px', color:'#00fff7', fontSize:'11px' }}>{s}</span>))}
          </div>
        },
        { title:'PROJECTS', content:
          <div>{NAVEEN.projects.map((p, i) => (
            <div key={i} style={{ padding:'10px 12px', background:'rgba(0,0,0,0.3)', borderRadius:'6px', borderLeft:`2px solid ${p.color}`, marginBottom:'6px' }}>
              <div style={{ color:'#fff', fontSize:'12px', fontWeight:'600' }}>{p.name}</div>
              <div style={{ color:'#aaa', fontSize:'11px', marginTop:'4px', lineHeight:'1.6' }}>{p.desc}</div>
            </div>
          ))}</div>
        },
        { title:'ACHIEVEMENTS & ACTIVITIES', content:
          <div>{NAVEEN.achievements.map((a, i) => (
            <div key={i} style={{ display:'flex', gap:'8px', marginBottom:'4px' }}><span style={{ color:'#ffcc00' }}>★</span><span style={{ color:'#bbb', fontSize:'11px' }}>{a}</span></div>
          ))}</div>
        },
      ].map((sec, i) => (
        <div key={i} style={{ marginBottom:'20px' }}>
          <div style={{ color:'#00fff7', fontSize:'10px', letterSpacing:'3px', marginBottom:'10px', paddingBottom:'4px', borderBottom:'1px solid rgba(0,255,247,0.15)' }}>{sec.title}</div>
          {sec.content}
        </div>
      ))}
    </div>
  )
}
