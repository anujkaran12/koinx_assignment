import { LoaderCircle } from 'lucide-react'

export const LoaderState = () => {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center rounded-lg bg-kx-surface px-5 py-10 text-sm text-kx-muted">
      <div className="flex flex-col items-center gap-4 text-center">
        <LoaderCircle className="animate-spin text-kx-primary" size={56} strokeWidth={1.8} />
        <span className="text-base font-medium">Loading tax data...</span>
      </div>
    </div>
  )
}
