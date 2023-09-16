import ChallengeHeader from '@/app/components/ChallengeHeader'
import { ChallengeBriefDto } from '@/types/types'
import {
  IconTargetArrow,
  IconThumbDown,
  IconThumbUp,
  IconUser,
} from '@tabler/icons-react'
import Link from 'next/link'

export default function ChallengesDisplay({
  challenges,
}: {
  challenges: ChallengeBriefDto[]
}) {
  return challenges.length ? (
    challenges.map((challenge) => (
      <div key={challenge.name} className="the-card space-y-3">
        <ChallengeHeader tier={challenge.tier} title={challenge.name} />

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
          <p>
            <IconUser size="20" className="inline-block" />{' '}
            {challenge.user.name}
          </p>
          <p>
            <IconThumbUp size="20" className="inline-block" />{' '}
            {challenge.upvoteCount}
          </p>
          <p>
            <IconThumbDown size="20" className="inline-block" />{' '}
            {challenge.downvoteCount}
          </p>
          <p>
            <IconTargetArrow size="20" className="inline-block" />{' '}
            {challenge.completedCount}
          </p>
        </div>

        <div>
          <p>Available in:</p>
          <div className="flex gap-3">
            <Link
              href={`/challenge?name=${challenge.name}`}
              className="underline hover:text-sky-400"
            >
              javascript
            </Link>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div>
      <p>No challenges found for your current filter</p>
    </div>
  )
}
