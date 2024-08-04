export const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅈㅉㅊㅋㅌㅍㅎ'.split('');
export const JUNG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣ'.split('');
export const JONG = 'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅈㅊㅋㅌㅍㅎ'.split('');

export const isConsonant = (char) => CHO.includes(char);
export const isVowel = (char) => JUNG.includes(char);
export const isJongseong = (char) => JONG.includes(char);

export const composeHangul = (cho, jung, jong) => {
  const choIndex = CHO.indexOf(cho);
  const jungIndex = JUNG.indexOf(jung);
  const jongIndex = JONG.indexOf(jong);

  if (choIndex === -1 || jungIndex === -1) {
    return cho + jung + jong;
  }

  const baseCode = 0xAC00;
  const code = baseCode + (choIndex * 21 + jungIndex) * 28 + (jongIndex + 1);
  return String.fromCharCode(code);
};
