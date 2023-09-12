import { ChallengeBriefDto } from '@/types/types'
import ChallengeHeader from '../ChallengeHeader'
import TheDialog from '../TheDialog'

export default function SessionChallengesDisplay({
  challenges,
}: {
  challenges: ChallengeBriefDto[]
}) {
  return challenges.length ? (
    challenges.map((challenge) => (
      <div
        key={challenge.id}
        className="flex w-fit items-center justify-between gap-6"
      >
        <ChallengeHeader tier={challenge.tier} title={challenge.name} />
        <TheDialog normalWidth title="Edit" description="WIP Feature!">
          <p>This feature is WIP</p>
        </TheDialog>
      </div>
    ))
  ) : (
    <>
      <p>No challenges</p>
      <p className="text-xs">Create one!</p>
    </>
  )
}
