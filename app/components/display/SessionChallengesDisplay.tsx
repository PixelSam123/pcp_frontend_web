import * as Dialog from '@radix-ui/react-dialog'

import { ChallengeBriefDto } from '@/types/types'
import ChallengeHeader from '../ChallengeHeader'
import TheDialogPortal from '../TheDialogPortal'

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

        <Dialog.Root>
          <Dialog.Trigger className="the-btn block">Edit</Dialog.Trigger>
          <TheDialogPortal title="Edit">
            <p>This feature is WIP</p>
          </TheDialogPortal>
        </Dialog.Root>
      </div>
    ))
  ) : (
    <>
      <p>No challenges</p>
      <p className="text-xs">Create one!</p>
    </>
  )
}
