import { CircleAlert } from 'lucide-react'

type ErrorStateProps = {
  message: string
}

export const ErrorState = ({ message }: ErrorStateProps) => {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center rounded-lg border border-kx-danger bg-kx-surface px-5 py-10 text-sm text-kx-danger">
      <div className="flex flex-col items-center gap-4 text-center">
        <CircleAlert size={56} />
        <span className="max-w-md text-base font-medium leading-snug">{message}</span>
      </div>
    </div>
  )
}
