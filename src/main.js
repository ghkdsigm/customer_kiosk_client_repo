import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './index.css'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { GesturePlugin } from '@vueuse/gesture'
import { MotionPlugin } from '@vueuse/motion'
const pinia = createPinia()


 
createApp(App).use(pinia).use(router).use(store).use(GesturePlugin).use(MotionPlugin).mount('#app')
 