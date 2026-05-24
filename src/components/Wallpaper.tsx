export function Wallpaper() {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:0, overflow:'hidden' }}>
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
      }} />
    </div>
  )
}
