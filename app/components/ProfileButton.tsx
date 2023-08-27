'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { IconSelect } from '@tabler/icons-react'
import TheDialog from './TheDialog'

export default function ProfileButton() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="the-btn group flex select-none items-center gap-3">
        <div className="text-left">
          <p>herecomes_arima</p>
          <p className="text-xs">4096 pts</p>
        </div>
        <IconSelect className="transition-transform group-rdx-state-open:rotate-180" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="select-none border border-[#1e1e1e]">
          <DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
            <TheDialog title="Sign In" description="Sign in to your account.">
              <div className="flex flex-col gap-3">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  className="the-input"
                  placeholder="Username"
                />

                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="the-input"
                  placeholder="Password"
                />

                <button className="the-btn">Sign In</button>

                <p>Don&apos;t have an account?</p>
                <TheDialog
                  title="Sign Up"
                  description="Create a new user for you."
                >
                  <div className="flex flex-col gap-3">
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      type="text"
                      className="the-input"
                      placeholder="Username"
                    />

                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      className="the-input"
                      placeholder="Password"
                    />

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                      id="confirm-password"
                      type="password"
                      className="the-input"
                      placeholder="Confirm Password"
                    />

                    <button className="the-btn">Sign Up</button>
                  </div>
                </TheDialog>
              </div>
            </TheDialog>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
