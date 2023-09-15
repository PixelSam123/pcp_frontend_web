'use client'

import { pcpService } from '@/services/RealPcpService'
import { FormEvent, useState } from 'react'
import { useSWRConfig } from 'swr'

export default function SignUpForm() {
  const { mutate } = useSWRConfig()

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
      await pcpService.userCreate({ name: username, password })
      mutate('users')
      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <form onSubmit={signUp} className="flex flex-col gap-3">
      {error && (
        <div className="bg-red-800 px-3 py-1">
          <p>{error}</p>
        </div>
      )}
      {isSuccess && (
        <div className="bg-green-500 px-3 py-1">
          <p>Success</p>
        </div>
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
  )
}
