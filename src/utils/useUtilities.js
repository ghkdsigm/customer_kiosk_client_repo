import { ref } from 'vue';

export function useUtilities() {
  //공백 들여쓰기
  const formatStringWithNewlines = (rawString) => {
    return rawString.replace(/\n/g, '<br>');
  };

  //공통 이미지 처리
  const getImageSrc = (folder, file) => {
    const images = {
      bottom: import.meta.glob('@/assets/img/bottom/*.svg', { eager: true }),
      side: import.meta.glob('@/assets/img/side/*.svg', { eager: true }),
      news: import.meta.glob('@/assets/img/news/*.png', { eager: true }),
      // 필요 경로들 여기에 추가
    };    
    const selectedFolder = images[folder] || {};
    const fileName = `/src/assets/img/${folder}/${file}.svg`;

    return selectedFolder[fileName]?.default || selectedFolder[fileName];
  };

  return {
    formatStringWithNewlines,
    getImageSrc
  };
}