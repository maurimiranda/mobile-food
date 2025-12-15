export default function Error({ message = "An unexpected error occurred." }: { message?: string }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-medium text-red-500">{message}</p>
      </div>
    </div>
  );
}
