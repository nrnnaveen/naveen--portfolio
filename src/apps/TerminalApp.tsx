import { useState, useEffect, useRef } from 'react'
import type { JSX, KeyboardEvent } from 'react'
import { NAVEEN } from '../data'

const NEOFETCH = `
\x1b[36m  ███╗   ██╗ █████╗ ██╗   ██╗███████╗███████╗███╗   ██╗\x1b[0m
\x1b[36m  ████╗  ██║██╔══██╗██║   ██║██╔════╝██╔════╝████╗  ██║\x1b[0m
\x1b[36m  ██╔██╗ ██║███████║██║   ██║█████╗  █████╗  ██╔██╗ ██║\x1b[0m
\x1b[35m  ██║╚██╗██║██╔══██║╚██╗ ██╔╝██╔══╝  ██╔══╝  ██║╚██╗██║\x1b[0m
\x1b[35m  ██║ ╚████║██║  ██║ ╚████╔╝ ███████╗███████╗██║ ╚████║\x1b[0m
\x1b[35m  ╚═╝  ╚═══╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚══════╝╚═╝  ╚═══╝\x1b[0m

  \x1b[36mOS:\x1b[0m       Naveen-OS (Arch Linux base)
  \x1b[36mKernel:\x1b[0m   6.9.1-arch1-1 x86_64
  \x1b[36mWM:\x1b[0m       Hyprland (Wayland)
  \x1b[36mShell:\x1b[0m    zsh 5.9
  \x1b[36mRole:\x1b[0m     Aspiring Data Engineer
  \x1b[36mCollege:\x1b[0m  Stella Mary's College of Engineering
  \x1b[36mDegree:\x1b[0m   B.Tech AI & Data Science
  \x1b[36mCGPA:\x1b[0m     8.5
  \x1b[36mUptime:\x1b[0m   2025 days 🚀
`

const COMMANDS: Record<string, () => string> = {
  help: () => `\x1b[36mAvailable commands:\x1b[0m
  \x1b[32mwhoami\x1b[0m       - Display user info
  \x1b[32mneofetch\x1b[0m     - System info
  \x1b[32mabout\x1b[0m        - About Naveen
  \x1b[32mprojects\x1b[0m     - List projects
  \x1b[32mskills\x1b[0m       - List skills
  \x1b[32msocials\x1b[0m      - Social links
  \x1b[32mgithub\x1b[0m       - GitHub profile
  \x1b[32mlinkedin\x1b[0m     - LinkedIn profile
  \x1b[32mresume\x1b[0m       - Resume summary
  \x1b[32mcontact\x1b[0m      - Contact info
  \x1b[32mmatrix\x1b[0m       - Enter the Matrix
  \x1b[32mhack\x1b[0m         - Hacking sequence
  \x1b[32msudo\x1b[0m         - Try admin
  \x1b[32mshutdown\x1b[0m     - Shutdown
  \x1b[32mclear\x1b[0m        - Clear terminal`,
  whoami:   () => `\x1b[36mnaveen\x1b[0m — M. Naveen | Aspiring Data Engineer | AI & DS | Erode, Tamil Nadu`,
  neofetch: () => NEOFETCH,
  about:    () => `\x1b[36mM. NAVEEN\x1b[0m\n  ${NAVEEN.objective}\n  \x1b[35mLocation:\x1b[0m ${NAVEEN.location}\n  \x1b[35mPhone:\x1b[0m    ${NAVEEN.phone}\n  \x1b[35mEmail:\x1b[0m    ${NAVEEN.email}`,
  projects: () => NAVEEN.projects.map((p, i) => `  \x1b[36m${i+1}. ${p.name}\x1b[0m\n     ${p.desc}`).join('\n'),
  skills:   () => `\x1b[36mTechnical Skills:\x1b[0m\n  ${NAVEEN.skills.join('  •  ')}`,
  socials:  () => `  \x1b[36mGitHub:\x1b[0m    https://${NAVEEN.github}\n  \x1b[36mLinkedIn:\x1b[0m  https://${NAVEEN.linkedin}\n  \x1b[36mPortfolio:\x1b[0m https://${NAVEEN.portfolio}`,
  github:   () => `\x1b[36mGitHub:\x1b[0m https://${NAVEEN.github}`,
  linkedin: () => `\x1b[36mLinkedIn:\x1b[0m https://${NAVEEN.linkedin}`,
  resume:   () => `\x1b[36mRESUME — M. Naveen\x1b[0m\n  Degree: ${NAVEEN.degree}\n  College: ${NAVEEN.college}\n  CGPA: ${NAVEEN.cgpa}\n  Period: ${NAVEEN.period}`,
  contact:  () => `\x1b[36mContact:\x1b[0m\n  Email: ${NAVEEN.email}\n  Phone: ${NAVEEN.phone}\n  Location: ${NAVEEN.location}`,
  sudo:     () => `\x1b[31m[sudo] password for naveen:\x1b[0m\nSorry, user naveen is not in the sudoers file. This incident will be reported.`,
  matrix:   () => `\x1b[32mEntering the Matrix...\x1b[0m\nWake up, Naveen...\nThe Matrix has you...\nFollow the white rabbit 🐇`,
  hack:     () => `\x1b[31mINITIATING HACK SEQUENCE...\x1b[0m\n\x1b[32m[✓]\x1b[0m Bypassing firewall...\n\x1b[32m[✓]\x1b[0m Accessing mainframe...\n\x1b[32m[✓]\x1b[0m Decrypting data...\n\x1b[31m[!]\x1b[0m Just kidding. I'm a Data Engineer 😄`,
  shutdown: () => `\x1b[33mShutting down Naveen-OS...\x1b[0m\nSaving session...\nGoodbye!`,
}

