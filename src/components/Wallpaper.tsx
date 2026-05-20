export function Wallpaper() {
  const orbs = [
    { x:'10%', y:'20%', c:'rgba(0,255,247,0.08)', size:'300px', dur:6 },
    { x:'80%', y:'60%', c:'rgba(191,0,255,0.06)', size:'400px', dur:8 },
    { x:'50%', y:'10%', c:'rgba(0,255,136,0.04)', size:'250px', dur:10 },
  ]
  return (
    <div style={{ position:'fixed', inset:0, zIndex:0, overflow:'hidden' }}>
      <div style={{
        position:'absolute', inset:0,
        background:'radial-gradient(ellipse at 20% 50%,rgba(0,255,247,0.06) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(191,0,255,0.08) 0%,transparent 50%),radial-gradient(ellipse at 60% 80%,rgba(0,255,136,0.04) 0%,transparent 50%),#050508',
      }} />
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:'linear-gradient(rgba(0,255,247,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,247,0.03) 1px,transparent 1px)',
        backgroundSize:'60px 60px',
      }} />
      {orbs.map((o, i) => (
        <div key={i} style={{
          position:'absolute', left:o.x, top:o.y,
          width:o.size, height:o.size, borderRadius:'50%',
          background:o.c, filter:'blur(80px)',
          animation:`floatOrb ${o.dur}s ease-in-out infinite alternate`,
        }} />
      ))}
    </div>
  )
}
