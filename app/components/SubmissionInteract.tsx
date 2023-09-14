'use client'

import { pcpService } from '@/services/RealPcpService'
import useSWR from 'swr'

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

  return (
    <>
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
        <p>barfoo</p>
      )}

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
        ) : (
          <p>foobar</p>
        )}
      </div>
    </>
  )
}
