import { message } from 'antd';
import moment from 'moment';
export const getQuizBackgroundImage = (quizCategory: string) => {
  switch (quizCategory) {
    case 'pop_culture':
      return {
        bgImage: new URL('../../public/assets/quiz-category/pop-culture-back.svg', import.meta.url).href,
        textImage: new URL('../../public/assets/quiz-category/pop-culture.svg', import.meta.url).href,
      };
    case 'country_or_travel':
      return {
        bgImage: new URL('../../public/assets/quiz-category/countries-travel-back.svg', import.meta.url).href,
        textImage: new URL('../../public/assets/quiz-category/countries-travel.svg', import.meta.url).href,
      };
    case 'health_or_wellness':
      return {
        bgImage: new URL('../../public/assets/quiz-category/health-wellness-back.svg', import.meta.url).href,
        textImage: new URL('../../public/assets/quiz-category/health-wellness.svg', import.meta.url).href,
      };
    case 'movies':
      return {
        bgImage: new URL('../../public/assets/quiz-category/movies-back.svg', import.meta.url).href,
        textImage: new URL('../../public/assets/quiz-category/movies.svg', import.meta.url).href,
      };
    case 'topical_or_news':
      return {
        bgImage: new URL('../../public/assets/quiz-category/topical-news-back.svg', import.meta.url).href,
        textImage: new URL('../../public/assets/quiz-category/topical-news.svg', import.meta.url).href,
      };
    case 'politics_or_history':
      return {
        bgImage: new URL('../../public/assets/quiz-category/politics-history-back.svg', import.meta.url).href,
        textImage: new URL('../../public/assets/quiz-category/politics-history.svg', import.meta.url).href,
      };
    case 'sports':
      return {
        bgImage: new URL('../../public/assets/quiz-category/sports-back.svg', import.meta.url).href,
        textImage: new URL('../../public/assets/quiz-category/sports.svg', import.meta.url).href,
      };
    case 'music':
      return {
        bgImage: new URL('../../public/assets/quiz-category/music-back.svg', import.meta.url).href,
        textImage: new URL('../../public/assets/quiz-category/music.svg', import.meta.url).href,
      };
    case 'business':
      return {
        bgImage: new URL('../../public/assets/quiz-category/business-back.svg', import.meta.url).href,
        textImage: new URL('../../public/assets/quiz-category/business.svg', import.meta.url).href,
      };
    case 'fashion':
      return {
        bgImage: new URL('../../public/assets/quiz-category/fashion-back.svg', import.meta.url).href,
        textImage: new URL('../../public/assets/quiz-category/fashion.svg', import.meta.url).href,
      };
    case 'celebrities':
      return {
        bgImage: new URL('../../public/assets/quiz-category/celebrities-back.svg', import.meta.url).href,
        textImage: new URL('../../public/assets/quiz-category/celebrities.svg', import.meta.url).href,
      };
    default:
      return {
        bgImage: new URL('../../public/assets/quiz-category/pop-culture-back.svg', import.meta.url).href,
        textImage: new URL('../../public/assets/quiz-category/pop-culture.svg', import.meta.url).href,
      };
  }
};

export const showMessages = (type: string, text: string) => {
  message.destroy();

  switch (type) {
    case 'success':
      message.success(text);
      break;
    case 'error':
      message.error(text);
      break;
    case 'warning':
      message.warning(text);
      break;
    case 'info':
      message.info(text);
      break;
    case 'loading':
      message.loading(text);
      break;
    default:
      message.info(text);
      break;
  }
};

export const convertDate = (date: string | undefined) => {
  if (!date) return '';
  const currentDate = new Date();
  const quizDate = new Date(date);
  if (currentDate.toDateString() === quizDate.toDateString()) {
    return `Today at ${moment.utc(quizDate).format('h:mm a')}`;
  } else {
    return moment.utc(quizDate).format('MMMM Do YYYY h:mm a');
  }
}
