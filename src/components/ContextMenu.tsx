interface Props {
  x: number
  y: number
  onClose: () => void
  onAppOpen: (id: string) => void
}

const MENU_ITEMS = [
  { id:'about', label:'About Me', icon:'◉', color:'#00fff7' },
  { id:'projects', label:'Projects Explorer', icon:'⬡', color:'#bf00ff' },
  { id:'terminal', label:'Open Terminal', icon:'⬛', color:'#00ff88' },
  { id:'skills', label:'Skills Dashboard', icon:'◈', color:'#ff6b35' },
  { id:'resume', label:'Resume Viewer', icon:'☰', color:'#00c8ff' },
  { id:'ai', label:'Launch AI Assistant', icon:'◎', color:'#ff0080' },
  { id:'contact', label:'Contact', icon:'✉', color:'#ffcc00' },
  { id:'github', label:'GitHub Dashboard', icon:'⌬', color:'#888' },
  { id:'settings', label:'Settings', icon:'⚙', color:'#aaa' },
]

export function ContextMenu({ x, y, onClose, onAppOpen }: Props) {
  return (
    <div
      onClick={e => e.stopPropagation()}
      onContextMenu={e => e.preventDefault()}
      style={{
        position:'fixed',
        top:y,
        left:x,
        zIndex:1100,
        minWidth:'220px',
        padding:'8px',
        borderRadius:'12px',
        background:'rgba(5,10,20,0.92)',
        backdropFilter:'blur(24px)',
        border:'1px solid rgba(0,255,247,0.16)',
        boxShadow:'0 18px 40px rgba(0,0,0,0.45), 0 0 30px rgba(0,255,247,0.08)',
        fontFamily:"'JetBrains Mono',monospace",
      }}
    >
      {MENU_ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => {
            onAppOpen(item.id)
            onClose()
          }}
          style={{
            width:'100%',
            display:'flex',
            alignItems:'center',
            gap:'10px',
            padding:'10px 12px',
            border:'none',
            borderRadius:'8px',
            background:'transparent',
            color:'#d6d6d6',
            cursor:'pointer',
            textAlign:'left',
            fontSize:'11px',
          }}
        >
          <span style={{ color:item.color, fontSize:'13px' }}>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  )
}
