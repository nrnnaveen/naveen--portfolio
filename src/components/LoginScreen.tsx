import { useState } from 'react'
import { MatrixRain } from './MatrixRain'
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
      background:'radial-gradient(ellipse at 50% 30%,#0d0d1a 0%,#000 70%)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      fontFamily:"'JetBrains Mono',monospace",
      opacity: unlocking ? 0 : 1, transition:'opacity 0.8s ease',
    }}>
      <MatrixRain />
      <div style={{ zIndex:10, textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'24px' }}>
        <div style={{
          width:'96px', height:'96px', borderRadius:'50%',
          background:'linear-gradient(135deg,#00fff7,#bf00ff)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'36px', fontWeight:'bold', color:'#000',
          boxShadow:'0 0 40px rgba(0,255,247,0.5),0 0 80px rgba(191,0,255,0.3)',
          animation:'pulseAvatar 2s ease-in-out infinite',
        }}>N</div>
        <div>
          <div style={{ color:'#fff', fontSize:'22px', fontWeight:'600', letterSpacing:'2px' }}>M. NAVEEN</div>
          <div style={{ color:'#00fff7', fontSize:'12px', letterSpacing:'3px', marginTop:'4px' }}>ASPIRING DATA ENGINEER</div>
        </div>
        <div
          onClick={handleLogin}
          style={{
            width:'56px', height:'56px', borderRadius:'50%',
            border:'2px solid rgba(0,255,247,0.4)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#00fff7', fontSize:'22px', cursor:'pointer',
            animation:'fpPulse 1.5s ease-in-out infinite',
          }}
          title="Click to unlock"
        >◎</div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'12px' }}>
          <input
            type="password"
            placeholder="Enter password or press Enter..."
            value={pass}
            onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              background:'rgba(255,255,255,0.05)', border:'1px solid rgba(0,255,247,0.3)',
              borderRadius:'8px', padding:'10px 16px', color:'#00fff7',
              fontFamily:"'JetBrains Mono',monospace", fontSize:'13px',
              outline:'none', width:'260px', textAlign:'center', backdropFilter:'blur(10px)',
            }}
          />
          <button onClick={handleLogin} style={{
            background:'linear-gradient(135deg,rgba(0,255,247,0.15),rgba(191,0,255,0.15))',
            border:'1px solid rgba(0,255,247,0.4)', borderRadius:'8px',
            padding:'8px 32px', color:'#00fff7', cursor:'pointer',
            fontFamily:"'JetBrains Mono',monospace", fontSize:'12px', letterSpacing:'2px',
          }}>UNLOCK</button>
        </div>
        <div style={{ color:'#333', fontSize:'11px' }}>Naveen-OS — AI & Data Science Workstation</div>
      </div>
    </div>
  )
}
