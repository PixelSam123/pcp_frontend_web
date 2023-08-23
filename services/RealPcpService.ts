import { PcpService } from '@/types/PcpService'
import {
  Token,
  UserCreateDto,
  UserBriefDto,
  ChallengeCreateDto,
  ChallengeDto,
  ChallengeBriefDto,
  ChallengeCommentCreateDto,
  ChallengeCommentDto,
  ChallengeVoteCreateDto,
  ChallengeVoteDto,
  ChallengeSubmissionCreateDto,
  ChallengeSubmissionDto,
  ChallengeSubmissionCommentCreateDto,
  ChallengeSubmissionCommentDto,
  ChallengeSubmissionVoteCreateDto,
  ChallengeSubmissionVoteDto,
} from '@/types/types'

class RealPcpService implements PcpService {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async loginForToken(username: string, password: string): Promise<Token> {
    const response = await fetch(`${this.baseUrl}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ username, password }),
    })
  }

  createUser(userToCreate: UserCreateDto): Promise<UserBriefDto> {
    throw new Error('Method not implemented.')
  }
  getUsers(): Promise<UserBriefDto[]> {
    throw new Error('Method not implemented.')
  }
  getUserByName(name: string): Promise<UserBriefDto> {
    throw new Error('Method not implemented.')
  }
  createChallenge(
    challengeToCreate: ChallengeCreateDto,
    token: string,
  ): Promise<ChallengeDto> {
    throw new Error('Method not implemented.')
  }
  getChallenges(): Promise<ChallengeBriefDto[]> {
    throw new Error('Method not implemented.')
  }
  getChallengeByName(name: string): Promise<ChallengeDto> {
    throw new Error('Method not implemented.')
  }
  createChallengeComment(
    challengeCommentToCreate: ChallengeCommentCreateDto,
    token: string,
  ): Promise<ChallengeCommentDto> {
    throw new Error('Method not implemented.')
  }
  getChallengeCommentsByChallengeName(
    challengeName: string,
  ): Promise<ChallengeCommentDto[]> {
    throw new Error('Method not implemented.')
  }
  createChallengeVote(
    challengeVoteToCreate: ChallengeVoteCreateDto,
    token: string,
  ): Promise<ChallengeVoteDto> {
    throw new Error('Method not implemented.')
  }
  getChallengeVotesByChallengeName(
    challengeName: string,
  ): Promise<ChallengeVoteDto[]> {
    throw new Error('Method not implemented.')
  }
  deleteChallengeVote(id: number, token: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  createChallengeSubmission(
    challengeSubmissionToCreate: ChallengeSubmissionCreateDto,
    token: string,
  ): Promise<ChallengeSubmissionDto> {
    throw new Error('Method not implemented.')
  }
  getChallengeSubmissionsByChallengeName(
    challengeName: string,
  ): Promise<ChallengeSubmissionDto[]> {
    throw new Error('Method not implemented.')
  }
  createChallengeSubmissionComment(
    challengeSubmissionCommentToCreate: ChallengeSubmissionCommentCreateDto,
    token: string,
  ): Promise<ChallengeSubmissionCommentDto> {
    throw new Error('Method not implemented.')
  }
  getChallengeSubmissionCommentsByChallengeSubmissionId(
    challengeSubmissionId: number,
  ): Promise<ChallengeSubmissionCommentDto[]> {
    throw new Error('Method not implemented.')
  }
  createChallengeSubmissionVote(
    challengeSubmissionVoteToCreate: ChallengeSubmissionVoteCreateDto,
  ): Promise<ChallengeSubmissionVoteDto> {
    throw new Error('Method not implemented.')
  }
  getChallengeSubmissionVotesBySubmissionId(
    submissionId: number,
  ): Promise<ChallengeSubmissionVoteDto[]> {
    throw new Error('Method not implemented.')
  }
  deleteSubmissionVote(id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
