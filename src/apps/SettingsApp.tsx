import { useState } from 'react'
export function SettingsApp() {
  const [theme, setTheme] = useState('cyber')
  const [particles, setParticles] = useState(true)
  const [matrix, setMatrix] = useState(true)
  return (
    <div style={{ padding:'24px', fontFamily:"'JetBrains Mono',monospace", overflow:'auto', height:'100%', color:'#ccc' }}>
      <div style={{ color:'#00fff7', fontSize:'11px', letterSpacing:'2px', marginBottom:'20px' }}>SYSTEM SETTINGS</div>
      <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
        <div style={{ padding:'14px', borderRadius:'8px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(0,255,247,0.1)' }}>
          <div style={{ color:'#aaa', fontSize:'11px', marginBottom:'8px' }}>Theme</div>
          <div style={{ display:'flex', gap:'6px' }}>
            {['cyber','nord','gruvbox','dracula'].map(o => (
              <button key={o} onClick={() => setTheme(o)} style={{ padding:'4px 12px', borderRadius:'6px', cursor:'pointer', fontSize:'11px', background: theme===o ? 'rgba(0,255,247,0.15)' : 'rgba(255,255,255,0.03)', border: theme===o ? '1px solid rgba(0,255,247,0.5)' : '1px solid rgba(255,255,255,0.08)', color: theme===o ? '#00fff7' : '#666' }}>{o}</button>
            ))}
          </div>
        </div>
        {[{ label:'Particle Effects', val:particles, set:setParticles },{ label:'Matrix Rain', val:matrix, set:setMatrix }].map((t, i) => (
          <div key={i} style={{ padding:'14px', borderRadius:'8px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(0,255,247,0.1)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ color:'#aaa', fontSize:'11px' }}>{t.label}</span>
            <div onClick={() => t.set((v: boolean) => !v)} style={{ width:'40px', height:'20px', borderRadius:'10px', cursor:'pointer', background: t.val ? 'rgba(0,255,247,0.3)' : 'rgba(255,255,255,0.05)', border:`1px solid ${t.val ? 'rgba(0,255,247,0.5)' : 'rgba(255,255,255,0.1)'}`, position:'relative' }}>
              <div style={{ width:'14px', height:'14px', borderRadius:'50%', background: t.val ? '#00fff7' : '#555', position:'absolute', top:'2px', left: t.val ? '22px' : '2px', transition:'all 0.3s', boxShadow: t.val ? '0 0 6px #00fff7' : 'none' }} />
            </div>
          </div>
        ))}
        <div style={{ padding:'14px', borderRadius:'8px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(0,255,247,0.1)' }}>
          <div style={{ color:'#aaa', fontSize:'11px', marginBottom:'8px' }}>SYSTEM INFO</div>
          {[['OS','Naveen-OS (Arch base)'],['WM','Hyprland'],['Shell','zsh 5.9'],['Theme','Tokyo Night + Custom'],['Font','JetBrains Mono']].map(([k,v], i) => (
            <div key={i} style={{ display:'flex', gap:'12px', marginBottom:'4px' }}><span style={{ color:'#555', fontSize:'11px', width:'60px' }}>{k}</span><span style={{ color:'#00fff7', fontSize:'11px' }}>{v}</span></div>
          ))}
        </div>
      </div>
    </div>
  )
}
