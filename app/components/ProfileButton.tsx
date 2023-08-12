'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { IconSelect } from '@tabler/icons-react'

export default function ProfileButton() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="group bg-white px-2 py-1 text-black hover:bg-sky-400">
        <div className="flex items-center gap-2">
          <div className="text-left">
            <p>Akane</p>
            <p className="text-xs">4096 pts</p>
          </div>
          <IconSelect className="transition-transform group-rdx-state-open:rotate-180" />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Sign Out</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
