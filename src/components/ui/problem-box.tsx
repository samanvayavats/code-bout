'use client'
import {useState} from 'react'
import RedButton from './red-button'
const problemBox = () => {
    const [count, setcount] = useState(1)
 
    return (
    <div 
     className="flex items-center gap-20 md:gap-56  lg:gap-72 xl:gap-80  px-4 py-2 border-2 border-[#1E1E2E]  rounded my-4 mx-2">
     <div className=''>1.</div>     
     <div className='text-[#E63946]'>Two-Sum </div>     
     <div>Easy</div>     
    <RedButton>Duel it</RedButton>
    </div>
  )
}

export default problemBox
