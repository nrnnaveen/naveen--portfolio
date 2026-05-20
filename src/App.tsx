import { useState, useCallback } from 'react'
import { BootScreen }    from './components/BootScreen'
import { LoginScreen }   from './components/LoginScreen'
import { Wallpaper }     from './components/Wallpaper'
import { MatrixRain }    from './components/MatrixRain'
import { Particles }     from './components/Particles'
import { TopBar }        from './components/TopBar'
import { Dock }          from './components/Dock'
import { AppWindow }     from './components/AppWindow'
import { Desktop }       from './components/Desktop'
import { ContextMenu }   from './components/ContextMenu'
import { CursorGlow }    from './components/CursorGlow'

import { AboutApp }    from './apps/AboutApp'
import { ProjectsApp } from './apps/ProjectsApp'
import { TerminalApp } from './apps/TerminalApp'
import { SkillsApp }   from './apps/SkillsApp'
import { ResumeApp }   from './apps/ResumeApp'
import { AIApp }       from './apps/AIApp'
import { ContactApp }  from './apps/ContactApp'
import { GitHubApp }   from './apps/GitHubApp'
import { SysMonApp }   from './apps/SysMonApp'
import { SettingsApp } from './apps/SettingsApp'

const APP_MAP: Record<string, { title:string; icon:string; color:string; Component: React.ComponentType; pos:{x:number;y:number} }> = {
  about:    { title:'About Me',             icon:'◉', color:'#00fff7', Component:AboutApp,    pos:{x:80,y:50} },
  projects: { title:'Projects Explorer',    icon:'⬡', color:'#bf00ff', Component:ProjectsApp, pos:{x:120,y:60} },
  terminal: { title:'Terminal',             icon:'⬛', color:'#00ff88', Component:TerminalApp, pos:{x:160,y:80} },
  skills:   { title:'Skills Dashboard',     icon:'◈', color:'#ff6b35', Component:SkillsApp,   pos:{x:200,y:90} },
  resume:   { title:'Resume Viewer',        icon:'☰', color:'#00c8ff', Component:ResumeApp,   pos:{x:140,y:70} },
  ai:       { title:'NAVI — AI Assistant',  icon:'◎', color:'#ff0080', Component:AIApp,       pos:{x:240,y:100} },
  contact:  { title:'Contact',              icon:'✉', color:'#ffcc00', Component:ContactApp,  pos:{x:180,y:85} },
  github:   { title:'GitHub Dashboard',     icon:'⌬', color:'#888',    Component:GitHubApp,   pos:{x:220,y:95} },
  settings: { title:'Settings',             icon:'⚙', color:'#aaa',    Component:SettingsApp, pos:{x:260,y:110} },
  sysmon:   { title:'System Monitor',       icon:'▲', color:'#ff6b35', Component:SysMonApp,   pos:{x:300,y:120} },
}

type WindowState = { id:string; z:number; pos:{x:number;y:number} }

export default function App() {
  const [phase, setPhase] = useState<'boot'|'login'|'desktop'>('boot')
  const [windows, setWindows] = useState<WindowState[]>([])
  const [minimized, setMinimized] = useState<string[]>([])
  const [zCounter, setZCounter] = useState(100)
  const [contextMenu, setContextMenu] = useState<{x:number;y:number}|null>(null)
  const [activeWs, setActiveWs] = useState(0)

  const openApp = useCallback((id: string) => {
    const already = windows.find(w => w.id === id)
    if (already) {
      setZCounter(z => z + 1)
      setWindows(ws => ws.map(w => w.id === id ? { ...w, z:zCounter+1 } : w))
      setMinimized(m => m.filter(x => x !== id))
      return
    }
    if (minimized.includes(id)) { setMinimized(m => m.filter(x => x !== id)); return }
    const def = APP_MAP[id]
    if (!def) return
    setZCounter(z => z + 1)
    setWindows(ws => [...ws, { id, z:zCounter+1, pos:{ x:def.pos.x + ws.length*20, y:def.pos.y + ws.length*20 } }])
  }, [windows, minimized, zCounter])

  const closeApp    = (id: string) => setWindows(ws => ws.filter(w => w.id !== id))
  const minimizeApp = (id: string) => setMinimized(m => [...m, id])
  const focusApp    = (id: string) => { setZCounter(z => z+1); setWindows(ws => ws.map(w => w.id===id ? {...w,z:zCounter+1} : w)) }

  const openApps = windows.map(w => w.id)

  return (
    <div style={{ width:'100vw', height:'100vh', overflow:'hidden', background:'#000' }}>
      {phase === 'boot'  && <BootScreen  onDone={() => setPhase('login')} />}
      {phase === 'login' && <LoginScreen onLogin={() => setPhase('desktop')} />}
      {phase === 'desktop' && (
        <>
          <Wallpaper />
          <MatrixRain />
          <Particles />
          <Desktop onOpen={openApp} />
          <TopBar onAppOpen={openApp} activeWs={activeWs} setActiveWs={setActiveWs} />

          <div onContextMenu={e => { e.preventDefault(); setContextMenu({ x:e.clientX, y:e.clientY }) }} onClick={() => setContextMenu(null)} style={{ position:'fixed', inset:0, zIndex:2, pointerEvents:'all', background:'transparent' }} />

          {windows.filter(w => !minimized.includes(w.id)).map(w => {
            const def = APP_MAP[w.id]
            if (!def) return null
            const C = def.Component
            return (
              <AppWindow key={w.id} id={w.id} title={def.title} icon={def.icon} color={def.color} onClose={() => closeApp(w.id)} onMinimize={minimizeApp} initialPos={w.pos} zIndex={w.z} onFocus={() => focusApp(w.id)}>
                <C />
              </AppWindow>
            )
          })}

          <Dock onAppOpen={openApp} openApps={openApps.filter(id => !minimized.includes(id))} />

          {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={() => setContextMenu(null)} onAppOpen={openApp} />}

          {minimized.length > 0 && (
            <div style={{ position:'fixed', bottom:'80px', right:'16px', zIndex:900, display:'flex', flexDirection:'column', gap:'4px' }}>
              {minimized.map(id => {
                const def = APP_MAP[id]
                if (!def) return null
                return (
                  <div key={id} onClick={() => { setMinimized(m => m.filter(x => x !== id)); focusApp(id) }} style={{ padding:'6px 12px', borderRadius:'8px', background:'rgba(0,0,0,0.8)', backdropFilter:'blur(20px)', border:`1px solid ${def.color}33`, cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', fontFamily:"'JetBrains Mono',monospace" }}>
                    <span style={{ color:def.color, fontSize:'12px' }}>{def.icon}</span>
                    <span style={{ color:'#aaa', fontSize:'11px' }}>{def.title}</span>
                  </div>
                )
              })}
            </div>
          )}

          <CursorGlow />
        </>
      )}
    </div>
  )
}
