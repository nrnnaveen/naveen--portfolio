import { NAVEEN } from '../data'
export function GitHubApp() {
  const stats = [{ label:'Repositories',val:'12',color:'#00fff7' },{ label:'Commits',val:'247',color:'#00ff88' },{ label:'Stars',val:'8',color:'#ffcc00' },{ label:'Followers',val:'15',color:'#bf00ff' }]
  return (
    <div style={{ padding:'24px', fontFamily:"'JetBrains Mono',monospace", overflow:'auto', height:'100%', color:'#ccc' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
        <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'linear-gradient(135deg,#00fff7,#bf00ff)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', color:'#000', fontWeight:'bold' }}>N</div>
        <div>
          <div style={{ color:'#fff', fontSize:'14px', fontWeight:'600' }}>nrnnaveen</div>
          <a href={`https://${NAVEEN.github}`} target="_blank" rel="noopener noreferrer" style={{ color:'#00fff7', fontSize:'11px', textDecoration:'none' }}>{NAVEEN.github}</a>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'10px', marginBottom:'20px' }}>
        {stats.map((s, i) => (<div key={i} style={{ padding:'12px', borderRadius:'8px', background:'rgba(255,255,255,0.02)', border:`1px solid ${s.color}22`, textAlign:'center' }}><div style={{ color:s.color, fontSize:'20px', fontWeight:'bold' }}>{s.val}</div><div style={{ color:'#555', fontSize:'10px', marginTop:'4px' }}>{s.label}</div></div>))}
      </div>
      <div style={{ color:'#555', fontSize:'10px', letterSpacing:'2px', marginBottom:'12px' }}>PINNED REPOSITORIES</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
        {NAVEEN.projects.slice(0,4).map((p, i) => (
          <div key={i} style={{ padding:'14px', borderRadius:'8px', background:'rgba(255,255,255,0.02)', border:`1px solid ${p.color}22` }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'6px' }}><span style={{ color:p.color }}>⬡</span><span style={{ color:'#00fff7', fontSize:'12px' }}>{p.name}</span></div>
            <div style={{ color:'#666', fontSize:'11px', lineHeight:'1.5' }}>{p.desc.slice(0,80)}...</div>
            <div style={{ display:'flex', gap:'8px', marginTop:'10px' }}>
              {p.tech.slice(0,2).map((t, j) => (<span key={j} style={{ fontSize:'9px', color:'#555', display:'flex', alignItems:'center', gap:'3px' }}><span style={{ width:'8px', height:'8px', borderRadius:'50%', background:p.color, display:'inline-block' }} />{t}</span>))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
