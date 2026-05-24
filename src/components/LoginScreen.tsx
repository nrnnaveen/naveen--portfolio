import { useState } from 'react'
import { NAVEEN } from '../data'

interface Props { onLogin: () => void }

export function LoginScreen({ onLogin }: Props) {
  const [pass, setPass] = useState('')
  const [unlocking, setUnlocking] = useState(false)

  const handleLogin = () => {
    setUnlocking(true)
    setTimeout(() => onLogin(), 800)
  }

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:9998,
      background:'#000',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      fontFamily:"'Liberation Mono',monospace",
      opacity: unlocking ? 0 : 1, transition:'opacity 0.8s ease',
    }}>
      <div style={{ zIndex:10, textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'24px' }}>
        <div>
          <div style={{ color:'#fff', fontSize:'20px', fontWeight:'normal', letterSpacing:'1px' }}>naveen@linux</div>
          <div style={{ color:'#888', fontSize:'13px', letterSpacing:'1px', marginTop:'4px' }}>Linux login</div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'12px' }}>
          <div style={{ color:'#888', fontSize:'12px' }}>Login</div>
          <input
            type="password"
            placeholder="Password:"
            value={pass}
            onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              background:'transparent', border:'none',
              color:'#fff',
              fontFamily:"'Liberation Mono',monospace", fontSize:'13px',
              outline:'none', width:'220px', textAlign:'left',
              borderBottom:'1px solid #888', paddingBottom:'4px'
            }}
          />
          <button onClick={handleLogin} style={{
            background:'transparent',
            border:'1px solid #888', borderRadius:'2px',
            padding:'6px 20px', color:'#fff', cursor:'pointer',
            fontFamily:"'Liberation Mono',monospace", fontSize:'12px',
            marginTop:'8px'
          }}>Login</button>
        </div>
        <div style={{ color:'#444', fontSize:'11px', marginTop:'16px' }}>Naveen-OS Workstation</div>
      </div>
    </div>
  )
}
