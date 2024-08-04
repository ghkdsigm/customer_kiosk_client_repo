const CHO = 'ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅈㅉㅊㅋㅌㅍㅎ';
const JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
const JONG = 'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅈㅉㅊㅋㅌㅍㅎ';

// 초성인지 확인
export const isConsonant = (char) => CHO.includes(char);

// 중성인지 확인
export const isVowel = (char) => JUNG.includes(char);

// 종성인지 확인
export const isJongseong = (char) => JONG.includes(char);

// 한글 음절 조합
export const composeHangul = (cho, jung, jong) => {
  const choIndex = CHO.indexOf(cho);
  const jungIndex = JUNG.indexOf(jung);
  const jongIndex = JONG.indexOf(jong);

  // 초성, 중성이 유효하지 않은 경우
  if (choIndex === -1 || jungIndex === -1) {
    return '';
  }

  // 유니코드 한글 조합: 가는 0xAC00, 초성 21*28, 중성 28, 종성 1
  const baseCode = 0xAC00;
  const choOffset = choIndex * 21 * 28;
  const jungOffset = jungIndex * 28;
  const jongOffset = jongIndex;

  return String.fromCharCode(baseCode + choOffset + jungOffset + jongOffset);
};