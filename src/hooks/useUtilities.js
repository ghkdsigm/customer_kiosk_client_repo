import { ref } from 'vue';

export function useUtilities() {
  const formatStringWithNewlines = (rawString) => {
    return rawString.replace(/\n/g, '<br>');
  };

  const anotherUtilityFunction = (value) => {
    return `Modified ${value}`;
  };

  return {
    formatStringWithNewlines,
    anotherUtilityFunction
  };
}