import React from 'react'

const footer = () => {
  return (
    <div>
      {/* ── FOOTER ── */}
      <footer className=" fixed bottom-0 right-0 left-0  border-t border-[#1E1E2E] bg-[#111118] px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-sm font-semibold">
          Code<span className="text-[#E63946]">Duel</span>
        </span>
        <span className="text-xs text-[#6B6B80]">
          Built with Next.js · PostgreSQL · Redis · WebSocket · Judge0
        </span>
      </footer>
    </div>
  )
}

export default footer
