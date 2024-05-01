export enum CLINIC_TYPE {
  Dentist = 'dentist',
  Cardiologist = 'cardiologist',
  GeneralPractitioner = 'general_practitioner',
  Psychotherapist = 'psychotherapist',
}

export enum USER_ROLE {
  USER = 'user',
  HOST = 'host',
  SHADOW = 'shadow',
}

export enum REQUEST_METHODS {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum SOCKET_EMITTERS {
  USER_JOIN_LIVE_QUIZ = 'user_join_live_quiz',
  USER_LEAVE_LIVE_QUIZ = 'user_leave_live_quiz',
  USER_USE_TICKET = 'user_use_ticket',
  USER_SUBMIT_LIVE_QUIZ_ANSWER = 'user_submit_live_quiz_answer',
  USER_QUIZ_LIVE_QUESTION_ANSWER = 'user_quiz_live_question_answer',
}

export enum SOCKET_LISTENERS {
  QUIZ_LIVE_START = 'quiz_live_start',
  USER_QUIZ_LIVE_CHANGE = 'user_quiz_live_change',
  USER_QUIZ_LIVE_CALCULATION_START = 'user_quiz_live_calculation_start',
  USER_QUIZ_LIVE_CALCULATION_END = 'user_quiz_live_calculation_end',
  USER_QUIZ_LIVE_QUESTION = 'user_quiz_live_question',
  USER_QUIZ_LIVE_QUESTION_OPTIONS = 'user_quiz_live_question_options',
  USER_QUIZ_LIVE_QUESTION_END = 'user_quiz_live_question_end',
  USER_QUIZ_LIVE_QUESTION_RESULT = 'user_quiz_live_question_result',
  USER_QUIZ_LAST_QUESTION = 'user_quiz_last_question',
  USER_QUIZ_LIVE_VIEWER_COUNT = 'user_quiz_live_viewer_count',
  USER_QUIZ_LIVE_QUESTION_ANSWER = 'user_quiz_live_question_answer',
  HOST_LIVE_CHANGE = 'host_live_change',
  HOST_EMOJI_RECEIVED = 'host_emoji_received',
  HOST_LIVE_QUIZ_QUESTION_START = 'host_live_quiz_question_start',
  USER_SHOW_POOL = 'user_show_pool',
}

export enum OPTION_PROGRESS_COLORS {
  GENERAL_OPTIONS = '#C2CDFF', // light blue
  GENERAL_OPTIONS_BG = '#FFFFFF', // white
  WRONG_OPTION = '#FF9ABE', // light pink
  USER_SELECTION = '#FFF8CC', // light yellow
  USER_SELECTION_BG = '#F9DC30', // yellow
  USER_SELECTION_CORRECT = '#AEE7A5', // light green
  USER_SELECTION_CORRECT_BG = '#66C956', // green
  USER_SELECTION_WRONG_BG = '#FFFFFF', // white
}
