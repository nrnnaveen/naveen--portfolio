import { useState } from 'react'
import { useInterval } from '../hooks/useInterval'

export function SysMonApp() {
  const [cpu, setCpu] = useState(45)
  const [ram, setRam] = useState(62)
  const [gpu, setGpu] = useState(30)
  const [net, setNet] = useState(15)
  useInterval(() => {
    setCpu(c => Math.min(95, Math.max(10, c + (Math.random()-0.5)*10)))
    setRam(r => Math.min(90, Math.max(40, r + (Math.random()-0.5)*5)))
    setGpu(g => Math.min(80, Math.max(5,  g + (Math.random()-0.5)*8)))
    setNet(n => Math.min(100,Math.max(0,  n + (Math.random()-0.5)*20)))
  }, 1500)
  const bars = [{ label:'CPU',val:cpu,color:'#ff6b35' },{ label:'RAM',val:ram,color:'#00fff7' },{ label:'GPU',val:gpu,color:'#bf00ff' },{ label:'NET',val:net,color:'#00ff88' }]
  const procs = [{ name:'hyprland',pid:'1234',cpu:'2.1%',mem:'128MB' },{ name:'python3',pid:'5678',cpu:'8.4%',mem:'256MB' },{ name:'node',pid:'9012',cpu:'3.2%',mem:'180MB' },{ name:'postgres',pid:'3456',cpu:'1.5%',mem:'96MB' },{ name:'chromium',pid:'7890',cpu:'12.3%',mem:'512MB' }]
  return (
    <div style={{ padding:'20px', fontFamily:"'JetBrains Mono',monospace", overflow:'auto', height:'100%', color:'#ccc' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'20px' }}>
        {bars.map((b, i) => (
          <div key={i} style={{ padding:'14px', borderRadius:'8px', background:'rgba(255,255,255,0.02)', border:`1px solid ${b.color}22` }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
              <span style={{ color:b.color, fontSize:'11px', letterSpacing:'1px' }}>{b.label}</span>
              <span style={{ color:'#fff', fontSize:'13px', fontWeight:'bold' }}>{Math.round(b.val)}%</span>
            </div>
            <div style={{ height:'6px', background:'rgba(255,255,255,0.06)', borderRadius:'3px', overflow:'hidden' }}>
              <div style={{ height:'100%', background:`linear-gradient(90deg,${b.color},${b.color}88)`, width:`${b.val}%`, transition:'width 1s ease', boxShadow:`0 0 8px ${b.color}66` }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ color:'#555', fontSize:'10px', letterSpacing:'2px', marginBottom:'10px' }}>PROCESSES</div>
      <div style={{ borderRadius:'8px', border:'1px solid rgba(255,255,255,0.06)', overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', background:'rgba(0,255,247,0.05)', padding:'8px 12px' }}>
          {['PROCESS','PID','CPU','MEM'].map((h, i) => (<span key={i} style={{ color:'#00fff7', fontSize:'10px', letterSpacing:'1px' }}>{h}</span>))}
        </div>
        {procs.map((p, i) => (
          <div key={i} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', padding:'8px 12px', borderTop:'1px solid rgba(255,255,255,0.04)', background: i%2===0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
            <span style={{ color:'#ccc', fontSize:'11px' }}>{p.name}</span>
            <span style={{ color:'#555', fontSize:'11px' }}>{p.pid}</span>
            <span style={{ color:'#ff6b35', fontSize:'11px' }}>{p.cpu}</span>
            <span style={{ color:'#00fff7', fontSize:'11px' }}>{p.mem}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
