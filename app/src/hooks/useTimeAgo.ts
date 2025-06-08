import { format, register } from 'timeago.js'; // 임포트하기 register 한국어 선택
import koLocale from 'timeago.js/lib/lang/ko';

register('ko', koLocale);

export default () => ({
  format: (date: string | Date, lang?: string) => format(date, lang || 'ko'),
});
