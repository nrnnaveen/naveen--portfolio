import { useState } from 'react'
import { useInterval } from '../hooks/useInterval'

export function Clock() {
  const [t, setT] = useState(new Date())
  useInterval(() => setT(new Date()), 1000)
  const p = (n: number) => String(n).padStart(2, '0')
  return (
    <span style={{ fontFamily:"'Liberation Mono',monospace", fontSize:'11px', color:'#ccc', letterSpacing:'0.5px' }}>
      {p(t.getHours())}:{p(t.getMinutes())}:{p(t.getSeconds())}
    </span>
  )
}
