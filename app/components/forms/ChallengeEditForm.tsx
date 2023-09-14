'use client'

import { useEffect, useState } from 'react'
import { pcpService } from '@/services/RealPcpService'
import { ChallengeSecuredDto } from '@/types/types'
import ChallengeEditFormInner from './ChallengeEditFormInner'

export default function ChallengeEditForm({
  challengeName,
}: {
  challengeName: string
}) {
  const [challenge, setChallenge] = useState<ChallengeSecuredDto | null>(null)
  const [challengeError, setChallengeError] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const challenge = await pcpService.sessionChallenge(challengeName)
        setChallenge(challenge)
      } catch (err) {
        setChallengeError(err instanceof Error ? err.message : 'Unknown error')
      }
    })()
  }, [challengeName])

  if (challengeError) {
    return <p>{challengeError}</p>
  }

  if (!challenge) {
    return <p>Loading...</p>
  }

  return (
    <ChallengeEditFormInner
      challengeId={challenge.id}
      titleInitialValue={challenge.name}
      tierInitialValue={challenge.tier.toString()}
      descriptionInitialValue={challenge.description}
      initialCodeInitialValue={challenge.initialCode}
      testCasesInitialValue={challenge.testCase}
    />
  )
}
