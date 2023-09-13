'use client'

import { pcpService } from '@/services/RealPcpService'
import { FormEvent, useState } from 'react'

export default function SignInForm() {
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
    <form onSubmit={signIn} className="flex flex-col gap-3">
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

      <button type="submit" className="the-btn">
        Sign In
      </button>
    </form>
  )
}
