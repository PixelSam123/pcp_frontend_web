import * as Dialog from '@radix-ui/react-dialog'
import { IconX } from '@tabler/icons-react'

export default function TheDialogPortal({
  title,
  description,
  children,
}: {
  title?: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50" />
      <Dialog.Content
        className="fixed left-1/2 top-1/2 z-10 max-h-[calc(100vh-1.5rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-[#1e1e1e]"
      >
        <Dialog.Close className="fixed top-3 right-3"><IconX /></Dialog.Close>

        <div className="the-card space-y-3">
          {title && <Dialog.Title className="font-bold">{title}</Dialog.Title>}
          {description && (
            <Dialog.Description>{description}</Dialog.Description>
          )}

          {children}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
