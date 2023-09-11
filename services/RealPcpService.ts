import { PcpService } from '@/types/PcpService'
import {
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
import { fetchJson, fetchVoid } from '@/utils/utils'

class RealPcpService implements PcpService {
  constructor(private readonly baseUrl: string) {}

  async sessionLogin(username: string, password: string): Promise<void> {
    await fetchVoid(`${this.baseUrl}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ username, password }),
      credentials: 'include',
    })
  }

  async sessionLogout(): Promise<void> {
    await fetchVoid(`${this.baseUrl}/session/logout`, {
      method: 'POST',
      credentials: 'include',
    })
  }

  async sessionUser(): Promise<UserBriefDto> {
    return await fetchJson(`${this.baseUrl}/session`, {
      credentials: 'include',
    })
  }

  async sessionChallenges(): Promise<ChallengeBriefDto[]> {
    return await fetchJson(`${this.baseUrl}/session/challenges`, {
      credentials: 'include',
    })
  }

  async sessionChallengeIsUpvoteByChallengeId(
    challengeId: number,
  ): Promise<boolean | null> {
    return await fetchJson(
      `${this.baseUrl}/session/challenge_votes/${challengeId}`,
      {
        credentials: 'include',
      },
    )
  }

  async sessionChallengeSubmissionIsUpvoteByChallengeSubmissionId(
    challengeSubmissionId: number,
  ): Promise<boolean | null> {
    return await fetchJson(
      `${this.baseUrl}/session/challenge_submission_votes/${challengeSubmissionId}`,
      {
        credentials: 'include',
      },
    )
  }

  async userCreate(userToCreate: UserCreateDto): Promise<void> {
    await fetchVoid(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userToCreate),
    })
  }

  async userList(): Promise<UserBriefDto[]> {
    return await fetchJson(`${this.baseUrl}/users`)
  }

  async userGetByName(name: string): Promise<UserBriefDto> {
    return await fetchJson(`${this.baseUrl}/users/${name}`)
  }

  async challengeCreate(challengeToCreate: ChallengeCreateDto): Promise<void> {
    await fetchVoid(`${this.baseUrl}/challenges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(challengeToCreate),
      credentials: 'include',
    })
  }

  async challengeList(
    tiers: string[],
    sortBy: string,
  ): Promise<ChallengeBriefDto[]> {
    return await fetchJson(
      `${this.baseUrl}/challenges?tiers=${tiers}&sortBy=${sortBy}`,
    )
  }

  async challengeGetByName(name: string): Promise<ChallengeDto> {
    return await fetchJson(`${this.baseUrl}/challenges/${name}`)
  }

  async challengeCommentCreate(
    challengeCommentToCreate: ChallengeCommentCreateDto,
  ): Promise<void> {
    await fetchVoid(`${this.baseUrl}/challenge_comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(challengeCommentToCreate),
      credentials: 'include',
    })
  }

  async challengeCommentListByChallengeName(
    challengeName: string,
  ): Promise<ChallengeCommentDto[]> {
    return await fetchJson(
      `${this.baseUrl}/challenge_comments/${challengeName}`,
    )
  }

  async challengeVoteCreate(
    challengeVoteToCreate: ChallengeVoteCreateDto,
  ): Promise<void> {
    await fetchVoid(`${this.baseUrl}/challenge_votes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(challengeVoteToCreate),
      credentials: 'include',
    })
  }

  async challengeVoteListByChallengeName(
    challengeName: string,
  ): Promise<ChallengeVoteDto[]> {
    return await fetchJson(`${this.baseUrl}/challenge_votes/${challengeName}`)
  }

  async challengeVoteDelete(id: number): Promise<void> {
    return await fetchJson(`${this.baseUrl}/challenge_votes/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
  }

  async challengeSubmissionCreate(
    challengeSubmissionToCreate: ChallengeSubmissionCreateDto,
  ): Promise<void> {
    await fetchVoid(`${this.baseUrl}/challenge_submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(challengeSubmissionToCreate),
      credentials: 'include',
    })
  }

  async challengeSubmissionListByChallengeName(
    challengeName: string,
  ): Promise<ChallengeSubmissionDto[]> {
    return await fetchJson(
      `${this.baseUrl}/challenge_submissions/${challengeName}`,
    )
  }

  async challengeSubmissionCommentCreate(
    challengeSubmissionCommentToCreate: ChallengeSubmissionCommentCreateDto,
  ): Promise<void> {
    await fetchVoid(`${this.baseUrl}/challenge_submission_comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(challengeSubmissionCommentToCreate),
      credentials: 'include',
    })
  }

  async challengeSubmissionCommentListByChallengeSubmissionId(
    challengeSubmissionId: number,
  ): Promise<ChallengeSubmissionCommentDto[]> {
    return await fetchJson(
      `${this.baseUrl}/challenge_submission_comments/${challengeSubmissionId}`,
    )
  }

  async challengeSubmissionVoteCreate(
    challengeSubmissionVoteToCreate: ChallengeSubmissionVoteCreateDto,
  ): Promise<void> {
    await fetchVoid(`${this.baseUrl}/challenge_submission_votes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(challengeSubmissionVoteToCreate),
      credentials: 'include',
    })
  }

  async challengeSubmissionVoteListBySubmissionId(
    submissionId: number,
  ): Promise<ChallengeSubmissionVoteDto[]> {
    return await fetchJson(
      `${this.baseUrl}/challenge_submission_votes/${submissionId}`,
    )
  }

  async submissionVoteDelete(id: number): Promise<void> {
    return await fetchJson(`${this.baseUrl}/challenge_votes/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
  }
}

const instance = new RealPcpService('http://localhost:8080')

export { instance as pcpService }
