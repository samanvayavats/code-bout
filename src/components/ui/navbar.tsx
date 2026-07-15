import React from 'react'
import Link from 'next/link'
const page = () => {
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-4 border-b border-[#1E1E2E] bg-[#0A0A0F]/85 backdrop-blur-md'>
      <Link href={'/'}>
        <span className='font-mono text-lg font-semibold tracking-tight text-white'>
          Code<span className='text-[#E63946]'>Duel</span>
        </span>
      </Link>
      <div className='hidden md:flex gap-8'>
        {[
          { name: 'Problems', link: '/problems' },
          { name: 'Leaderboard', link: '#' },
          { name: 'How it works', link: '#' },
        ].map((l) => (
          <a
            key={l.name}
            href={l.link}
            className='text-xs text-[#6B6B80] uppercase tracking-widest hover:text-white transition-colors'
          >
            {l.name}
          </a>
        ))}
      </div>
      <Link
        href='/signup'
        className='font-mono text-xs font-semibold px-5 py-2 rounded-md bg-[#E63946] text-white hover:opacity-85 transition-opacity'
      >
        Start Dueling
      </Link>
    </nav>
  )
}

export default page
