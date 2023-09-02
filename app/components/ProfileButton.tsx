'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { IconSelect } from '@tabler/icons-react'
import TheDialog from './TheDialog'
import SignUpDialog from './SignUpDialog'
import { FormEvent, useState } from 'react'
import { pcpService } from '@/services/RealPcpService'
import useSWR from 'swr'

export default function ProfileButton() {
  const {
    data: sessionData,
    error: sessionError,
    isLoading: sessionIsLoading,
  } = useSWR('session', () => pcpService.sessionUser())

  const [isSignInOpen, setIsSignInOpen] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const signIn = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setError('')
    setIsSuccess(false)

    try {
      await pcpService.sessionLogin(username, password)
      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const [isSignOutOpen, setIsSignOutOpen] = useState(false)

  const [signOutError, setSignOutError] = useState('')
  const [isSignOutSuccess, setIsSignOutSuccess] = useState(false)

  const signOut = async () => {
    setSignOutError('')
    setIsSignOutSuccess(false)

    try {
      await pcpService.sessionLogout()
      setIsSignOutSuccess(true)
    } catch (err) {
      setSignOutError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

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

      <TheDialog
        noTrigger
        open={isSignInOpen}
        onOpenChange={setIsSignInOpen}
        title="Sign In"
        description="Sign in to your account."
      >
        <form onSubmit={signIn} className="flex flex-col gap-3">
          {error ? (
            <div className="bg-red-800 px-3 py-1">
              <p>{error}</p>
            </div>
          ) : (
            ''
          )}
          {isSuccess ? (
            <div className="bg-green-500 px-3 py-1">
              <p>Success</p>
            </div>
          ) : (
            ''
          )}

          <label htmlFor="username">Username</label>
          <input
            required
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
            className="the-input"
          />

          <label htmlFor="password">Password</label>
          <input
            required
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            className="the-input"
          />

          <button type="submit" className="the-btn">
            Sign In
          </button>

          <p>Don&apos;t have an account?</p>
          <SignUpDialog />
        </form>
      </TheDialog>

      <TheDialog
        noTrigger
        open={isSignOutOpen}
        onOpenChange={setIsSignOutOpen}
        title="Sign Out"
        description="Sign out of your account. Are you sure?"
      >
        {signOutError ? (
          <div className="bg-red-800 px-3 py-1">
            <p>{signOutError}</p>
          </div>
        ) : (
          ''
        )}
        {isSignOutSuccess ? (
          <div className="bg-green-500 px-3 py-1">
            <p>Success</p>
          </div>
        ) : (
          ''
        )}
        <button onClick={signOut} className="the-btn mr-3">
          Yes
        </button>
        <button onClick={() => setIsSignOutOpen(false)} className="the-btn">
          No
        </button>
      </TheDialog>
    </>
  )
}
