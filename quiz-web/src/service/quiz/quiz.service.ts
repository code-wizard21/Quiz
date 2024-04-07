import { AxiosResponse } from 'axios';
// import { ILoggedInUser } from 'common/types/user.type';
import { get } from '../../wrappers/request';
import { IAgoraRtcTokenResponse, IQuizLeaderboardResponse, IQuizResponse, IQuizesResponse, IUserQuizGameSummaryResponse } from '../../types/quiz.types';

export const getQuizList = async (): Promise<AxiosResponse<IQuizesResponse>> => {
  return get('quizes');
};

export const getQuizDetail = async (
  quizId: string,
): Promise<AxiosResponse<IQuizResponse>> => {
  return get(`quizes/${quizId}`);
}

export const getAgoraRtcToken = async (
  channel: string,
  role: string,
  tokenType: string,
  uid: number,
): Promise<AxiosResponse<IAgoraRtcTokenResponse>> => {
  return get(`agora/rtc/${channel}/${role}/${tokenType}/${uid}`);
}

export const getUserLeaderboard = async (
  quizId: string,
): Promise<AxiosResponse<IQuizLeaderboardResponse>> => {
  return get(`quizes/${quizId}/leaderboard`);
}

export const getQuizTopThree = async (
  quizId: string,
): Promise<AxiosResponse<IQuizLeaderboardResponse>> => {
  return get(`quizes/${quizId}/leaderboard/toppers`);
}

export const getUserQuizGameSummary = async (
  quizId: string,
): Promise<AxiosResponse<IUserQuizGameSummaryResponse>> => {
  return get(`/quizes/${quizId}/user/summary`);
}