import * as Dialog from '@radix-ui/react-dialog'

export default function TheDialog({
  title,
  description,
  open,
  onOpenChange,
  noTrigger,
  normalWidth,
  children,
}: {
  title: string
  description: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  noTrigger?: boolean
  normalWidth?: boolean
  children: React.ReactNode
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {noTrigger ? (
        ''
      ) : (
        <Dialog.Trigger
          className={`the-btn block ${normalWidth ? '' : 'w-full'}`}
        >
          {title}
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-10 max-h-screen -translate-x-1/2 -translate-y-1/2 overflow-y-scroll bg-[#1e1e1e]">
          <div className="the-card space-y-3">
            <Dialog.Title className="font-bold">{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>

            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
