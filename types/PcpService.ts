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
  Session,
  UserBriefDto,
  UserCreateDto,
} from './types'

interface PcpService {
  sessionLogin(username: string, password: string): Promise<void>
  sessionLogout(): Promise<void>
  sessionGet(): Promise<Session>

  createUser(userToCreate: UserCreateDto): Promise<void>
  getUsers(): Promise<UserBriefDto[]>
  getUserByName(name: string): Promise<UserBriefDto>

  createChallenge(challengeToCreate: ChallengeCreateDto): Promise<void>
  getChallenges(tiers: string[], sortBy: string): Promise<ChallengeBriefDto[]>
  getChallengeByName(name: string): Promise<ChallengeDto>

  createChallengeComment(
    challengeCommentToCreate: ChallengeCommentCreateDto,
  ): Promise<void>
  getChallengeCommentsByChallengeName(
    challengeName: string,
  ): Promise<ChallengeCommentDto[]>

  createChallengeVote(
    challengeVoteToCreate: ChallengeVoteCreateDto,
  ): Promise<void>
  getChallengeVotesByChallengeName(
    challengeName: string,
  ): Promise<ChallengeVoteDto[]>
  deleteChallengeVote(id: number): Promise<void>

  createChallengeSubmission(
    challengeSubmissionToCreate: ChallengeSubmissionCreateDto,
  ): Promise<void>
  getChallengeSubmissionsByChallengeName(
    challengeName: string,
  ): Promise<ChallengeSubmissionDto[]>

  createChallengeSubmissionComment(
    challengeSubmissionCommentToCreate: ChallengeSubmissionCommentCreateDto,
  ): Promise<void>
  getChallengeSubmissionCommentsByChallengeSubmissionId(
    challengeSubmissionId: number,
  ): Promise<ChallengeSubmissionCommentDto[]>

  createChallengeSubmissionVote(
    challengeSubmissionVoteToCreate: ChallengeSubmissionVoteCreateDto,
  ): Promise<void>
  getChallengeSubmissionVotesBySubmissionId(
    submissionId: number,
  ): Promise<ChallengeSubmissionVoteDto[]>
  deleteSubmissionVote(id: number): Promise<void>
}

export type { PcpService }
