'use client'

const Footer = () => {
  return (
    <div className="relative z-10 text-center py-6 text-xs text-zinc-500 bg-black border-b border-white/10">
        &copy; {new Date().getFullYear()} Random Chat | Anonymous video / voice chat
    </div>
  )
}

export default Footer