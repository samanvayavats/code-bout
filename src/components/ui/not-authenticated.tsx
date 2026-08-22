import React from 'react'

const page = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-[#07070A] text-white'>
      <h2 className='mb-4 text-2xl font-bold'>Authentication required</h2>
      <p className='mb-6 text-[#A0A0B0]'>Please sign in or sign up .</p>
      <div className='flex gap-4'>
        <a className='rounded bg-[#E63946] px-4 py-2 font-semibold text-black' href='/sign-in'>
          Sign in
        </a>
        <a
          className='rounded border border-[#E63946] px-4 py-2 font-semibold text-[#E63946]'
          href='sign-up'
        >
          Sign up
        </a>
      </div>
    </div>
  )
}

export default page
