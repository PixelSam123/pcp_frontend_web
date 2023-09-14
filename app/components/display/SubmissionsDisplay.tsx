'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { ChallengeSubmissionDto } from '@/types/types'
import TheDialogPortal from '../TheDialogPortal'
import SubmissionInteract from '../SubmissionInteract'

export default function SubmissionsDisplay({
  submissions,
}: {
  submissions: ChallengeSubmissionDto[]
}) {
  return submissions.length ? (
    submissions.map((submission) => (
      <div key={submission.id} className="the-card space-y-3">
        <p className="font-bold">{submission.user.name}</p>
        <p>{submission.code}</p>

        <Dialog.Root>
          <Dialog.Trigger className="the-btn block w-full">
            View Comments & Votes
          </Dialog.Trigger>
          <TheDialogPortal title="Submission Comments & Votes">
            <SubmissionInteract submissionId={submission.id} />
          </TheDialogPortal>
        </Dialog.Root>
      </div>
    ))
  ) : (
    <p>There are no submissions</p>
  )
}
