import { useState, useEffect } from 'react'

const BOOT_LINES = [
  '[  0.000000] Booting Naveen-OS kernel 6.9.1-arch1-1',
  '[  0.000001] BIOS-provided physical memory map initialized',
  '[  0.000012] ACPI: RSDP 0x00000000000F05A0 000024 (v02 BOCHS)',
  '[  0.000034] PCI: Using configuration type 1 for base access',
  '[  0.000089] clocksource: tsc-early: mask: 0xffffffffffffffff',
  '[  0.000156] Initializing cgroup subsystems: cpuset memory io blkio',
  '[  0.000234] SLUB: HWalign=64, Order=0-3, MinObjects=0, CPUs=8',
  '[  0.001200] Loading module: ai_engine.ko ✓',
  '[  0.001890] Loading module: data_science.ko ✓',
  '[  0.002100] Loading module: neural_network.ko ✓',
  '[  0.003000] Starting systemd services...',
  '[  0.004500] Started NetworkManager.service ✓',
  '[  0.005100] Started PipeWire.service ✓',
  '[  0.006200] Started Wayland compositor (Hyprland) ✓',
  '[  0.007000] naveen-os login: ● Welcome, M. Naveen',
  '[  0.008000] ████████████████████ NAVEEN-OS LOADED',
]

interface Props { onDone: () => void }

export function BootScreen({ onDone }: Props) {
  const [lines, setLines] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines(l => [...l, BOOT_LINES[i] ?? ''])
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100))
        i++
      } else {
        clearInterval(id)
        setTimeout(() => setDone(true), 600)
        setTimeout(() => onDone(), 1200)
      }
    }, 90)
    return () => clearInterval(id)
  }, [onDone])

  return (
    <div style={{
      position:'fixed', inset:0, background:'#000', zIndex:9999,
      display:'flex', flexDirection:'column', justifyContent:'center',
      alignItems:'flex-start', padding:'40px 60px',
      fontFamily:"'JetBrains Mono',monospace",
      opacity: done ? 0 : 1, transition:'opacity 0.6s ease',
    }}>
      <div style={{ marginBottom:'32px', display:'flex', alignItems:'center', gap:'16px' }}>
        <div style={{
          width:'48px', height:'48px', borderRadius:'50%',
          border:'2px solid #00fff7', display:'flex', alignItems:'center', justifyContent:'center',
          color:'#00fff7', fontSize:'20px', fontWeight:'bold', boxShadow:'0 0 20px #00fff7',
        }}>N</div>
        <div>
          <div style={{ color:'#00fff7', fontSize:'18px', fontWeight:'bold', letterSpacing:'3px' }}>NAVEEN-OS</div>
          <div style={{ color:'#666', fontSize:'11px' }}>v2025.1 — AI & Data Science Edition</div>
        </div>
      </div>
      <div style={{ width:'100%', maxWidth:'700px' }}>
        {lines.map((l, i) => {
          const line = l || ''
          return (
          <div key={i} style={{
            color: line.includes('✓') ? '#00ff88' : line.includes('NAVEEN') ? '#00fff7' : '#4ade80',
            fontSize:'12px', lineHeight:'1.7',
            opacity:0, animation:`fadeInLine 0.1s ease ${i * 0.05}s forwards`,
          }}>{line}</div>
          )
        })}
      </div>
      <div style={{ marginTop:'32px', width:'100%', maxWidth:'700px' }}>
        <div style={{ color:'#666', fontSize:'11px', marginBottom:'6px' }}>Loading... {progress}%</div>
        <div style={{ height:'3px', background:'#111', borderRadius:'2px', overflow:'hidden' }}>
          <div style={{
            height:'100%', background:'linear-gradient(90deg,#00fff7,#bf00ff)',
            width:`${progress}%`, transition:'width 0.1s ease', boxShadow:'0 0 10px #00fff7',
          }} />
        </div>
      </div>
    </div>
  )
}
