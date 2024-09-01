// src/utils/touchClick.js
export default {
    beforeMount(el, binding) {
      const handleTouchEnd = (event) => {
        // 터치 종료 시 클릭 이벤트 발생
        console.log('Touch end detected');
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        event.target.dispatchEvent(clickEvent);
      };
  
      // 터치 종료 이벤트를 로그
      console.log('Directive mounted on element:', el);
  
      el.addEventListener('touchend', handleTouchEnd);
  
      // 디렉티브 언마운트 시 이벤트 리스너 제거
      el._handleTouchEnd = handleTouchEnd;
    },
    unmounted(el) {
      console.log('Directive unmounted from element:', el);
      el.removeEventListener('touchend', el._handleTouchEnd);
    }
  };