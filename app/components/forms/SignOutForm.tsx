'use client'

import { pcpService } from '@/services/RealPcpService'
import { useState } from 'react'

export default function SignOutForm() {
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
    </>
  )
}
