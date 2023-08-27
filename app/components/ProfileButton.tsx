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
  } = useSWR('session', () => pcpService.sessionGet())

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

  return (
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
              <p>{sessionData?.userInfo.name}</p>
              <p className="text-xs">{sessionData?.userInfo.points} pts</p>
            </>
          )}
        </div>
        <IconSelect className="transition-transform group-rdx-state-open:rotate-180" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="select-none border border-[#1e1e1e]">
          <DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
            <TheDialog title="Sign In" description="Sign in to your account.">
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
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
