'use client'

import Editor from '@monaco-editor/react'
import ChallengeHeader from '@/app/components/ChallengeHeader'
import TheSelect from '@/app/components/TheSelect'
import { useEffect, useState } from 'react'
import { pcpService } from '@/services/RealPcpService'
import { ChallengeDto } from '@/types/types'
import useSWR from 'swr'
import TheDialog from '@/app/components/TheDialog'

export default function Challenge({ params }: { params: { slug: string } }) {
  const [challenge, setChallenge] = useState<ChallengeDto | null>(null)
  const [error, setError] = useState('')

  const [code, setCode] = useState('')

  const [submitError, setSubmitError] = useState('')
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)

  const {
    data: commentsData,
    error: commentsError,
    isLoading: commentsIsLoading,
  } = useSWR(`challenges/${params.slug}`, () =>
    pcpService.getChallengeCommentsByChallengeName(params.slug),
  )

  const {
    data: submissionsData,
    error: submissionsError,
    isLoading: submissionsIsLoading,
  } = useSWR(`challenge_submissions/${params.slug}`, () =>
    pcpService.getChallengeSubmissionsByChallengeName(params.slug),
  )

  useEffect(() => {
    ;(async () => {
      try {
        const challenge = await pcpService.getChallengeByName(params.slug)
        setChallenge(challenge)
        setCode(challenge.initialCode)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    })()
  }, [params.slug])

  if (error) {
    return <p>{error}</p>
  }

  if (!challenge) {
    return <p>Loading...</p>
  }

  const submitAttempt = async () => {
    setSubmitError('')
    setIsSubmitSuccess(false)

    try {
      await pcpService.createChallengeSubmission({
        challengeId: challenge.id,
        code: code,
      })
      setIsSubmitSuccess(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <div className="space-y-3">
      <ChallengeHeader tier={challenge.tier} title={challenge.name} />
      <TheSelect
        defaultValue="javascript"
        options={[{ text: 'javascript', value: 'javascript' }]}
      />

      <TheDialog
        title="View Submissions"
        description="Here are the submissions for this challenge"
      >
        {submissionsIsLoading ? (
          <>
            <p>Loading...</p>
            <p className="text-xs">Please wait</p>
          </>
        ) : submissionsError ? (
          <>
            <p>Error fetching submissions</p>
            <p className="text-xs">{submissionsError.toString()}</p>
          </>
        ) : submissionsData?.length ? (
          submissionsData?.map((submission) => (
            <div key={submission.id} className="the-card space-y-3">
              <p className="font-bold">{submission.user.name}</p>
              <p>{submission.code}</p>
            </div>
          ))
        ) : (
          <p>There are no submissions</p>
        )}
      </TheDialog>

      <div className="the-card space-y-3">
        <p className="font-bold">Description</p>

        <p>{challenge.description}</p>
      </div>

      <div className="the-card space-y-3">
        <p className="font-bold">Editor</p>
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

        {submitError ? (
          <div className="bg-red-800 px-3 py-1">
            <p>{submitError}</p>
          </div>
        ) : (
          ''
        )}
        {isSubmitSuccess ? (
          <div className="bg-green-500 px-3 py-1">
            <p>Success</p>
          </div>
        ) : (
          ''
        )}
      </div>

      <div className="the-card space-y-3">
        <p className="font-bold">Comments</p>

        {commentsIsLoading ? (
          <>
            <p>Loading...</p>
            <p className="text-xs">Please wait</p>
          </>
        ) : commentsError ? (
          <>
            <p>Error fetching comments</p>
            <p className="text-xs">{commentsError.toString()}</p>
          </>
        ) : commentsData?.length ? (
          commentsData?.map((comment) => (
            <div key={comment.id} className="the-card space-y-3">
              <p className="font-bold">{comment.user.name}</p>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>There are no comments</p>
        )}
      </div>
    </div>
  )
}
