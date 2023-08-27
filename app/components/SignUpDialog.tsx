'use client'

import { FormEvent, useState } from 'react'
import TheDialog from './TheDialog'
import { pcpService } from '@/services/RealPcpService'

export default function SignUpDialog() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const signUp = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setError('')
    setIsSuccess(false)

    if (password !== confirmPassword) {
      setError('Password does not match Confirm Password')
      return
    }

    try {
      await pcpService.createUser({ name: username, password })
      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <TheDialog title="Sign Up" description="Create a new user for you.">
      <form onSubmit={signUp} className="flex flex-col gap-3">
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

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          required
          id="confirm-password"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(evt) => setConfirmPassword(evt.target.value)}
          className="the-input"
        />

        <button type="submit" className="the-btn">
          Sign Up
        </button>
      </form>
    </TheDialog>
  )
}
