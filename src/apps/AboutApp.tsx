import { NAVEEN } from '../data'

export function AboutApp() {
  const contacts = [
    { icon:'✉', val:NAVEEN.email, color:'#00fff7' },
    { icon:'☏', val:NAVEEN.phone, color:'#00ff88' },
    { icon:'⌖', val:NAVEEN.location, color:'#bf00ff' },
  ]
  const socials = [
    { icon:'⌬', label:'GitHub',    url:`https://${NAVEEN.github}` },
    { icon:'◈', label:'LinkedIn',  url:`https://${NAVEEN.linkedin}` },
    { icon:'◉', label:'Portfolio', url:`https://${NAVEEN.portfolio}` },
  ]
  return (
    <div style={{ padding:'28px', fontFamily:"'JetBrains Mono',monospace", color:'#ccc', height:'100%', overflow:'auto' }}>
      <div style={{ display:'flex', gap:'28px', flexWrap:'wrap' }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'16px', minWidth:'160px' }}>
          <div style={{
            width:'100px', height:'100px', borderRadius:'50%',
            background:'linear-gradient(135deg,#00fff7,#bf00ff)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'40px', fontWeight:'bold', color:'#000',
            boxShadow:'0 0 30px rgba(0,255,247,0.4)',
          }}>N</div>
          <div style={{ textAlign:'center' }}>
            <div style={{ color:'#fff', fontSize:'16px', fontWeight:'bold', letterSpacing:'1px' }}>M. NAVEEN</div>
            <div style={{ color:'#00fff7', fontSize:'11px', marginTop:'2px', letterSpacing:'2px' }}>DATA ENGINEER</div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'6px', width:'100%' }}>
            {contacts.map((c, i) => (
              <div key={i} style={{ display:'flex', gap:'6px', alignItems:'flex-start', fontSize:'10px' }}>
                <span style={{ color:c.color }}>{c.icon}</span>
                <span style={{ color:'#999', wordBreak:'break-all' }}>{c.val}</span>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            {socials.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                padding:'4px 8px', background:'rgba(0,255,247,0.1)',
                border:'1px solid rgba(0,255,247,0.3)', borderRadius:'6px',
                color:'#00fff7', fontSize:'10px', textDecoration:'none',
              }} title={s.label}>{s.icon}</a>
            ))}
          </div>
        </div>
        <div style={{ flex:1, minWidth:'240px', display:'flex', flexDirection:'column', gap:'16px' }}>
          <div>
            <div style={{ color:'#00fff7', fontSize:'11px', letterSpacing:'2px', marginBottom:'8px', borderBottom:'1px solid rgba(0,255,247,0.2)', paddingBottom:'4px' }}>CAREER OBJECTIVE</div>
            <p style={{ fontSize:'12px', lineHeight:'1.8', color:'#aaa' }}>{NAVEEN.objective}</p>
          </div>
          <div>
            <div style={{ color:'#00fff7', fontSize:'11px', letterSpacing:'2px', marginBottom:'8px', borderBottom:'1px solid rgba(0,255,247,0.2)', paddingBottom:'4px' }}>EDUCATION</div>
            {NAVEEN.education.map((e, i) => (
              <div key={i} style={{ marginBottom:'10px', padding:'8px 10px', background:'rgba(0,255,247,0.03)', borderRadius:'6px', borderLeft:'2px solid #00fff7' }}>
                <div style={{ color:'#fff', fontSize:'12px', fontWeight:'600' }}>{e.label}</div>
                <div style={{ color:'#bf00ff', fontSize:'11px' }}>{e.place}</div>
                <div style={{ display:'flex', gap:'12px', marginTop:'2px' }}>
                  <span style={{ color:'#666', fontSize:'10px' }}>{e.year}</span>
                  <span style={{ color:'#00ff88', fontSize:'10px' }}>{e.score}</span>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color:'#00fff7', fontSize:'11px', letterSpacing:'2px', marginBottom:'8px', borderBottom:'1px solid rgba(0,255,247,0.2)', paddingBottom:'4px' }}>ACHIEVEMENTS</div>
            {NAVEEN.achievements.map((a, i) => (
              <div key={i} style={{ display:'flex', gap:'8px', alignItems:'flex-start', marginBottom:'4px' }}>
                <span style={{ color:'#ffcc00', fontSize:'10px', marginTop:'1px' }}>★</span>
                <span style={{ color:'#bbb', fontSize:'11px' }}>{a}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color:'#00fff7', fontSize:'11px', letterSpacing:'2px', marginBottom:'8px', borderBottom:'1px solid rgba(0,255,247,0.2)', paddingBottom:'4px' }}>LANGUAGES & HOBBIES</div>
            <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
              {[...NAVEEN.languages, ...NAVEEN.hobbies].map((x, i) => (
                <span key={i} style={{ padding:'2px 8px', background:'rgba(191,0,255,0.1)', border:'1px solid rgba(191,0,255,0.3)', borderRadius:'12px', color:'#bf00ff', fontSize:'10px' }}>{x}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
