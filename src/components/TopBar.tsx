import { Clock } from './Clock'

interface Props {
  onAppOpen: (id: string) => void
  activeWs: number
  setActiveWs: (n: number) => void
}

export function TopBar({ onAppOpen, activeWs, setActiveWs }: Props) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' })
  const indicators = [
    { icon:'▲', val:'45%', color:'#ff6b35', tip:'CPU' },
    { icon:'◉', val:'3.2G', color:'#00fff7', tip:'RAM' },
    { icon:'⌬', val:'72%', color:'#00ff88', tip:'Battery' },
    { icon:'◈', val:'', color:'#bf00ff', tip:'WiFi' },
  ]
  return (
    <div style={{
      position:'fixed', top:0, left:0, right:0, height:'30px', zIndex:1000,
      background:'rgba(0,0,0,0.8)', backdropFilter:'blur(20px)',
      borderBottom:'1px solid rgba(0,255,247,0.15)',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 12px', fontFamily:"'JetBrains Mono',monospace",
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
        <div style={{
          width:'20px', height:'20px', borderRadius:'50%',
          background:'linear-gradient(135deg,#00fff7,#bf00ff)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'10px', fontWeight:'bold', color:'#000', cursor:'pointer',
          boxShadow:'0 0 8px #00fff7',
        }}>⌂</div>
        <div style={{ display:'flex', gap:'4px' }}>
          {[0,1,2,3].map(i => (
            <button key={i} onClick={() => setActiveWs(i)} style={{
              padding:'1px 8px', borderRadius:'3px',
              background: activeWs === i ? 'rgba(0,255,247,0.2)' : 'transparent',
              border: activeWs === i ? '1px solid rgba(0,255,247,0.5)' : '1px solid transparent',
              color: activeWs === i ? '#00fff7' : '#666',
              cursor:'pointer', fontSize:'10px', transition:'all 0.2s',
            }}>{i + 1}</button>
          ))}
        </div>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
        <span style={{ color:'#555', fontSize:'11px' }}>{dateStr}</span>
        <Clock />
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
        {indicators.map((s, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:'3px', cursor:'default' }} title={s.tip}>
            <span style={{ color:s.color, fontSize:'9px' }}>{s.icon}</span>
            {s.val && <span style={{ color:'#888', fontSize:'10px' }}>{s.val}</span>}
          </div>
        ))}
        <div onClick={() => onAppOpen('notifications')} style={{
          width:'18px', height:'18px', borderRadius:'50%',
          background:'rgba(191,0,255,0.2)', display:'flex', alignItems:'center',
          justifyContent:'center', cursor:'pointer', color:'#bf00ff', fontSize:'10px',
        }}>●</div>
      </div>
    </div>
  )
}
