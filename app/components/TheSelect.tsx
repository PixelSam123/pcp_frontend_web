'use client'

import { IconCheck, IconSelect } from '@tabler/icons-react'
import * as Select from '@radix-ui/react-select'

export default function TheSelect({
  value,
  onValueChange,
  options,
  className,
}: {
  value: string
  onValueChange: Select.SelectProps['onValueChange']
  options: { text: string; value: string }[]
  className?: string
}) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        className={`the-btn group flex items-center justify-between gap-x-3 ${
          className ?? ''
        }`}
      >
        <Select.Value />
        <Select.Icon>
          <IconSelect className="inline-block transition-transform group-rdx-state-open:rotate-180" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.Viewport className="select-none border border-[#1e1e1e]">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="the-btn flex items-center justify-between gap-x-3"
              >
                <Select.ItemText>{option.text}</Select.ItemText>
                <Select.ItemIndicator>
                  <IconCheck />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
