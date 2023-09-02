'use client'

import {
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
import { useState } from 'react'
import useSWR from 'swr'
import { pcpService } from '@/services/RealPcpService'

export default function Home() {
  const tiers = ['5', '4', '3', '2', '1']
  const [selectedTiers, setSelectedTiers] = useState<string[]>(tiers)

  const [sortBy, setSortBy] = useState('newest')

  const {
    data: usersData,
    error: usersError,
    isLoading: usersIsLoading,
  } = useSWR('users', () => pcpService.getUsers())

  const {
    data: challengesData,
    error: challengesError,
    isLoading: challengesIsLoading,
  } = useSWR(`challenges?tiers=${selectedTiers}&sortBy=${sortBy}`, () =>
    pcpService.getChallenges(selectedTiers, sortBy),
  )

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
          <table className="border-collapse border border-white">
            <thead>
              <tr>
                <th className="border border-white px-3 py-1">Name</th>
                <th className="border border-white px-3 py-1">Points</th>
              </tr>
            </thead>
            <tbody>
              {usersData?.map((user) => (
                <tr key={user.id}>
                  <td className="border border-white px-3 py-1">{user.name}</td>
                  <td className="border border-white px-3 py-1">
                    {user.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                    onClick={() => {
                      if (selectedTiers.includes(tier)) {
                        setSelectedTiers((prev) =>
                          prev.filter((prev) => prev !== tier),
                        )
                      } else {
                        setSelectedTiers((prev) => [...prev, tier])
                      }
                    }}
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

            <TheDialog title="Tag Selection" description="Tags are WIP!">
              <p>WIP</p>
            </TheDialog>

            <TheDialog
              title="Language Selection"
              description="Activate languages by clicking on them."
            >
              <p>Note: Language selection is WIP!</p>
              <div className="flex flex-wrap gap-3">
                <button className="the-btn">javascript</button>
              </div>
            </TheDialog>

            <p>Sort By</p>
            <TheSelect
              value={sortBy}
              onValueChange={(value) => setSortBy(value)}
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
        ) : challengesData?.length ? (
          challengesData.map((challenge) => (
            <div key={challenge.name} className="the-card space-y-3">
              <ChallengeHeader tier={challenge.tier} title={challenge.name} />

              <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                <p>
                  <IconUser size="20" className="inline-block" />{' '}
                  {challenge.user.name}
                </p>
                <p>
                  <IconThumbUp size="20" className="inline-block" /> 0
                </p>
                <p>
                  <IconThumbDown size="20" className="inline-block" /> 0
                </p>
                <p>
                  <IconTargetArrow size="20" className="inline-block" />{' '}
                  {challenge.completedCount}
                </p>
              </div>

              <div>
                <p>Available in:</p>
                <div className="flex gap-3">
                  <Link
                    href={`/challenge/${challenge.name}`}
                    className="underline hover:text-sky-400"
                  >
                    javascript
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>No challenges found for your current filter</p>
          </div>
        )}
      </div>
    </>
  )
}
