import React from 'react'
import RedButton from './red-button'
const signUpPage = ({type }:{type : boolean}) => {
  return (
    <div className=' flex items-center min-h-screen justify-center relative bottom-20 font-mono'>
        <form action="submit" className='flex flex-col items-center max-w-md border  border-[#1E1E2E] rounded-2xl bg-[#111118] overflow-hidden '>
             {
                type ?<label className='py-4 text-xl text-[#E63946]' >RE
                <span className='text-white'>
                    GISTER
                </span>
                </label>:<label className='py-4 text-xl text-[#E63946]' >LO
                <span className='text-white'>
                    GIN
                </span>
               </label>
             }
            
            <div className='p-4'>
                <label className='p-2 ' >USERNAME : </label>
                <input type="text" 
                className=' border-[#E63946] p-1 bg-transparent border bottom-1 rounded'
                />        
            </div>

           { type ?<div className=' p-6'>
                <label  className='p-2'>EMAIL &nbsp;&nbsp;:&nbsp;&nbsp;</label>
                <input type="email" 
                className='border-[#E63946] p-1 bg-transparent border bottom-1 rounded'
                />        
            </div>: <></>}
            
            <div className=' p-4'>
                <label className='p-2'>PASSWORD : </label>
                <input type="password" 
                className='border-[#E63946] p-1 bg-transparent border bottom-1 rounded'
                />        
            </div>
           
           <div className='p-4'>
            { type ? <RedButton>Register</RedButton> : <RedButton>LOGIN</RedButton>}
           </div>

        </form>
    </div>
  )
}

export default signUpPage
