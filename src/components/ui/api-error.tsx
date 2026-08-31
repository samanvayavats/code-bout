'use client'

interface ApiErrorProps {
  message?: string
  onRetry?: () => void
}

const ApiError = ({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ApiErrorProps) => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='rounded-xl border border-red-500/20 bg-red-500/10 p-8 text-center'>
        <div className='text-4xl mb-4'>⚠️</div>

        <h2 className='text-xl font-semibold text-red-400'>Something went wrong</h2>

        <p className='mt-2 text-sm text-[#8E8EA8]'>{message}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            className='mt-5 rounded-md bg-[#E63946] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e36570]'
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export default ApiError
