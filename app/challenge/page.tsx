'use client'

import { Suspense } from 'react'
import ChallengePage from '../components/ChallengePage'

export default function Challenge() {
  return (
    <Suspense>
      <ChallengePage />
    </Suspense>
  )
}
