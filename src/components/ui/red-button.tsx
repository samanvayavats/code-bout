import React from 'react'

const redButton = ({children}: {children: React.ReactNode}) => {
  return (
    <button
    className="font-mono text-xs font-semibold px-5 py-2 rounded-md bg-[#E63946] text-white hover:opacity-85 transition-opacity"
    >{children}</button>
  )
}

export default redButton
