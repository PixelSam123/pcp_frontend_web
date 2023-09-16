'use client'

import * as Dialog from '@radix-ui/react-dialog'
import ChallengeHeader from '@/app/components/ChallengeHeader'
import ChallengeCommentsDisplay from '@/app/components/display/ChallengeCommentsDisplay'
import SubmissionsDisplay from '@/app/components/display/SubmissionsDisplay'
import ChallengeVoteForm from '@/app/components/forms/ChallengeVoteForm'
import { pcpService } from '@/services/RealPcpService'
import { ChallengeDto } from '@/types/types'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import TheDialogPortal from '@/app/components/TheDialogPortal'
import ChallengeCommentForm from '@/app/components/forms/ChallengeCommentForm'
import ChallengeSubmissionForm from '@/app/components/forms/ChallengeSubmissionForm'

export default function Challenge() {
  const params = useSearchParams()
  const [challenge, setChallenge] = useState<ChallengeDto | null>(null)
  const [error, setError] = useState('')

  const {
    data: commentsData,
    error: commentsError,
    isLoading: commentsIsLoading,
  } = useSWR(
    `challenge-comments/challenge-name/${params.get('name') ?? ''}`,
    () =>
      pcpService.challengeCommentListByChallengeName(params.get('name') ?? ''),
  )

  const {
    data: submissionsData,
    error: submissionsError,
    isLoading: submissionsIsLoading,
  } = useSWR(
    `challenge-submissions/challenge-name/${params.get('name') ?? ''}`,
    () =>
      pcpService.challengeSubmissionListByChallengeName(
        params.get('name') ?? '',
      ),
  )

  const {
    data: votesData,
    error: votesError,
    isLoading: votesIsLoading,
  } = useSWR(`challenge-votes/challenge-name/${params.get('name') ?? ''}`, () =>
    pcpService.challengeVoteListByChallengeName(params.get('name') ?? ''),
  )

  const {
    data: sessionVoteData,
    error: sessionVoteError,
    isLoading: sessionVoteIsLoading,
  } = useSWR(`session/challenge-votes/name/${params.get('name') ?? ''}`, () =>
    pcpService.sessionChallengeVoteByChallengeName(params.get('name') ?? ''),
  )

  useEffect(() => {
    ;(async () => {
      try {
        const challenge = await pcpService.challengeGetByName(
          params.get('name') ?? '',
        )
        setChallenge(challenge)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    })()
  }, [params])

  if (!params.get('name')) {
    return <p>Please specify a challenge name.</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!challenge) {
    return <p>Loading...</p>
  }

  return (
    <div className="space-y-3">
      <ChallengeHeader tier={challenge.tier} title={challenge.name} />

      {votesIsLoading || sessionVoteIsLoading ? (
        <div>
          <p>Loading...</p>
          <p className="text-xs">Please wait</p>
        </div>
      ) : votesError ? (
        <div>
          <p>Error fetching votes</p>
          <p className="text-xs">{votesError.toString()}</p>
        </div>
      ) : sessionVoteError ? (
        <div>
          <p>Error fetching self upvote</p>
          <p className="text-xs">{sessionVoteError.toString()}</p>
        </div>
      ) : (
        <ChallengeVoteForm
          votes={votesData ?? []}
          sessionVote={sessionVoteData ?? null}
          challengeId={challenge.id}
          challengeName={params.get('name') ?? ''}
        />
      )}

      <div className="the-card space-y-3">
        <p className="font-bold">Description</p>

        <p className="whitespace-pre-wrap text-sm">{challenge.description}</p>

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
          challengeName={params.get('name') ?? ''}
          codeInitialValue={challenge.initialCode}
        />
      </div>

      <div className="the-card space-y-3">
        <p className="font-bold">Comments</p>

        <ChallengeCommentForm
          challengeId={challenge.id}
          challengeName={params.get('name') ?? ''}
        />

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
