export type QuizLiveStart = {
  quiz_id: string;
  room_id: number;
};

export type QuizLiveChange = {
  status: string;  
};
export type USERLiveViewCount = {
  viewer_count: number;  
};
export type USER_QUIZ_LIVE_CALCULATION_END = {
  quiz: string;  
};

