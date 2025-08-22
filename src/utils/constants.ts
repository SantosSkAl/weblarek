/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`; 
/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

export const settings = {

};

export const BUYER_FIELDS_VALIDATORS = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
  PHONE_CHARS_REGEX: /^[+\d\s().-]+$/,
  PHONE_MIN_DIGITS: 7,
  PHONE_MAX_DIGITS: 15,
} as const;

