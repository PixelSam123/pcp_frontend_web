'use client'

import { pcpService } from '@/services/RealPcpService'
import { useState } from 'react'

export default function ChallengeDeleteForm({
  challengeId,
}: {
  challengeId: number
}) {
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const deleteChallenge = async () => {
    setError('')
    setIsSuccess(false)

    try {
      await pcpService.challengeDelete(challengeId)
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
      <button onClick={deleteChallenge} className="the-btn mr-3 w-full">
        Yes
      </button>
    </>
  )
}
