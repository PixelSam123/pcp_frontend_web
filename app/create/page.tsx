'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { pcpService } from '@/services/RealPcpService'
import useSWR from 'swr'
import SessionChallengesDisplay from '../components/display/SessionChallengesDisplay'
import TheDialogPortal from '../components/TheDialogPortal'
import ChallengeCreateForm from '../components/forms/ChallengeCreateForm'

export default function Create() {
  const {
    data: sessionChallengesData,
    error: sessionChallengesError,
    isLoading: sessionChallengesIsLoading,
  } = useSWR('session/challenges', () => pcpService.sessionChallenges())

  return (
    <div className="space-y-3">
      <div className="the-card space-y-3">
        <p className="font-bold">Published Challenges</p>

        {sessionChallengesIsLoading ? (
          <>
            <p>Loading...</p>
            <p className="text-xs">Please wait</p>
          </>
        ) : sessionChallengesError ? (
          <>
            <p>Error</p>
            <p className="text-xs">{sessionChallengesError.toString()}</p>
          </>
        ) : (
          <SessionChallengesDisplay challenges={sessionChallengesData ?? []} />
        )}
      </div>
      <Dialog.Root>
        <Dialog.Trigger className="the-btn block w-full">
          Create New Challenge
        </Dialog.Trigger>
        <TheDialogPortal
          title="Create New Challenge"
          description="Fill in new challenge details"
        >
          <ChallengeCreateForm />
        </TheDialogPortal>
      </Dialog.Root>
    </div>
  )
}
