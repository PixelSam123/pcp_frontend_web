'use client'

import Editor from '@monaco-editor/react'
import { pcpService } from '@/services/RealPcpService'
import { useState } from 'react'

export default function ChallengeSubmissionForm({
  challengeId,
  initialCode,
}: {
  challengeId: number
  initialCode: string
}) {
  const [code, setCode] = useState(initialCode)

  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const submitAttempt = async () => {
    setError('')
    setIsSuccess(false)

    try {
      await pcpService.challengeSubmissionCreate({
        challengeId,
        code: code,
      })
      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <>
      <Editor
        height="24rem"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value ?? '')}
        theme="vs-dark"
      />

      <button onClick={submitAttempt} className="the-btn w-full">
        Submit Attempt
      </button>

      {error && (
        <div className="bg-red-800 px-3 py-1">
          <p className="whitespace-pre-wrap text-sm">{error}</p>
        </div>
      )}
      {isSuccess && (
        <div className="bg-green-500 px-3 py-1">
          <p>Success</p>
        </div>
      )}
    </>
  )
}
