'use client'

import { pcpService } from '@/services/RealPcpService'
import { useState } from 'react'
import { useSWRConfig } from 'swr'

export default function SignOutForm() {
  const { mutate } = useSWRConfig()

  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const signOut = async () => {
    setError('')
    setIsSuccess(false)

    try {
      await pcpService.sessionLogout()
      mutate('session')
      mutate('session/challenges')
      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <>
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
      <button onClick={signOut} className="the-btn mr-3 w-full">
        Yes
      </button>
    </>
  )
}
