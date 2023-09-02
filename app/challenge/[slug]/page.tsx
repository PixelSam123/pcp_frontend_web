'use client'

import Editor from '@monaco-editor/react'
import ChallengeHeader from '@/app/components/ChallengeHeader'
import TheSelect from '@/app/components/TheSelect'
import { FormEvent, useEffect, useState } from 'react'
import { pcpService } from '@/services/RealPcpService'
import { ChallengeDto } from '@/types/types'
import useSWR from 'swr'
import TheDialog from '@/app/components/TheDialog'
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react'

export default function Challenge({ params }: { params: { slug: string } }) {
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

  const {
    data: votesData,
    error: votesError,
    isLoading: votesIsLoading,
  } = useSWR(`challenge_votes/${params.slug}`, () =>
    pcpService.getChallengeVotesByChallengeName(params.slug),
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

  const postComment = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setCommentError('')
    setIsCommentSuccess(false)

    try {
      await pcpService.createChallengeComment({
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
        <div className="flex gap-3">
          <button className="the-btn flex items-center gap-x-3">
            <IconThumbUp /> {votesData?.filter((vote) => vote.isUpvote).length}
          </button>
          <button className="the-btn flex items-center gap-x-3">
            <IconThumbDown />{' '}
            {votesData?.filter((vote) => !vote.isUpvote).length}
          </button>
        </div>
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
          ) : submissionsData?.length ? (
            submissionsData?.map((submission) => (
              <div key={submission.id} className="the-card space-y-3">
                <p className="font-bold">{submission.user.name}</p>
                <p>{submission.code}</p>

                <TheDialog
                  title="View Comments & Votes"
                  description="Here are the comments and votes for this submission"
                >
                  <p>WIP!</p>
                </TheDialog>
              </div>
            ))
          ) : (
            <p>There are no submissions</p>
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
