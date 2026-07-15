import React from 'react'

interface RedButtonProps {
  onClick?: () => void
  children: React.ReactNode
  isActive?: boolean
}

const RedButton: React.FC<RedButtonProps> = ({ children, onClick, isActive }) => {
  return (
    <button
      disabled={isActive}
      type='button'
      onClick={onClick}
      className={`font-mono text-xs font-semibold px-5 py-2 rounded-md ${isActive ? 'bg-[#ed828b] ' : 'bg-[#E63946]'} text-white hover:opacity-85 transition-opacity`}
    >
      {children}
    </button>
  )
}

export default RedButton
