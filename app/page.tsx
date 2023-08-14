'use client'

import {
  IconInfoSquare,
  IconTag,
  IconTargetArrow,
  IconThumbDown,
  IconThumbUp,
  IconUser,
} from '@tabler/icons-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import Link from 'next/link'
import TheSelect from './components/TheSelect'
import ChallengeHeader from './components/ChallengeHeader'
import TheDialog from './components/TheDialog'

export default function Home() {
  const challenges = [
    {
      title: 'The Hashtag Generator',
      slug: 'the_hashtag_generator',
      tier: 3,
      author: 'herecomes_arima',
      upvotes: 977,
      downvotes: 8,
      completedCount: 9573,
      issues: 13,
      tags: ['strings', 'algorithms'],
      languages: ['javascript', 'lua'],
    },
  ]

  const tiers = ['5', '4', '3', '2', '1']

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="the-card">
        <div className="mx-auto max-w-sm space-y-3">
          <p>Select Tiers</p>

          <div className="flex select-none justify-between">
            {tiers.map((tier) => (
              <div key={tier} className="flex flex-col items-center gap-1">
                <Checkbox.Root
                  id={`check-t${tier}`}
                  value={tier}
                  className="flex h-5 w-5 items-center justify-center border border-white"
                >
                  <Checkbox.Indicator>
                    <div className="h-5 w-5 bg-white" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label htmlFor={`check-t${tier}`}>T{tier}</label>
              </div>
            ))}
          </div>

          <TheDialog
            title="Tag Selection"
            description="Activate tags by clicking on them."
          >
            <div className="flex flex-wrap gap-3">
              <button className="the-btn">strings</button>
              <button className="the-btn">algorithms</button>
            </div>
          </TheDialog>

          <TheDialog
            title="Language Selection"
            description="Activate languages by clicking on them."
          >
            <div className="flex flex-wrap gap-3">
              <button className="the-btn">javascript</button>
              <button className="the-btn">lua</button>
            </div>
          </TheDialog>

          <p>Sort By</p>
          <TheSelect
            defaultValue="newest"
            options={[
              { text: 'Newest', value: 'newest' },
              { text: 'Oldest', value: 'oldest' },
              { text: 'Most Completed', value: 'most-completed' },
              { text: 'Least Completed', value: 'least-completed' },
            ]}
            className="w-full"
          />
        </div>
      </div>

      {challenges.map((challenge) => (
        <div key={challenge.title} className="the-card space-y-3">
          <ChallengeHeader tier={challenge.tier} title={challenge.title} />

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
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
              <IconTargetArrow size="20" className="inline-block" />{' '}
              {challenge.completedCount}
            </p>
            <p>
              <IconInfoSquare size="20" className="inline-block" />{' '}
              {challenge.issues} issues
            </p>
          </div>

          <div className="flex items-center gap-x-2 gap-y-1 text-sm">
            <IconTag size="20" />
            {challenge.tags.map((tag) => (
              <p key={tag} className="underline hover:text-sky-400">
                {tag}
              </p>
            ))}
          </div>

          <div>
            <p>Available in:</p>
            <div className="flex gap-3">
              {challenge.languages.map((lang) => (
                <Link
                  key={lang}
                  href={`/challenge/${challenge.slug}?lang=${lang}`}
                  className="underline hover:text-sky-400"
                >
                  {lang}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
