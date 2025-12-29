'use client'

interface ProcessingStatusProps {
  status: 'idle' | 'processing' | 'success' | 'error'
  message?: string
  progress?: number
}

export default function ProcessingStatus({
  status,
  message,
  progress,
}: ProcessingStatusProps) {
  if (status === 'idle') return null

  return (
    <div className="mt-6 p-4 rounded-lg border">
      {status === 'processing' && (
        <div className="flex items-center space-x-3">
          <div className="spinner w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full"></div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">
              {message || 'Processing your file...'}
            </p>
            {progress !== undefined && (
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="flex items-center space-x-3 text-green-700">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="text-sm font-medium">{message || 'Processing complete!'}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center space-x-3 text-red-700">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <p className="text-sm font-medium">
            {message || 'An error occurred. Please try again.'}
          </p>
        </div>
      )}
    </div>
  )
}

