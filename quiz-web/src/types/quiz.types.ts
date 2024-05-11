import { IUser } from './user.type';

interface TQuizCategory {
  _id: string;
  name: string;
  image: string;
  description: string;
  active: boolean;
}
export interface IQuiz {
  _id: string;
  host: IUser;
  voting_category: string[];
  status: string;
  start_date: string;
  is_paid: boolean;
  description: string;
  is_live: boolean;
  pool: number;
  question_index:number;
  contestants:number;
  total_questions:number;
  image: string;
  category: TQuizCategory;
  total_votes: number;
  has_voted: boolean;
}

interface IUserAnswer {
  _id: string;
  duration: number;
  is_correct: boolean;
  text: string;
}

export interface IQuizesResponse {
  data: {
    results: IQuiz[];
  };
  message: string;
  status: number;
}

export interface IQuizResponse {
  data: IQuiz;
  message: string;
  status: number;
}

export interface IAgoraRtcTokenResponse {
  data: string;
  message: string;
  status: number;
}

export interface IQuestion {
  quiz?: string;
  _id: string;
  text: string;
  type: string;
  options?: IOption[];
  user_answer?: IUserAnswer;
}

export interface IOption {
  _id: string;
  text: string;
  is_correct?: boolean;
  number_of_votes?: number;
  total_answers?: number;
  per_of_all_option_answers?: number;
  is_selected?: boolean;
  progress_bar_value?: number;
  progress_bar_stroke_color?: string;
  progress_bar_background_color?: string;
}

export interface IQuestionResponse {
  question: IQuestion;
  question_index?: number;
  total_questions?: number;
  status:string
}

export interface IQuestionStats {
  totalAnswers: IOption[];
  user_id: string;
}

export interface ILeaderboardResult {
  quiz: string;
  user: IUser;
  rank: number;
  correct_answers: number;
  total_duration: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface ILeaderboard {
  results: ILeaderboardResult[];
  page: number;
  limit: number;
  total_pages: number;
  total_results: number;
}

export interface IQuizLeaderboardOverview {
  leaderboard: ILeaderboard;
  total_questions: number;
  page: number;
}

export interface IQuizLeaderboardResponse {
  data: IQuizLeaderboardOverview;
  message: string;
  status: number;
}

export interface IUserQuizGameSummaryResponse {
  data: IQuestion[];
  message: string;
  status: number;
}
