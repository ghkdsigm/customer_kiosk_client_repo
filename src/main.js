import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './index.css'
import router from './router'
import store from './store'
//import './registerServiceWorker'
import ScreenSaver from './components/customerkiosk/screensaver/index.vue'
import LoadingSpinner from './components/common/spinner/spinner.vue'
import LoadingStatus from './components/common/spinner/loadiStatus.vue'
import CarLoading from './components/common/spinner/loading.vue'
import Popup01 from './components/common/popup/popup01.vue'
import Popup02 from './components/common/popup/popup02.vue'
import Popup03 from './components/common/popup/popup03.vue'
import Popup05 from './components/common/popup/popup05.vue'
import Popup06 from './components/common/popup/popup06.vue'
import Popup09 from './components/common/popup/popup09.vue'
import Slider01 from '@/components/common/slide/slider01.vue'
import Slider02 from './components/common/slide/slider02.vue'
import Slider03 from './components/common/slide/slider03.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//터치안될시
import touchClick from '@/utils/touchClick.js'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate).use(({ store }) => {
	// store에서 this.$router로 참조가능
	store.$router = router
})
createApp(App)
	.use(pinia)
	.use(router)
	.use(store)
	.component('ScreenSaver', ScreenSaver)
	.component('LoadingSpinner', LoadingSpinner)
	.component('LoadingStatus', LoadingStatus)
	.component('CarLoading', CarLoading)
	.component('Popup01', Popup01)
	.component('Popup02', Popup02)
	.component('Popup03', Popup03)
	.component('Popup05', Popup05)
	.component('Popup06', Popup06)
	.component('Popup09', Popup09)
	.component('Slider01', Slider01)
	.component('Slider02', Slider02)
	.component('Slider03', Slider03)
	.directive('touch-click', touchClick)
	.mount('#app')
