'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { ChallengeSubmissionDto } from '@/types/types'
import TheDialogPortal from '../TheDialogPortal'

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
          <Dialog.Trigger>View Comments & Votes</Dialog.Trigger>
          <TheDialogPortal title="View Comments & Votes">
            <p>WIP!</p>
          </TheDialogPortal>
        </Dialog.Root>
      </div>
    ))
  ) : (
    <p>There are no submissions</p>
  )
}
