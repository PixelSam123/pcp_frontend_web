'use client'

import ChallengeHeader from '@/app/components/ChallengeHeader'
import TheDialog from '@/app/components/TheDialog'
import ChallengeCommentsDisplay from '@/app/components/display/ChallengeCommentsDisplay'
import SubmissionsDisplay from '@/app/components/display/SubmissionsDisplay'
import VotesDisplay from '@/app/components/display/VotesDisplay'
import { pcpService } from '@/services/RealPcpService'
import { ChallengeDto } from '@/types/types'
import Editor from '@monaco-editor/react'
import { FormEvent, useEffect, useState } from 'react'
import useSWR from 'swr'

export default function Challenge({ params }: { params: { name: string } }) {
  const [challenge, setChallenge] = useState<ChallengeDto | null>(null)
  const [error, setError] = useState('')

  const [code, setCode] = useState('')

  const [submitError, setSubmitError] = useState('')
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)

  const [commentToPost, setCommentToPost] = useState('')

  const [commentError, setCommentError] = useState('')
  const [isCommentSuccess, setIsCommentSuccess] = useState(false)

  const {
    data: commentsData,
    error: commentsError,
    isLoading: commentsIsLoading,
  } = useSWR(`challenges/name/${params.name}`, () =>
    pcpService.challengeCommentListByChallengeName(params.name),
  )

  const {
    data: submissionsData,
    error: submissionsError,
    isLoading: submissionsIsLoading,
  } = useSWR(`challenge-submissions/challenge-name/${params.name}`, () =>
    pcpService.challengeSubmissionListByChallengeName(params.name),
  )

  const {
    data: votesData,
    error: votesError,
    isLoading: votesIsLoading,
  } = useSWR(`challenge-votes/challenge-name/${params.name}`, () =>
    pcpService.challengeVoteListByChallengeName(params.name),
  )

  useEffect(() => {
    ; (async () => {
      try {
        const challenge = await pcpService.challengeGetByName(params.name)
        setChallenge(challenge)
        setCode(challenge.initialCode)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    })()
  }, [params.name])

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
      await pcpService.challengeSubmissionCreate({
        challengeId: challenge.id,
        code: code,
      })
      setIsSubmitSuccess(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const postComment = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setCommentError('')
    setIsCommentSuccess(false)

    try {
      await pcpService.challengeCommentCreate({
        challengeId: challenge.id,
        content: commentToPost,
      })
      setIsCommentSuccess(true)
    } catch (err) {
      setCommentError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <div className="space-y-3">
      <ChallengeHeader tier={challenge.tier} title={challenge.name} />

      {votesIsLoading ? (
        <>
          <p>Loading...</p>
          <p className="text-xs">Please wait</p>
        </>
      ) : votesError ? (
        <>
          <p>Error fetching votes</p>
          <p className="text-xs">{votesError.toString()}</p>
        </>
      ) : (
        <VotesDisplay votes={votesData ?? []} />
      )}

      <div className="the-card space-y-3">
        <p className="font-bold">Description</p>

        <p>{challenge.description}</p>

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
          ) : (
            <SubmissionsDisplay submissions={submissionsData ?? []} />
          )}
        </TheDialog>
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
            <p className="whitespace-pre-wrap text-sm">{submitError}</p>
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

        <form onSubmit={postComment} className="space-y-3">
          {commentError ? (
            <div className="bg-red-800 px-3 py-1">
              <p>{commentError}</p>
            </div>
          ) : (
            ''
          )}
          {isCommentSuccess ? (
            <div className="bg-green-500 px-3 py-1">
              <p>Success</p>
            </div>
          ) : (
            ''
          )}

          <textarea
            required
            value={commentToPost}
            onChange={(evt) => setCommentToPost(evt.target.value)}
            placeholder="Type your comment here..."
            className="the-input block w-full"
          />
          <button type="submit" className="the-btn w-full">
            Submit Comment
          </button>
        </form>

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
        ) : (
          <ChallengeCommentsDisplay comments={commentsData ?? []} />
        )}
      </div>
    </div>
  )
}
