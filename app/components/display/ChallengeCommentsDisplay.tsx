import { ChallengeCommentDto } from '@/types/types'

export default function ChallengeCommentsDisplay({
  comments,
}: {
  comments: ChallengeCommentDto[]
}) {
  return comments.length ? (
    comments.map((comment) => (
      <div key={comment.id} className="the-card space-y-3">
        <p className="font-bold">{comment.user.name}</p>
        <p>{comment.content}</p>
      </div>
    ))
  ) : (
    <p>There are no comments</p>
  )
}
