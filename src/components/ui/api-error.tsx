import React from 'react'

const page = (error: any) => {
  return (
    <main className='flex min-h-screen items-center justify-center bg-[#07070A] px-6'>
      <section
        role='alert'
        className='w-full max-w-md rounded-2xl border border-red-500/20 bg-[#111118] p-8 text-center shadow-2xl shadow-black/30'
      >
        <div className='mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-2xl font-bold text-red-400'>
          !
        </div>
        <h2 className='text-xl font-semibold text-white'>Something went wrong</h2>
        <p className='mt-3 text-sm leading-6 text-[#9292A6]'>
          We couldn&apos;t load this battle. Please try again.
        </p>
        <p className='mt-4 rounded-lg bg-red-500/5 px-4 py-3 text-sm text-red-300'>{error}</p>
        <button
          type='button'
          onClick={() => window.location.reload()}
          className='mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#07070A] transition hover:bg-[#D8D8E0] focus:outline-none focus:ring-2 focus:ring-white/50'
        >
          Try again
        </button>
      </section>
    </main>
  )
}

export default page
