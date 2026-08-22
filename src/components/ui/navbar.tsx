'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

import RedButton from './red-button'

const Navbar = () => {
  const { data: session, status } = useSession()

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-4 border-b border-[#1E1E2E] bg-[#0A0A0F]/85 backdrop-blur-md'>
      {/* Logo */}

      <Link href='/'>
        <span className='font-mono text-lg font-semibold tracking-tight text-white'>
          Code<span className='text-[#E63946]'>Duel</span>
        </span>
      </Link>

      {/* Navigation */}

      <div className='hidden md:flex gap-8'>
        {[
          {
            name: 'Problems',
            link: '/problems',
          },
          {
            name: 'Leaderboard',
            link: '/leaderboard',
          },
          {
            name: 'How it works',
            link: '/how-it-works',
          },
        ].map((l) => (
          <Link
            key={l.name}
            href={l.link}
            className='text-xs text-[#6B6B80] uppercase tracking-widest hover:text-white transition-colors'
          >
            {l.name}
          </Link>
        ))}
      </div>

      {/* Authentication */}

      {status === 'loading' ? (
        <div className='text-xs text-[#6B6B80]'>Loading...</div>
      ) : session ? (
        <button
          onClick={() => signOut()}
          className='text-xs uppercase tracking-widest text-[#6B6B80] hover:text-white'
        >
          Sign Out
        </button>
      ) : (
        <Link href='/sign-in'>
          <RedButton>Sign-In</RedButton>
        </Link>
      )}
    </nav>
  )
}

export default Navbar
