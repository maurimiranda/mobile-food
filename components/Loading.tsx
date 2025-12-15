export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-medium text-gray-600">Loading permits...</p>
        <p className="text-sm text-gray-400">Fetching data from SF Gov API</p>
      </div>
    </div>
  );
}