type Line = { type: 'input' | 'output'; text: string }

function AnsiText({ text }: { text: string }) {
  const colorMap: Record<string, string | null> = { '0':null,'31':'#ff5f57','32':'#00ff88','33':'#ffcc00','35':'#bf00ff','36':'#00fff7' }
  const parts: JSX.Element[] = []
  const regex = /\x1b\[(\d+)m/g
  let last = 0, match: RegExpExecArray | null, color: string | null = null
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(<span key={last} style={color ? { color } : {}}>{text.slice(last, match.index)}</span>)
    color = colorMap[match[1]] ?? null
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(<span key={last} style={color ? { color } : {}}>{text.slice(last)}</span>)
  return <>{parts}</>
}

export function TerminalApp() {
  const [history, setHistory] = useState<Line[]>([{ type:'output', text:'Welcome to \x1b[36mNaveen-OS Terminal\x1b[0m v2025.1\nType \x1b[32mhelp\x1b[0m for available commands.\n' }])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [history])

  const run = (cmd: string) => {
    const c = cmd.trim().toLowerCase()
    setCmdHistory(h => [cmd, ...h])
    setHistIdx(-1)
    if (!c) { setHistory(h => [...h, { type:'input', text:cmd }]); return }
    if (c === 'clear') { setHistory([]); return }
    const fn = COMMANDS[c]
    const out = fn ? fn() : `\x1b[31mCommand not found:\x1b[0m ${cmd}\nType \x1b[32mhelp\x1b[0m for available commands.`
    setHistory(h => [...h, { type:'input', text:cmd }, { type:'output', text:out }])
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { run(input); setInput('') }
    else if (e.key === 'ArrowUp') { const i = Math.min(histIdx+1,cmdHistory.length-1); setHistIdx(i); setInput(cmdHistory[i]||'') }
    else if (e.key === 'ArrowDown') { const i = Math.max(histIdx-1,-1); setHistIdx(i); setInput(i===-1?'':cmdHistory[i]||'') }
  }

  return (
    <div onClick={() => inputRef.current?.focus()} style={{
      height:'100%', background:'rgba(0,5,0,0.95)', padding:'12px',
      overflow:'auto', cursor:'text', fontFamily:"'JetBrains Mono',monospace", fontSize:'12px', lineHeight:'1.6',
    }}>
      {history.map((h, i) => (
        <div key={i}>
          {h.type === 'input' && (
            <div>
              <span style={{ color:'#00fff7' }}>naveen</span>
              <span style={{ color:'#bf00ff' }}>@naveen-os</span>
              <span style={{ color:'#aaa' }}>:~$ </span>
              <span style={{ color:'#fff' }}>{h.text}</span>
            </div>
          )}
          {h.type === 'output' && (
            <div style={{ whiteSpace:'pre-wrap', paddingLeft:'2px' }}>
              <AnsiText text={h.text} />
            </div>
          )}
        </div>
      ))}
      <div style={{ display:'flex', alignItems:'center' }}>
        <span style={{ color:'#00fff7' }}>naveen</span>
        <span style={{ color:'#bf00ff' }}>@naveen-os</span>
        <span style={{ color:'#aaa' }}>:~$ </span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          style={{
            flex:1, background:'transparent', border:'none', outline:'none',
            color:'#fff', fontFamily:"'JetBrains Mono',monospace", fontSize:'12px', caretColor:'#00fff7',
          }}
          autoFocus
        />
      </div>
      <div ref={bottomRef} />
    </div>
  )
}
