import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './index.css'
import router from './router'
import store from './store'
import './registerServiceWorker';
import Hangul from 'hangul-js'; 

const pinia = createPinia()

const app = createApp(App);

// hangul-js를 전역 속성으로 추가합니다.
app.config.globalProperties.$hangul = Hangul;

app.use(pinia).use(router).use(store).mount('#app')