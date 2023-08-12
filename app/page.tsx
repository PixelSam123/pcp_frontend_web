import {
  IconInfoSquare,
  IconTag,
  IconThumbDown,
  IconThumbUp,
  IconUser,
} from '@tabler/icons-react'

export default function Home() {
  const challenges = [
    {
      title: 'The Hashtag Generator',
      tier: 3,
      author: 'Akane',
      upvotes: 977,
      downvotes: 8,
      issues: 13,
      tags: ['strings', 'algorithms'],
      languages: ['javascript', 'lua'],
    },
  ]
  return (
    <>
      <div className="border border-white">
        <p>Select Tiers</p>
      </div>

      {challenges.map((challenge) => (
        <div key={challenge.title} className="border border-white p-4">
          <p className="font-bold">
            <span className="border border-white px-1 font-normal">
              T{challenge.tier}
            </span>{' '}
            {challenge.title}
          </p>
          <div className="flex gap-3">
            <p>
              <IconUser size="20" className="inline-block" /> {challenge.author}
            </p>
            <p>
              <IconThumbUp size="20" className="inline-block" />{' '}
              {challenge.upvotes}
            </p>
            <p>
              <IconThumbDown size="20" className="inline-block" />{' '}
              {challenge.downvotes}
            </p>
            <p>
              <IconInfoSquare size="20" className="inline-block" />{' '}
              {challenge.issues} issues
            </p>
          </div>
          <IconTag size="20" className="inline-block" />{' '}
          <div className="flex gap-x-3">
            {challenge.tags.map((tag) => (
              <p key={tag} className="underline">
                {tag}
              </p>
            ))}
          </div>
          <p>Available in:</p>
          <div className="flex gap-x-3">
            {challenge.languages.map((tag) => (
              <p key={tag} className="underline">
                {tag}
              </p>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
