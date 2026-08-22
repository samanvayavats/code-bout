import React from 'react'

const page = () => {
  return (
    <div>
      <section id='how' className='border-t border-[#1E1E2E] px-12 py-24'>
        <div className='flex flex-col items-center mb-16'>
          <p className='font-mono text-[11px] tracking-[3px] uppercase text-[#E63946] mb-4'>
            The flow
          </p>
          <h2 className='text-[clamp(28px,4vw,48px)] font-bold tracking-tight text-center max-w-xl'>
            From queue to winner in minutes
          </h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 max-w-5xl mx-auto border border-[#1E1E2E] rounded-xl overflow-hidden divide-x divide-y divide-[#1E1E2E]'>
          {[
            {
              step: '01',
              title: 'Join Queue',
              desc: 'Pick a topic and difficulty. Redis matches you with someone on the same problem.',
            },
            {
              step: '02',
              title: 'Battle Starts',
              desc: 'Both players join a WebSocket room. The problem loads simultaneously.',
            },
            {
              step: '03',
              title: 'Write & Submit',
              desc: 'Use the in-browser editor. Run against visible cases then submit for hidden ones.',
            },
            {
              step: '04',
              title: 'Judge0 Runs It',
              desc: 'Code runs in a sandbox. Time, memory, and correctness are measured.',
            },
            {
              step: '05',
              title: 'Winner Decided',
              desc: 'Correctness first. Then speed. Then memory. Best score wins the duel.',
            },
          ].map((c) => (
            <div key={c.step} className='bg-[#111118] p-8'>
              <div className='font-mono text-[11px] text-[#E63946] tracking-[2px] uppercase mb-4'>
                {c.step}
              </div>
              <div className='text-base font-semibold mb-2'>{c.title}</div>
              <div className='text-sm text-[#6B6B80] leading-relaxed'>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default page
