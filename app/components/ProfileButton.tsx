'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { IconSelect } from '@tabler/icons-react'

export default function ProfileButton() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="the-btn group flex select-none items-center gap-3">
        <div className="text-left">
          <p>Akane</p>
          <p className="text-xs">4096 pts</p>
        </div>
        <IconSelect className="transition-transform group-rdx-state-open:rotate-180" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="select-none border border-[#1e1e1e]">
          <DropdownMenu.Item className="the-btn">Sign Out</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
