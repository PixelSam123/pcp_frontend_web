import * as Dialog from '@radix-ui/react-dialog'

export default function TheDialog({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="the-btn block w-full">{title}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1e1e1e]">
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
