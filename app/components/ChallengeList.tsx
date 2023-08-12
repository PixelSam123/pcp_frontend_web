'use client'

import {
  IconInfoSquare,
  IconTag,
  IconThumbDown,
  IconThumbUp,
  IconUser,
} from '@tabler/icons-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog'
import Card from './Card'

export default function ChallengeList() {
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

  const tiers = ['5', '4', '3', '2', '1']

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
      <Card className="space-y-3">
        <p>Select Tiers</p>

        <div className="flex gap-6">
          {tiers.map((tier) => (
            <div key={tier} className="flex flex-col items-center gap-1">
              <Checkbox.Root
                id="check-t5"
                value={tier}
                className="flex h-5 w-5 items-center justify-center border border-white"
              >
                <Checkbox.Indicator>
                  <div className="h-5 w-5 bg-white" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor="check-t5">T{tier}</label>
            </div>
          ))}
        </div>

        <div className="w-fit space-y-3">
          <Dialog.Root>
            <Dialog.Trigger className="the-btn block w-full">
              Tag Selection
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1e1e1e]">
                <Card className="space-y-3">
                  <Dialog.Title className="font-bold">
                    Tag Selection
                  </Dialog.Title>
                  <Dialog.Description className="text-center">
                    WIP!
                  </Dialog.Description>
                </Card>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <Dialog.Root>
            <Dialog.Trigger className="the-btn block w-full">
              Language Selection
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1e1e1e]">
                <Card className="space-y-3">
                  <Dialog.Title className="font-bold">
                    Language Selection
                  </Dialog.Title>
                  <Dialog.Description className="text-center">
                    WIP!
                  </Dialog.Description>
                </Card>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <p>Sort By</p>
        </div>
      </Card>

      {challenges.map((challenge) => (
        <Card key={challenge.title} className="space-y-3">
          <p className="font-bold">
            <span className="border border-white px-1 font-normal">
              T{challenge.tier}
            </span>{' '}
            {challenge.title}
          </p>

          <div className="text-sm space-y-1">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <p>
                <IconUser size="20" className="inline-block" />{' '}
                {challenge.author}
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

            <div className="flex items-center gap-x-2 gap-y-1">
              <IconTag size="20" />
              {challenge.tags.map((tag) => (
                <p key={tag} className="underline">
                  {tag}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <p>Available in:</p>
            <div className="flex gap-3">
              {challenge.languages.map((tag) => (
                <p key={tag} className="underline">
                  {tag}
                </p>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
