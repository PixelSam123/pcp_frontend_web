import { ChallengeSubmissionCommentDto } from '@/types/types'

export default function SubmissionCommentsDisplay({
  comments,
}: {
  comments: ChallengeSubmissionCommentDto[]
}) {
  return comments.length ? (
    comments.map((comment) => (
      <div key={comment.id} className="the-card space-y-3">
        <p className="font-bold">{comment.user.name}</p>
        <p className="whitespace-pre-wrap">{comment.content}</p>
      </div>
    ))
  ) : (
    <p>There are no comments</p>
  )
}
