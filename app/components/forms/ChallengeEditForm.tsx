'use client'

import { useEffect, useState } from 'react'
import { pcpService } from '@/services/RealPcpService'
import { ChallengeDto } from '@/types/types'
import ChallengeEditFormInner from './ChallengeEditFormInner'

export default function ChallengeEditForm({
  challengeName,
}: {
  challengeName: string
}) {
  const [challenge, setChallenge] = useState<ChallengeDto | null>(null)
  const [challengeError, setChallengeError] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const challenge = await pcpService.challengeGetByName(challengeName)
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
      titleInitialValue={challenge.name}
      tierInitialValue={challenge.tier.toString()}
      descriptionInitialValue={challenge.description}
      initialCodeInitialValue={challenge.initialCode}
      testCasesInitialValue={/*TODO*/}
      codeForVerificationInitialValue={/*TODO*/}
    />
  )
}
