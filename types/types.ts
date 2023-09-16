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
  codeForVerification: string
}

type ChallengeDto = {
  id: number
  name: string
  tier: number
  completedCount: number
  user: UserBriefDto
  description: string
  initialCode: string
}

type ChallengeBriefDto = {
  id: number
  name: string
  tier: number
  completedCount: number
  user: UserBriefDto
  upvoteCount: number
  downvoteCount: number
}

type ChallengeSecuredDto = {
  id: number
  name: string
  tier: number
  description: string
  initialCode: string
  testCase: string
}

type ChallengeCommentCreateDto = {
  content: string
  challengeId: number
}

type ChallengeCommentDto = {
  id: number
  content: string
  user: UserBriefDto
}

type ChallengeVoteCreateDto = {
  isUpvote: boolean
  challengeId: number
}

type ChallengeVoteDto = {
  id: number
  isUpvote: boolean
  user: UserBriefDto
}

type ChallengeSubmissionCreateDto = {
  code: string
  challengeId: number
}

type ChallengeSubmissionDto = {
  id: number
  code: string
  user: UserBriefDto
}

type ChallengeSubmissionCommentCreateDto = {
  content: string
  challengeSubmissionId: number
}

type ChallengeSubmissionCommentDto = {
  id: number
  content: string
  user: UserBriefDto
}

type ChallengeSubmissionVoteCreateDto = {
  isUpvote: boolean
  challengeSubmissionId: number
}

type ChallengeSubmissionVoteDto = {
  id: number
  isUpvote: boolean
  user: UserBriefDto
}

export type {
  ChallengeBriefDto,
  ChallengeCommentCreateDto,
  ChallengeCommentDto,
  ChallengeCreateDto,
  ChallengeDto,
  ChallengeSecuredDto,
  ChallengeSubmissionCommentCreateDto,
  ChallengeSubmissionCommentDto,
  ChallengeSubmissionCreateDto,
  ChallengeSubmissionDto,
  ChallengeSubmissionVoteCreateDto,
  ChallengeSubmissionVoteDto,
  ChallengeVoteCreateDto,
  ChallengeVoteDto,
  UserBriefDto,
  UserCreateDto,
}
