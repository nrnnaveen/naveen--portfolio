const levels: Record<string, number> = {
  Python:88, PostgreSQL:75, MySQL:78, SQL:85, IoT:65,
  HTML5:80, 'Web Designing':72, 'Data Analysis':83, Git:76,
  'MS Word':90, 'MS Excel':88, 'MS PowerPoint':85,
}
const cats = [
  { name:'Languages & DB', skills:['Python','SQL','MySQL','PostgreSQL'], color:'#00fff7' },
  { name:'Web & Design',   skills:['HTML5','Web Designing'],             color:'#bf00ff' },
  { name:'Data & Analysis',skills:['Data Analysis','IoT'],               color:'#00ff88' },
  { name:'Tools',          skills:['Git','MS Word','MS Excel','MS PowerPoint'], color:'#ff6b35' },
]
export function SkillsApp() {
  return (
    <div style={{ padding:'24px', fontFamily:"'JetBrains Mono',monospace", overflow:'auto', height:'100%' }}>
      <div style={{ color:'#00fff7', fontSize:'11px', letterSpacing:'2px', marginBottom:'20px' }}>TECHNICAL SKILLS</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
        {cats.map((cat, ci) => (
          <div key={ci} style={{ padding:'16px', borderRadius:'10px', background:'rgba(255,255,255,0.02)', border:`1px solid ${cat.color}22` }}>
            <div style={{ color:cat.color, fontSize:'10px', letterSpacing:'2px', marginBottom:'14px' }}>{cat.name}</div>
            {cat.skills.map((s, i) => (
              <div key={i} style={{ marginBottom:'12px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'4px' }}>
                  <span style={{ color:'#ccc', fontSize:'11px' }}>{s}</span>
                  <span style={{ color:cat.color, fontSize:'10px' }}>{levels[s]}%</span>
                </div>
                <div style={{ height:'4px', background:'rgba(255,255,255,0.06)', borderRadius:'2px', overflow:'hidden' }}>
                  <div style={{
                    height:'100%', borderRadius:'2px',
                    background:`linear-gradient(90deg,${cat.color},${cat.color}88)`,
                    width:`${levels[s]}%`, boxShadow:`0 0 6px ${cat.color}88`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
