'use client'

const Footer = () => {
  return (
    <div className="relative z-10 text-center py-6 text-xs bg-gradient-to-r from-indigo-950/50 to-slate-900/50 border-b border-cyan-400/20 text-cyan-300/70">
        &copy; {new Date().getFullYear()} Random Chat | Anonymous video / voice chat
    </div>
  )
}

export default Footer