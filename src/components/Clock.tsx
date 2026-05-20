import { useState } from 'react'
import { useInterval } from '../hooks/useInterval'

export function Clock() {
  const [t, setT] = useState(new Date())
  useInterval(() => setT(new Date()), 1000)
  const p = (n: number) => String(n).padStart(2, '0')
  return (
    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'12px', color:'#00fff7', letterSpacing:'1px' }}>
      {p(t.getHours())}:{p(t.getMinutes())}:{p(t.getSeconds())}
    </span>
  )
}
