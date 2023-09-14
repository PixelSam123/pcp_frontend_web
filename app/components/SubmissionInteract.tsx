'use client'

import { pcpService } from '@/services/RealPcpService'
import useSWR from 'swr'
import SubmissionCommentsDisplay from './display/SubmissionCommentsDisplay'
import SubmissionCommentForm from './forms/SubmissionCommentForm'
import SubmissionVoteForm from './forms/SubmissionVoteForm'

export default function SubmissionInteract({
  submissionId,
}: {
  submissionId: number
}) {
  const {
    data: commentsData,
    error: commentsError,
    isLoading: commentsIsLoading,
  } = useSWR(
    `/challenge-submission-comments/challenge-submission-id/${submissionId}`,
    () =>
      pcpService.challengeSubmissionCommentListByChallengeSubmissionId(
        submissionId,
      ),
  )

  const {
    data: votesData,
    error: votesError,
    isLoading: votesIsLoading,
  } = useSWR(
    `/challenge-submission-votes/challenge-submission-id/${submissionId}`,
    () => pcpService.challengeSubmissionVoteListBySubmissionId(submissionId),
  )

  const {
    data: sessionVoteData,
    error: sessionVoteError,
    isLoading: sessionVoteIsLoading,
  } = useSWR(`session/challenge-submission-votes/${submissionId}`, () =>
    pcpService.sessionChallengeSubmissionVoteByChallengeSubmissionId(
      submissionId,
    ),
  )

  return (
    <>
      {votesIsLoading || sessionVoteIsLoading ? (
        <>
          <p>Loading...</p>
          <p className="text-xs">Please wait</p>
        </>
      ) : votesError ? (
        <>
          <p>Error fetching votes</p>
          <p className="text-xs">{votesError.toString()}</p>
        </>
      ) : sessionVoteError ? (
        <div>
          <p>Error fetching self upvote</p>
          <p className="text-xs">{sessionVoteError.toString()}</p>
        </div>
      ) : (
        <SubmissionVoteForm
          votes={votesData ?? []}
          sessionVote={sessionVoteData ?? null}
          submissionId={submissionId}
        />
      )}

      <div className="the-card space-y-3">
        <p className="font-bold">Comments</p>

        <SubmissionCommentForm submissionId={submissionId} />

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
          <SubmissionCommentsDisplay comments={commentsData ?? []} />
        )}
      </div>
    </>
  )
}
