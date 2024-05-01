import { AxiosResponse } from 'axios';
// import { ILoggedInUser } from 'common/types/user.type';
import { get,post } from '../../wrappers/request';
import { IAgoraRtcTokenResponse, IQuizLeaderboardResponse, IQuizResponse, IQuizesResponse, IUserQuizGameSummaryResponse } from '../../types/quiz.types';

export const getQuizList = async (): Promise<AxiosResponse<IQuizesResponse>> => {
  return get('quizes');
};
export const getQuestionWithOption = async (userData): Promise<AxiosResponse<IQuizesResponse>> => {
  return post('quizes/getquestion',userData);
};
export const getOnlyQuestion = async (userData): Promise<AxiosResponse<IQuizesResponse>> => {
  return post('quizes/getonlyquestion',userData);
};


export const getQuizDetail = async (
  quizId: string,
): Promise<AxiosResponse<IQuizResponse>> => {
  return get(`quizes/${quizId}`);
}

export const getQuizState = async (

): Promise<AxiosResponse<IQuizResponse>> => {
  return get(`quizes/getstate`);
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

export const getLiveQuiz = async (
  quizId: string,
): Promise<AxiosResponse<IQuizLeaderboardResponse>> => {
  return get(`quizes/${quizId}/livequiz`);
}

export const getUserQuizGameSummary = async (
  quizId: string,
): Promise<AxiosResponse<IUserQuizGameSummaryResponse>> => {
  return get(`/quizes/${quizId}/user/summary`);
}