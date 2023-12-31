'use client'

import { pcpService } from '@/services/RealPcpService'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import useSWR from 'swr'
import TheSelect from './components/TheSelect'
import UsersDisplay from './components/display/UsersDisplay'
import ChallengesDisplay from './components/display/ChallengesDisplay'
import TheDialogPortal from './components/TheDialogPortal'

export default function Home() {
  const tiers = ['5', '4', '3', '2', '1']
  const [selectedTiers, setSelectedTiers] = useState<string[]>(tiers)

  const [sortBy, setSortBy] = useState('newest')

  const {
    data: usersData,
    error: usersError,
    isLoading: usersIsLoading,
  } = useSWR('users', () => pcpService.userList())

  const {
    data: challengesData,
    error: challengesError,
    isLoading: challengesIsLoading,
  } = useSWR(`challenges?${selectedTiers}&${sortBy}`, () =>
    pcpService.challengeList(selectedTiers, sortBy),
  )

  const toggleTier = (tier: string) => {
    if (selectedTiers.includes(tier)) {
      setSelectedTiers((prev) => prev.filter((prev) => prev !== tier))
    } else {
      setSelectedTiers((prev) => [...prev, tier])
    }
  }

  return (
    <>
      <div className="the-card mb-3 space-y-3">
        <p className="font-bold">Leaderboard</p>

        {usersIsLoading ? (
          <div>
            <p>Loading...</p>
            <p className="text-xs">Please wait</p>
          </div>
        ) : usersError ? (
          <div>
            <p>Error</p>
            <p className="text-xs">{usersError.toString()}</p>
          </div>
        ) : (
          <UsersDisplay users={usersData ?? []} />
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="the-card">
          <div className="mx-auto max-w-sm space-y-3">
            <p className="font-bold">Challenge Filtering</p>

            <p>Select Tiers</p>

            <div className="flex select-none justify-between">
              {tiers.map((tier) => (
                <div key={tier} className="flex flex-col items-center gap-1">
                  <Checkbox.Root
                    id={`check-t${tier}`}
                    value={tier}
                    checked={selectedTiers.includes(tier)}
                    onClick={() => toggleTier(tier)}
                    className="flex h-5 w-5 items-center justify-center border border-white"
                  >
                    <Checkbox.Indicator>
                      <div className="h-3 w-3 bg-white" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label htmlFor={`check-t${tier}`}>T{tier}</label>
                </div>
              ))}
            </div>

            <Dialog.Root>
              <Dialog.Trigger className="the-btn block w-full">
                Tag Selection
              </Dialog.Trigger>
              <TheDialogPortal title="Tag Selection">
                <p>Note: Tags are WIP!</p>
              </TheDialogPortal>
            </Dialog.Root>

            <Dialog.Root>
              <Dialog.Trigger className="the-btn block w-full">
                Language Selection
              </Dialog.Trigger>
              <TheDialogPortal
                title="Language Selection"
                description="Activate languages by clicking on them."
              >
                <p>Note: Language selection is WIP!</p>
                <div className="flex flex-wrap gap-3">
                  <button className="the-btn">javascript</button>
                </div>
              </TheDialogPortal>
            </Dialog.Root>

            <p>Sort By</p>
            <TheSelect
              value={sortBy}
              onValueChange={setSortBy}
              options={[
                { text: 'Newest', value: 'newest' },
                { text: 'Oldest', value: 'oldest' },
                { text: 'Most Completed', value: 'mostCompleted' },
                { text: 'Least Completed', value: 'leastCompleted' },
              ]}
              className="w-full"
            />
          </div>
        </div>

        {challengesIsLoading ? (
          <div>
            <p>Loading...</p>
            <p className="text-xs">Please wait</p>
          </div>
        ) : challengesError ? (
          <div>
            <p>Error</p>
            <p className="text-xs">{challengesError.toString()}</p>
          </div>
        ) : (
          <ChallengesDisplay challenges={challengesData ?? []} />
        )}
      </div>
    </>
  )
}
