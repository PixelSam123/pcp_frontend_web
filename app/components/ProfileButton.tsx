'use client'

import { pcpService } from '@/services/RealPcpService'
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { IconSelect } from '@tabler/icons-react'
import { useState } from 'react'
import useSWR from 'swr'
import TheDialogPortal from './TheDialogPortal'
import SignUpForm from './forms/SignUpForm'
import SignInForm from './forms/SignInForm'
import SignOutForm from './forms/SignOutForm'

export default function ProfileButton() {
  const {
    data: sessionData,
    error: sessionError,
    isLoading: sessionIsLoading,
  } = useSWR('session', () => pcpService.sessionUser())

  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignOutOpen, setIsSignOutOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="the-btn group flex select-none items-center gap-3">
          <div className="text-left">
            {sessionIsLoading ? (
              <>
                <p>Loading...</p>
                <p className="text-xs">Please wait</p>
              </>
            ) : sessionError ? (
              <>
                <p>Please log in</p>
                <p className="text-xs">No credentials</p>
              </>
            ) : (
              <>
                <p>{sessionData?.name}</p>
                <p className="text-xs">{sessionData?.points} pts</p>
              </>
            )}
          </div>
          <IconSelect className="transition-transform group-rdx-state-open:rotate-180" />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="select-none border border-[#1e1e1e]">
            <DropdownMenu.Item>
              <button
                onClick={() => setIsSignInOpen(true)}
                className="the-btn block w-full"
              >
                Sign In
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <button
                onClick={() => setIsSignOutOpen(true)}
                className="the-btn block w-full"
              >
                Sign Out
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <Dialog.Root open={isSignInOpen} onOpenChange={setIsSignInOpen}>
        <TheDialogPortal title="Sign In">
          <SignInForm />

          <p>Don&apos;t have an account?</p>
          <button
            onClick={() => {
              setIsSignInOpen(false)
              setIsSignUpOpen(true)
            }}
            className="the-btn block w-full"
          >
            Sign Up
          </button>
        </TheDialogPortal>
      </Dialog.Root>

      <Dialog.Root open={isSignOutOpen} onOpenChange={setIsSignOutOpen}>
        <TheDialogPortal title="Sign Out" description="Are you sure?">
          <SignOutForm />
        </TheDialogPortal>
      </Dialog.Root>

      <Dialog.Root open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
        <TheDialogPortal title="Sign Up">
          <SignUpForm />
        </TheDialogPortal>
      </Dialog.Root>
    </>
  )
}
