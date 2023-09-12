import { PcpService } from '@/types/PcpService'
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
      `${this.baseUrl}/session/challenge-votes/${challengeId}`,
      {
        credentials: 'include',
      },
    )
  }

  async sessionChallengeSubmissionIsUpvoteByChallengeSubmissionId(
    challengeSubmissionId: number,
  ): Promise<boolean | null> {
    return await fetchJson(
      `${this.baseUrl}/session/challenge-submission-votes/${challengeSubmissionId}`,
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
    return await fetchJson(`${this.baseUrl}/users/name/${name}`)
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
      `${this.baseUrl}/challenges?tiers=${tiers}&sort-by=${sortBy}`,
    )
  }

  async challengeGetByName(name: string): Promise<ChallengeDto> {
    return await fetchJson(`${this.baseUrl}/challenges/name/${name}`)
  }

  async challengeDelete(id: number): Promise<void> {
    return await fetchJson(`${this.baseUrl}/challenges/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
  }

  async challengeCommentCreate(
    challengeCommentToCreate: ChallengeCommentCreateDto,
  ): Promise<void> {
    await fetchVoid(`${this.baseUrl}/challenge-comments`, {
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
      `${this.baseUrl}/challenge-comments/challenge-name/${challengeName}`,
    )
  }

  async challengeVoteCreate(
    challengeVoteToCreate: ChallengeVoteCreateDto,
  ): Promise<void> {
    await fetchVoid(`${this.baseUrl}/challenge-votes`, {
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
    return await fetchJson(
      `${this.baseUrl}/challenge-votes/challenge-name/${challengeName}`,
    )
  }

  async challengeVoteDelete(id: number): Promise<void> {
    return await fetchJson(`${this.baseUrl}/challenge-votes/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
  }

  async challengeSubmissionCreate(
    challengeSubmissionToCreate: ChallengeSubmissionCreateDto,
  ): Promise<void> {
    await fetchVoid(`${this.baseUrl}/challenge-submissions`, {
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
      `${this.baseUrl}/challenge-submissions/challenge-name/${challengeName}`,
    )
  }

  async challengeSubmissionCommentCreate(
    challengeSubmissionCommentToCreate: ChallengeSubmissionCommentCreateDto,
  ): Promise<void> {
    await fetchVoid(`${this.baseUrl}/challenge-submission-comments`, {
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
      `${this.baseUrl}/challenge-submission-comments/challenge-submission-id/${challengeSubmissionId}`,
    )
  }

  async challengeSubmissionVoteCreate(
    challengeSubmissionVoteToCreate: ChallengeSubmissionVoteCreateDto,
  ): Promise<void> {
    await fetchVoid(`${this.baseUrl}/challenge-submission-votes`, {
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
      `${this.baseUrl}/challenge-submission-votes/challenge-submission-id/${submissionId}`,
    )
  }

  async submissionVoteDelete(id: number): Promise<void> {
    return await fetchJson(`${this.baseUrl}/challenge-votes/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
  }
}

const instance = new RealPcpService('http://localhost:8080')

export { instance as pcpService }
