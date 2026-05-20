import { useState, useEffect, useRef } from 'react'
import { NAVEEN } from '../data'

const SYSTEM = `You are NAVI, the AI assistant for M. Naveen's Linux portfolio. Answer questions about Naveen concisely.
Name: M. Naveen | Role: Aspiring Data Engineer | Email: ${NAVEEN.email} | Phone: ${NAVEEN.phone}
Education: B.Tech AI & Data Science, Stella Mary's College of Engineering (2025-2029), CGPA 8.5
Skills: ${NAVEEN.skills.join(', ')}
Projects: ${NAVEEN.projects.map(p => p.name + ': ' + p.desc).join(' | ')}
Achievements: ${NAVEEN.achievements.join(', ')}
GitHub: ${NAVEEN.github} | LinkedIn: ${NAVEEN.linkedin}
Keep answers to 2-3 sentences. Be friendly and professional.`

type Msg = { role: 'user' | 'ai'; text: string }

export function AIApp() {
  const [messages, setMessages] = useState<Msg[]>([{ role:'ai', text:"Hello! I'm NAVI — Naveen's AI assistant. Ask me anything about Naveen, his projects, skills, or how to get in touch!" }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(m => [...m, { role:'user', text:userMsg }])
    setLoading(true)
    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:300, system:SYSTEM, messages:[{ role:'user', content:userMsg }] }),
      })
      const data = await resp.json()
      const text = data.content?.map((c: { text?: string }) => c.text || '').join('') || 'Sorry, could not process that.'
      setMessages(m => [...m, { role:'ai', text }])
    } catch {
      setMessages(m => [...m, { role:'ai', text:'Connection error. Please try again.' }])
    }
    setLoading(false)
  }

  const quick = ['Tell me about Naveen', 'What projects has he built?', 'What are his skills?', 'How can I contact him?']

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', fontFamily:"'JetBrains Mono',monospace" }}>
      <div style={{ padding:'12px 16px', borderBottom:'1px solid rgba(0,255,247,0.1)', background:'rgba(255,0,128,0.05)', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'linear-gradient(135deg,#ff0080,#bf00ff)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:'14px', boxShadow:'0 0 15px rgba(255,0,128,0.4)' }}>◎</div>
          <div>
            <div style={{ color:'#fff', fontSize:'13px', fontWeight:'600' }}>NAVI</div>
            <div style={{ color:'#ff0080', fontSize:'9px', letterSpacing:'2px' }}>NAVEEN'S AI ASSISTANT</div>
          </div>
          <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:'4px' }}>
            <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#00ff88', animation:'blink 1s infinite' }} />
            <span style={{ color:'#00ff88', fontSize:'10px' }}>ONLINE</span>
          </div>
        </div>
      </div>
      <div style={{ flex:1, overflow:'auto', padding:'16px', display:'flex', flexDirection:'column', gap:'12px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display:'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth:'80%', padding:'10px 14px',
              borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
              background: m.role === 'user' ? 'rgba(0,255,247,0.12)' : 'rgba(255,0,128,0.08)',
              border: m.role === 'user' ? '1px solid rgba(0,255,247,0.3)' : '1px solid rgba(255,0,128,0.25)',
              color:'#ddd', fontSize:'12px', lineHeight:'1.7',
            }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display:'flex', gap:'6px', padding:'10px 14px', width:'fit-content' }}>
            {[0,1,2].map(i => (<div key={i} style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#ff0080', animation:`bounce 0.8s ease-in-out ${i*0.15}s infinite` }} />))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding:'8px 16px', display:'flex', gap:'6px', flexWrap:'wrap', borderTop:'1px solid rgba(255,255,255,0.04)', flexShrink:0 }}>
        {quick.map((q, i) => (<button key={i} onClick={() => setInput(q)} style={{ padding:'3px 10px', borderRadius:'12px', fontSize:'9px', cursor:'pointer', background:'rgba(255,0,128,0.08)', border:'1px solid rgba(255,0,128,0.2)', color:'#ff0080' }}>{q}</button>))}
      </div>
      <div style={{ padding:'12px 16px', borderTop:'1px solid rgba(0,255,247,0.1)', display:'flex', gap:'8px', flexShrink:0 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask about Naveen..." style={{ flex:1, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(0,255,247,0.2)', borderRadius:'8px', padding:'8px 12px', color:'#fff', outline:'none', fontFamily:"'JetBrains Mono',monospace", fontSize:'12px' }} />
        <button onClick={send} style={{ padding:'8px 16px', borderRadius:'8px', background:'linear-gradient(135deg,#ff0080,#bf00ff)', border:'none', color:'#fff', cursor:'pointer', fontSize:'12px' }}>↑</button>
      </div>
      <style>{`.blink{animation:blink 1s infinite} @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
    </div>
  )
}
