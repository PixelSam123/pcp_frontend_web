'use client'

import { pcpService } from '@/services/RealPcpService'
import { FormEvent, useState } from 'react'
import { useSWRConfig } from 'swr'

export default function ChallengeCommentForm({
  challengeId,
  challengeName,
}: {
  challengeId: number
  challengeName: string
}) {
  const { mutate } = useSWRConfig()

  const [commentToPost, setCommentToPost] = useState('')

  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const postComment = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setError('')
    setIsSuccess(false)

    try {
      await pcpService.challengeCommentCreate({
        challengeId,
        content: commentToPost,
      })
      mutate(`challenge-comments/challenge-name/${challengeName}`)
      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <form onSubmit={postComment} className="space-y-3">
      {error && (
        <div className="bg-red-800 px-3 py-1">
          <p>{error}</p>
        </div>
      )}
      {isSuccess && (
        <div className="bg-green-500 px-3 py-1">
          <p>Success</p>
        </div>
      )}

      <textarea
        required
        value={commentToPost}
        onChange={(evt) => setCommentToPost(evt.target.value)}
        placeholder="Type your comment here..."
        className="the-input block w-full"
      />
      <button type="submit" className="the-btn w-full">
        Submit Comment
      </button>
    </form>
  )
}
