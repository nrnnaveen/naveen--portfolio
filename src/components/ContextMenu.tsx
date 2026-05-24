interface Props {
  x: number
  y: number
  onClose: () => void
  onAppOpen: (id: string) => void
}

const MENU_ITEMS = [
  { id:'about', label:'About Me', icon:'◉' },
  { id:'projects', label:'Projects Explorer', icon:'⬡' },
  { id:'terminal', label:'Open Terminal', icon:'⬛' },
  { id:'skills', label:'Skills Dashboard', icon:'◈' },
  { id:'resume', label:'Resume Viewer', icon:'☰' },
  { id:'ai', label:'Launch AI Assistant', icon:'◎' },
  { id:'contact', label:'Contact', icon:'✉' },
  { id:'github', label:'GitHub Dashboard', icon:'⌬' },
  { id:'settings', label:'Settings', icon:'⚙' },
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
        minWidth:'200px',
        padding:'6px',
        borderRadius:'4px',
        background:'#2a2a2a',
        border:'1px solid #444',
        boxShadow:'0 8px 16px rgba(0,0,0,0.8)',
        fontFamily:"'Liberation Mono',monospace",
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
            gap:'8px',
            padding:'8px 10px',
            border:'none',
            borderRadius:'2px',
            background:'transparent',
            color:'#bbb',
            cursor:'pointer',
            textAlign:'left',
            fontSize:'11px',
            transition:'background 0.1s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#404040')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <span style={{ color:'#0088ff', fontSize:'12px' }}>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  )
}
