import { ChallengeVoteDto } from '@/types/types'
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react'

export default function VotesDisplay({ votes }: { votes: ChallengeVoteDto[] }) {
  return (
    <div className="flex gap-3">
      <button className="the-btn flex items-center gap-x-3">
        <IconThumbUp /> {votes.filter((vote) => vote.isUpvote).length}
      </button>
      <button className="the-btn flex items-center gap-x-3">
        <IconThumbDown /> {votes.filter((vote) => !vote.isUpvote).length}
      </button>
    </div>
  )
}
