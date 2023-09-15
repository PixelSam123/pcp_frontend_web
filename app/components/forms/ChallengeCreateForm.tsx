'use client'

import Editor from '@monaco-editor/react'
import { useState } from 'react'
import { pcpService } from '@/services/RealPcpService'
import { useSWRConfig } from 'swr'

export default function ChallengeCreateForm() {
  const { mutate } = useSWRConfig()

  const [title, setTitle] = useState('')
  const [tier, setTier] = useState('5')
  const [description, setDescription] = useState('')
  const [initialCode, setInitialCode] = useState('')
  const [testCases, setTestCases] = useState('')
  const [codeForVerification, setCodeForVerification] = useState('')

  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const create = async () => {
    setError('')
    setIsSuccess(false)

    if (!title || !description || !initialCode || !testCases) {
      setError('Please fill in all fields')
      return
    }

    try {
      const parsedTier = parseInt(tier)
      if (isNaN(parsedTier) || parsedTier < 1 || parsedTier > 5) {
        throw new Error('Tier must be between 1 and 5')
      }

      await pcpService.challengeCreate({
        name: title,
        tier: parsedTier,
        description,
        initialCode,
        testCase: testCases,
        codeForVerification,
      })
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
          <p className="whitespace-pre-wrap text-sm">{error}</p>
        </div>
      )}
      {isSuccess && (
        <div className="bg-green-500 px-3 py-1">
          <p>Success</p>
        </div>
      )}

      <label htmlFor="title" className="block font-bold">
        Title
      </label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Enter challenge title"
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
        className="the-input w-full sm:w-[512px] md:w-[640px]"
      />

      <label htmlFor="tier" className="block font-bold">
        Tier
      </label>
      <input
        type="number"
        name="tier"
        id="tier"
        placeholder="Enter challenge tier"
        min={1}
        max={5}
        value={tier}
        onChange={(evt) => setTier(evt.target.value)}
        className="the-input w-full sm:w-[512px] md:w-[640px]"
      />

      <p className="block font-bold">Description</p>
      <Editor
        width="100%"
        height="8rem"
        defaultLanguage="markdown"
        theme="vs-dark"
        options={{ minimap: { enabled: false } }}
        value={description}
        onChange={(value) => setDescription(value ?? '')}
      />

      <p className="block font-bold">Initial Code</p>
      <Editor
        width="100%"
        height="8rem"
        defaultLanguage="javascript"
        theme="vs-dark"
        options={{ minimap: { enabled: false } }}
        value={initialCode}
        onChange={(value) => setInitialCode(value ?? '')}
      />

      <p className="block font-bold">Test Cases</p>
      <Editor
        width="100%"
        height="8rem"
        defaultLanguage="javascript"
        theme="vs-dark"
        options={{ minimap: { enabled: false } }}
        value={testCases}
        onChange={(value) => setTestCases(value ?? '')}
      />

      <p className="block font-bold">
        Code for Verification (that you can do the problem)
      </p>
      <Editor
        width="100%"
        height="8rem"
        defaultLanguage="javascript"
        theme="vs-dark"
        options={{ minimap: { enabled: false } }}
        value={codeForVerification}
        onChange={(value) => setCodeForVerification(value ?? '')}
      />

      <button disabled={isSuccess} onClick={create} className="the-btn w-full">
        Create
      </button>
    </>
  )
}
