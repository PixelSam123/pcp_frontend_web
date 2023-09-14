import * as Dialog from '@radix-ui/react-dialog'

import { ChallengeBriefDto } from '@/types/types'
import ChallengeHeader from '../ChallengeHeader'
import TheDialogPortal from '../TheDialogPortal'
import ChallengeDeleteForm from '../forms/ChallengeDeleteForm'
import ChallengeEditForm from '../forms/ChallengeEditForm'

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

        <div className="space-x-3">
          <Dialog.Root>
            <Dialog.Trigger className="the-btn">Edit</Dialog.Trigger>
            <TheDialogPortal
              title="Edit"
              description="Edit your challenge details"
            >
              <ChallengeEditForm challengeName={challenge.name} />
            </TheDialogPortal>
          </Dialog.Root>
          <Dialog.Root>
            <Dialog.Trigger className="the-btn">Delete</Dialog.Trigger>
            <TheDialogPortal title="Delete" description="Are you sure?">
              <ChallengeDeleteForm challengeId={challenge.id} />
            </TheDialogPortal>
          </Dialog.Root>
        </div>
      </div>
    ))
  ) : (
    <>
      <p>No challenges</p>
      <p className="text-xs">Create one!</p>
    </>
  )
}
