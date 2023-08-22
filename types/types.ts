type Token = {
  access_token: string
  token_type: string
}

type UserCreateDto = {
  name: string
  password: string
}

type UserBriefDto = {
  id: number
  name: string
  points: number
}

type ChallengeCreateDto = {
  name: string
  tier: number
  description: string
  initialCode: string
  testCase: string
}

type ChallengeDto = {
  id: number
  name: string
  tier: number
  user: UserBriefDto
  description: string
  initialCode: string
}

type ChallengeBriefDto = {
  id: number
  name: string
  tier: number
  user: UserBriefDto
}

export type {
  Token,
  UserCreateDto,
  UserBriefDto,
  ChallengeCreateDto,
  ChallengeDto,
  ChallengeBriefDto,
}
