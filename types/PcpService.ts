import {
  ChallengeBriefDto,
  ChallengeCreateDto,
  ChallengeDto,
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
}

export type { PcpService }
