export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          {/* Spinning arc */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500" />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
        <p className="text-lg font-medium text-gray-600">Loading permits...</p>
        <p className="text-sm text-gray-400">Fetching data from SF Gov API</p>
      </div>
    </div>
  );
}
