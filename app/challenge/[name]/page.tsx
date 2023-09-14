'use client'

import * as Dialog from '@radix-ui/react-dialog'
import ChallengeHeader from '@/app/components/ChallengeHeader'
import ChallengeCommentsDisplay from '@/app/components/display/ChallengeCommentsDisplay'
import SubmissionsDisplay from '@/app/components/display/SubmissionsDisplay'
import VotesForm from '@/app/components/forms/VotesForm'
import { pcpService } from '@/services/RealPcpService'
import { ChallengeDto } from '@/types/types'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import TheDialogPortal from '@/app/components/TheDialogPortal'
import ChallengeCommentForm from '@/app/components/forms/ChallengeCommentForm'
import ChallengeSubmissionForm from '@/app/components/forms/ChallengeSubmissionForm'

export default function Challenge({ params }: { params: { name: string } }) {
  const [challenge, setChallenge] = useState<ChallengeDto | null>(null)
  const [error, setError] = useState('')

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
    ;(async () => {
      try {
        const challenge = await pcpService.challengeGetByName(params.name)
        setChallenge(challenge)
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
        <VotesForm votes={votesData ?? []} />
      )}

      <div className="the-card space-y-3">
        <p className="font-bold">Description</p>

        <p>{challenge.description}</p>

        <Dialog.Root>
          <Dialog.Trigger className="the-btn block w-full">
            View Submissions
          </Dialog.Trigger>
          <TheDialogPortal title="View Submissions">
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
          </TheDialogPortal>
        </Dialog.Root>
      </div>

      <div className="the-card space-y-3">
        <p className="font-bold">Editor</p>

        <ChallengeSubmissionForm
          challengeId={challenge.id}
          codeInitialValue={challenge.initialCode}
        />
      </div>

      <div className="the-card space-y-3">
        <p className="font-bold">Comments</p>

        <ChallengeCommentForm challengeId={challenge.id} />

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
