import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './index.css'
import router from './router'
import store from './store'

const pinia = createPinia()


createApp(App).use(pinia).use(router).use(store).mount('#app')