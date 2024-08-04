<template>
    <div class="keyboard-container">
      <input type="text" ref="keyboardInput" placeholder="검색어를 입력하세요" readonly />
      <div ref="keyboardZone"></div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, nextTick } from 'vue';
  import Hangul from 'hangul-js';
  
  export default {
    setup() {
      const keyboardInput = ref(null);
      const keyboardZone = ref(null);
      const nowlang = ref('koNormal');
      const charlist = ref([]);
      const keydiv = ref({});
  
      const form = {
        koNormal: [
          ['뒤로', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace'],
          ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'],
          ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', 'enter'],
          ['shift', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', '한/영'],
          ['space']
        ],
        koShift: [
          ['뒤로', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', 'backspace'],
          ['ㅃ', 'ㅉ', 'ㄸ', 'ㄲ', 'ㅆ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅒ', 'ㅖ'],
          ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', 'enter'],
          ['shift', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', '한/영'],
          ['space']
        ],
        enNormal: [
          ['뒤로', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace'],
          ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
          ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter'],
          ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '한/영'],
          ['space']
        ],
        enShift: [
          ['뒤로', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', 'backspace'],
          ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
          ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'enter'],
          ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '한/영'],
          ['space']
        ]
      };
  
      onMounted(async () => {
        await nextTick();
        initKeyboard();
      });
  
      function initKeyboard() {
        const zone = keyboardZone.value;
        const input = keyboardInput.value;
  
        for (let index = 0; index < Object.keys(form).length; index++) {
          keydiv.value[Object.keys(form)[index]] = document.createElement("div");
          keydiv.value[Object.keys(form)[index]].style.cssText = `
            position: absolute;
            width : 100%;
            height: 100%;
            align : center;
            visibility: hidden;
            font-size: 25px;
          `;
          for (let i = 0; i < form[Object.keys(form)[index]].length; i++) {
            var keyline = document.createElement("table");
            keyline.style.cssText = `
              width : 100%;
              height: calc(100% / ${form[Object.keys(form)[index]].length});
            `;
            for (let j = 0; j < form[Object.keys(form)[index]][i].length; j++) {
              var key = document.createElement("th");
              key.style.cssText = `
                padding-top : calc((100% / ${form[Object.keys(form)[index]].length}) / 5);
              `;
              key.innerText = form[Object.keys(form)[index]][i][j];
              key.addEventListener("click", keyfun);
              keyline.appendChild(key);
            }
            keydiv.value[Object.keys(form)[index]].appendChild(keyline);
          }
          zone.appendChild(keydiv.value[Object.keys(form)[index]]);
        }
        keydiv.value[nowlang.value].style.visibility = "visible";
      }
  
      function keyfun(event) {
        const key = event.target.innerText;
        if (key === '뒤로') {
          onESC();
          return;
        } else if (key === 'enter') {
          onEnter(getText());
          return;
        } else if (key === '한/영') {
          toggleLang();
          return;
        } else if (key === 'shift') {
          toggleShift();
          return;
        } else if (key === 'backspace') {
          charlist.value.splice(charlist.value.length - 1, 1);
        } else if (key === 'space') {
          charlist.value.push(" ");
        } else {
          charlist.value.push(key);
        }
  
        const text = Hangul.assemble(charlist.value);
        keyboardInput.value.value = text;
        if (onClick != null) {
          onClick(getText());
        }
      }
  
      function toggleLang() {
        keydiv.value[nowlang.value].style.visibility = "hidden";
        if (nowlang.value === "koNormal") {
          nowlang.value = "enNormal";
        } else if (nowlang.value === "enNormal") {
          nowlang.value = "koNormal";
        } else if (nowlang.value === "koShift") {
          nowlang.value = "enShift";
        } else if (nowlang.value === "enShift") {
          nowlang.value = "koShift";
        }
        keydiv.value[nowlang.value].style.visibility = "visible";
      }
  
      function toggleShift() {
        keydiv.value[nowlang.value].style.visibility = "hidden";
        if (nowlang.value === "koNormal") {
          nowlang.value = "koShift";
        } else if (nowlang.value === "enNormal") {
          nowlang.value = "enShift";
        } else if (nowlang.value === "koShift") {
          nowlang.value = "koNormal";
        } else if (nowlang.value === "enShift") {
          nowlang.value = "enNormal";
        }
        keydiv.value[nowlang.value].style.visibility = "visible";
      }
  
      function onESC() {
        // ESC 동작을 구현하세요
      }
  
      function onEnter(text) {
        alert(`검색어: ${text}`);
      }
  
      function getText() {
        return Hangul.assemble(charlist.value);
      }
  
      return {
        keyboardInput,
        keyboardZone,
        nowlang,
        charlist,
        keydiv,
        initKeyboard,
        keyfun,
        toggleLang,
        toggleShift,
        onESC,
        onEnter,
        getText
      };
    }
  };
  </script>
  
  <style scoped>
  .keyboard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    position: absolute;
    bottom: 442px;
  }
  
  input {
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    border: 2px solid #ccc;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 400px;
  }
  </style>
  