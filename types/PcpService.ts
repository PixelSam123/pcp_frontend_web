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
  Token,
  UserBriefDto,
  UserCreateDto,
} from './types'

interface PcpService {
  loginForToken(username: string, password: string): Promise<Token>

  createUser(userToCreate: UserCreateDto): Promise<UserBriefDto>
  getUsers(): Promise<UserBriefDto[]>
  getUserByName(name: string): Promise<UserBriefDto>

  createChallenge(
    challengeToCreate: ChallengeCreateDto,
    token: string,
  ): Promise<ChallengeDto>
  getChallenges(): Promise<ChallengeBriefDto[]>
  getChallengeByName(name: string): Promise<ChallengeDto>

  createChallengeComment(
    challengeCommentToCreate: ChallengeCommentCreateDto,
    token: string,
  ): Promise<ChallengeCommentDto>
  getChallengeCommentsByChallengeName(
    challengeName: string,
  ): Promise<ChallengeCommentDto[]>

  createChallengeVote(
    challengeVoteToCreate: ChallengeVoteCreateDto,
    token: string,
  ): Promise<ChallengeVoteDto>
  getChallengeVotesByChallengeName(
    challengeName: string,
  ): Promise<ChallengeVoteDto[]>
  deleteChallengeVote(id: number, token: string): Promise<void>

  createChallengeSubmission(
    challengeSubmissionToCreate: ChallengeSubmissionCreateDto,
    token: string,
  ): Promise<ChallengeSubmissionDto>
  getChallengeSubmissionsByChallengeName(
    challengeName: string,
  ): Promise<ChallengeSubmissionDto[]>

  createChallengeSubmissionComment(
    challengeSubmissionCommentToCreate: ChallengeSubmissionCommentCreateDto,
    token: string,
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
