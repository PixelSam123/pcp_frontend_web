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
  login(username: string, password: string): Promise<void>
  logout(): Promise<void>

  createUser(userToCreate: UserCreateDto): Promise<UserBriefDto>
  getUsers(): Promise<UserBriefDto[]>
  getUserByName(name: string): Promise<UserBriefDto>

  createChallenge(challengeToCreate: ChallengeCreateDto): Promise<ChallengeDto>
  getChallenges(): Promise<ChallengeBriefDto[]>
  getChallengeByName(name: string): Promise<ChallengeDto>

  createChallengeComment(
    challengeCommentToCreate: ChallengeCommentCreateDto,
  ): Promise<ChallengeCommentDto>
  getChallengeCommentsByChallengeName(
    challengeName: string,
  ): Promise<ChallengeCommentDto[]>

  createChallengeVote(
    challengeVoteToCreate: ChallengeVoteCreateDto,
  ): Promise<ChallengeVoteDto>
  getChallengeVotesByChallengeName(
    challengeName: string,
  ): Promise<ChallengeVoteDto[]>
  deleteChallengeVote(id: number): Promise<void>

  createChallengeSubmission(
    challengeSubmissionToCreate: ChallengeSubmissionCreateDto,
  ): Promise<ChallengeSubmissionDto>
  getChallengeSubmissionsByChallengeName(
    challengeName: string,
  ): Promise<ChallengeSubmissionDto[]>

  createChallengeSubmissionComment(
    challengeSubmissionCommentToCreate: ChallengeSubmissionCommentCreateDto,
  ): Promise<ChallengeSubmissionCommentDto>
  getChallengeSubmissionCommentsByChallengeSubmissionId(
    challengeSubmissionId: number,
  ): Promise<ChallengeSubmissionCommentDto[]>

  createChallengeSubmissionVote(
    challengeSubmissionVoteToCreate: ChallengeSubmissionVoteCreateDto,
  ): Promise<ChallengeSubmissionVoteDto>
  getChallengeSubmissionVotesBySubmissionId(
    submissionId: number,
  ): Promise<ChallengeSubmissionVoteDto[]>
  deleteSubmissionVote(id: number): Promise<void>
}

export type { PcpService }
