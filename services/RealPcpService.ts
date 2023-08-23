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
import { fetchJson } from '@/utils/utils'

class RealPcpService implements PcpService {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async loginForToken(username: string, password: string): Promise<Token> {
    return await fetchJson(`${this.baseUrl}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ username, password }),
    })
  }

  async createUser(userToCreate: UserCreateDto): Promise<UserBriefDto> {
    return await fetchJson(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userToCreate),
    })
  }

  async getUsers(): Promise<UserBriefDto[]> {
    return await fetchJson(`${this.baseUrl}/users`)
  }

  async getUserByName(name: string): Promise<UserBriefDto> {
    return await fetchJson(`${this.baseUrl}/users/${name}`)
  }

  async createChallenge(
    challengeToCreate: ChallengeCreateDto,
    token: string,
  ): Promise<ChallengeDto> {
    return await fetchJson(`${this.baseUrl}/challenges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(challengeToCreate),
    })
  }

  async getChallenges(): Promise<ChallengeBriefDto[]> {
    return await fetchJson(`${this.baseUrl}/challenges`)
  }

  async getChallengeByName(name: string): Promise<ChallengeDto> {
    return await fetchJson(`${this.baseUrl}/challenges/${name}`)
  }

  async createChallengeComment(
    challengeCommentToCreate: ChallengeCommentCreateDto,
    token: string,
  ): Promise<ChallengeCommentDto> {
    return await fetchJson(`${this.baseUrl}/challenge_comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(challengeCommentToCreate),
    })
  }

  async getChallengeCommentsByChallengeName(
    challengeName: string,
  ): Promise<ChallengeCommentDto[]> {
    return await fetchJson(
      `${this.baseUrl}/challenge_comments/${challengeName}`,
    )
  }

  async createChallengeVote(
    challengeVoteToCreate: ChallengeVoteCreateDto,
    token: string,
  ): Promise<ChallengeVoteDto> {
    return await fetchJson(`${this.baseUrl}/challenge_votes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(challengeVoteToCreate),
    })
  }

  async getChallengeVotesByChallengeName(
    challengeName: string,
  ): Promise<ChallengeVoteDto[]> {
    return await fetchJson(`${this.baseUrl}/challenge_votes/${challengeName}`)
  }

  async deleteChallengeVote(id: number, token: string): Promise<void> {
    return await fetchJson(`${this.baseUrl}/challenge_votes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  async createChallengeSubmission(
    challengeSubmissionToCreate: ChallengeSubmissionCreateDto,
    token: string,
  ): Promise<ChallengeSubmissionDto> {
    return await fetchJson(`${this.baseUrl}/challenge_submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(challengeSubmissionToCreate),
    })
  }

  async getChallengeSubmissionsByChallengeName(
    challengeName: string,
  ): Promise<ChallengeSubmissionDto[]> {
    return await fetchJson(
      `${this.baseUrl}/challenge_submissions/${challengeName}`,
    )
  }

  async createChallengeSubmissionComment(
    challengeSubmissionCommentToCreate: ChallengeSubmissionCommentCreateDto,
    token: string,
  ): Promise<ChallengeSubmissionCommentDto> {
    return await fetchJson(`${this.baseUrl}/challenge_submission_comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(challengeSubmissionCommentToCreate),
    })
  }

  async getChallengeSubmissionCommentsByChallengeSubmissionId(
    challengeSubmissionId: number,
  ): Promise<ChallengeSubmissionCommentDto[]> {
    return await fetchJson(
      `${this.baseUrl}/challenge_submission_comments/${challengeSubmissionId}`,
    )
  }

  async createChallengeSubmissionVote(
    challengeSubmissionVoteToCreate: ChallengeSubmissionVoteCreateDto,
    token: string,
  ): Promise<ChallengeSubmissionVoteDto> {
    return await fetchJson(`${this.baseUrl}/challenge_submission_votes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(challengeSubmissionVoteToCreate),
    })
  }

  async getChallengeSubmissionVotesBySubmissionId(
    submissionId: number,
  ): Promise<ChallengeSubmissionVoteDto[]> {
    return await fetchJson(
      `${this.baseUrl}/challenge_submission_votes/${submissionId}`,
    )
  }

  async deleteSubmissionVote(id: number, token: string): Promise<void> {
    return await fetchJson(`${this.baseUrl}/challenge_votes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
  }
}
