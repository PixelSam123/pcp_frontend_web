'use client'

import Editor from '@monaco-editor/react'
import { pcpService } from '@/services/RealPcpService'
import { useState } from 'react'
import { useSWRConfig } from 'swr'

export default function ChallengeSubmissionForm({
  challengeId,
  challengeName,
  codeInitialValue: initialCode,
}: {
  challengeId: number
  challengeName: string
  codeInitialValue: string
}) {
  const { mutate } = useSWRConfig()

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
      mutate(`challenge-submissions/challenge-name/${challengeName}`)
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
