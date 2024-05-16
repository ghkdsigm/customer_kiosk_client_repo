import { createApp } from 'vue'
import { upperFirst, camelCase } from 'lodash-es';
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'

createApp(App).use(router).use(store).mount('#app')