import { LoaderCircle } from 'lucide-react'

export const LoaderState = () => {
  return (
    <div className="rounded-lg bg-kx-surface p-5 text-sm text-kx-muted">
      <div className="flex items-center gap-2">
        <LoaderCircle className="animate-spin text-kx-primary" size={18} />
        <span>Loading tax data...</span>
      </div>
    </div>
  )
}
