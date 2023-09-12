import { ChallengeSubmissionDto } from '@/types/types'
import TheDialog from '../TheDialog'

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

        <TheDialog
          title="View Comments & Votes"
          description="Here are the comments and votes for this submission"
        >
          <p>WIP!</p>
        </TheDialog>
      </div>
    ))
  ) : (
    <p>There are no submissions</p>
  )
}
