import {
  ChallengeBriefDto,
  ChallengeCommentCreateDto,
  ChallengeCommentDto,
  ChallengeCreateDto,
  ChallengeDto,
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
} from './types'

interface PcpService {
  sessionLogin(username: string, password: string): Promise<void>

  sessionLogout(): Promise<void>

  sessionUser(): Promise<UserBriefDto>

  sessionChallenges(): Promise<ChallengeBriefDto[]>

  sessionChallengeIsUpvoteByChallengeId(
    challengeId: number,
  ): Promise<boolean | null>

  sessionChallengeSubmissionIsUpvoteByChallengeSubmissionId(
    challengeSubmissionId: number,
  ): Promise<boolean | null>

  userCreate(userToCreate: UserCreateDto): Promise<void>

  userList(): Promise<UserBriefDto[]>

  userGetByName(name: string): Promise<UserBriefDto>

  challengeCreate(challengeToCreate: ChallengeCreateDto): Promise<void>

  challengeList(tiers: string[], sortBy: string): Promise<ChallengeBriefDto[]>

  challengeGetByName(name: string): Promise<ChallengeDto>

  challengeDelete(id: number): Promise<void>

  challengeCommentCreate(
    challengeCommentToCreate: ChallengeCommentCreateDto,
  ): Promise<void>

  challengeCommentListByChallengeName(
    challengeName: string,
  ): Promise<ChallengeCommentDto[]>

  challengeVoteCreate(
    challengeVoteToCreate: ChallengeVoteCreateDto,
  ): Promise<void>

  challengeVoteListByChallengeName(
    challengeName: string,
  ): Promise<ChallengeVoteDto[]>

  challengeVoteDelete(id: number): Promise<void>

  challengeSubmissionCreate(
    challengeSubmissionToCreate: ChallengeSubmissionCreateDto,
  ): Promise<void>

  challengeSubmissionListByChallengeName(
    challengeName: string,
  ): Promise<ChallengeSubmissionDto[]>

  challengeSubmissionCommentCreate(
    challengeSubmissionCommentToCreate: ChallengeSubmissionCommentCreateDto,
  ): Promise<void>

  challengeSubmissionCommentListByChallengeSubmissionId(
    challengeSubmissionId: number,
  ): Promise<ChallengeSubmissionCommentDto[]>

  challengeSubmissionVoteCreate(
    challengeSubmissionVoteToCreate: ChallengeSubmissionVoteCreateDto,
  ): Promise<void>

  challengeSubmissionVoteListBySubmissionId(
    submissionId: number,
  ): Promise<ChallengeSubmissionVoteDto[]>

  submissionVoteDelete(id: number): Promise<void>
}

export type { PcpService }
