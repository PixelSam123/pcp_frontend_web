'use client'

import { pcpService } from '@/services/RealPcpService'
import { ChallengeVoteDto } from '@/types/types'
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react'
import { useState } from 'react'

export default function ChallengeVoteForm({
  votes,
  sessionVote,
  challengeId,
}: {
  votes: ChallengeVoteDto[]
  sessionVote: ChallengeVoteDto | null
  challengeId: number
}) {
  const [error, setError] = useState('')

  const isUpvoted = sessionVote !== null && sessionVote.isUpvote
  const isDownvoted = sessionVote !== null && !sessionVote.isUpvote

  const upvote = async () => {
    setError('')

    try {
      if (isUpvoted) {
        await pcpService.challengeVoteDelete(sessionVote.id)
      } else {
        if (isDownvoted) {
          await pcpService.challengeVoteDelete(sessionVote.id)
        }

        await pcpService.challengeVoteCreate({
          challengeId,
          isUpvote: true,
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const downvote = async () => {
    setError('')

    try {
      if (isDownvoted) {
        await pcpService.challengeVoteDelete(sessionVote.id)
      } else {
        if (isUpvoted) {
          await pcpService.challengeVoteDelete(sessionVote.id)
        }

        await pcpService.challengeVoteCreate({
          challengeId,
          isUpvote: false,
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <>
      {error && (
        <div className="bg-red-800 px-3 py-1">
          <p>{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          className={`the-btn flex items-center gap-x-3 ${
            isUpvoted ? 'bg-green-500' : ''
          }`}
          onClick={upvote}
        >
          <IconThumbUp /> {votes.filter((vote) => vote.isUpvote).length}
        </button>
        <button
          className={`the-btn flex items-center gap-x-3 ${
            isDownvoted ? 'bg-green-500' : ''
          }`}
          onClick={downvote}
        >
          <IconThumbDown /> {votes.filter((vote) => !vote.isUpvote).length}
        </button>
      </div>
    </>
  )
}
