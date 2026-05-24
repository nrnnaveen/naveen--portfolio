import { Clock } from './Clock'

interface Props {
  onAppOpen: (id: string) => void
  activeWs: number
  setActiveWs: (n: number) => void
}

export function TopBar({ onAppOpen, activeWs, setActiveWs }: Props) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' })
  return (
    <div style={{
      position:'fixed', top:0, left:0, right:0, height:'28px', zIndex:1000,
      background:'#2a2a2a', 
      borderBottom:'1px solid #1a1a1a',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 8px', fontFamily:"'Liberation Mono',monospace", fontSize:'12px',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
        <span style={{ color:'#aaa' }}>Naveen-OS</span>
        <div style={{ display:'flex', gap:'2px' }}>
          {[0,1,2,3].map(i => (
            <button key={i} onClick={() => setActiveWs(i)} style={{
              padding:'2px 6px', borderRadius:'2px',
              background: activeWs === i ? '#444' : 'transparent',
              border: '1px solid #444',
              color: activeWs === i ? '#fff' : '#888',
              cursor:'pointer', fontSize:'11px', transition:'all 0.2s',
            }}>{i + 1}</button>
          ))}
        </div>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
        <span style={{ color:'#888', fontSize:'11px' }}>{dateStr}</span>
        <Clock />
      </div>
    </div>
  )
}
