import { CircleAlert } from 'lucide-react'

type ErrorStateProps = {
  message: string
}

export const ErrorState = ({ message }: ErrorStateProps) => {
  return (
    <div className="rounded-lg border border-kx-danger bg-kx-surface p-5 text-sm text-kx-danger">
      <div className="flex items-center gap-2">
        <CircleAlert size={18} />
        <span>{message}</span>
      </div>
    </div>
  )
}
