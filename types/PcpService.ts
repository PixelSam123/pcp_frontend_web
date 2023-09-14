import {
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
} from './types'

interface PcpService {
  sessionLogin(username: string, password: string): Promise<void>

  sessionLogout(): Promise<void>

  sessionUser(): Promise<UserBriefDto>

  sessionChallenges(): Promise<ChallengeBriefDto[]>

  sessionChallenge(name: string): Promise<ChallengeSecuredDto>

  sessionChallengeVoteByChallengeName(
    challengeName: string,
  ): Promise<ChallengeVoteDto | null>

  sessionChallengeSubmissionVoteByChallengeSubmissionId(
    challengeSubmissionId: number,
  ): Promise<ChallengeSubmissionVoteDto | null>

  userCreate(userToCreate: UserCreateDto): Promise<void>

  userList(): Promise<UserBriefDto[]>

  userGetByName(name: string): Promise<UserBriefDto>

  challengeCreate(challengeToCreate: ChallengeCreateDto): Promise<void>

  challengeList(tiers: string[], sortBy: string): Promise<ChallengeBriefDto[]>

  challengeGetByName(name: string): Promise<ChallengeDto>

  challengeUpdate(id: number, challenge: ChallengeCreateDto): Promise<void>

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

  challengeSubmissionVoteDelete(id: number): Promise<void>
}

export type { PcpService }
