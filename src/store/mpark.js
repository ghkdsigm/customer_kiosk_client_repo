//import { createStore } from 'vuex';
import { defineStore } from 'pinia'
import http from '@/api/utils/request'
//import productService from '@/api/services/productService'
import customerkioskService from '@/api/services/customerkioskService'

export const useMparkStore = defineStore('mpark', {
<<<<<<< HEAD
	state: () => ({
		danjiTitle: '',
		floorTitle: '',
		keboardUse: true,
		news:[],
		//예시
		//products: [],
	}),
	getters: {
		filteredNews: state => {
			return state.news.filter(item => item)
		},
		//예시
		// filteredProducts: state => {
		// 	return state.products.filter(product => product.available)
		// },
	},
	actions: {
		checkFloorTitle() {
			return this.floorTitle
		},
		setDanjiTitle(newTitle) {
			this.danjiTitle = newTitle
		},
		setFloorTitle(newTitle) {
			this.floorTitle = newTitle
		},
		setKeyBoardUse(toggle) {
			this.keboardUse = toggle
		},
		async fetchNews() {
		    try {
		        this.news = await customerkioskService.getNews();
		    } catch (error) {
		        console.error('Failed to fetch news:', error);
		    }
		},
		//예시
		// async fetchProducts() {
		//     try {
		//         this.products = await productService.getProducts();
		//     } catch (error) {
		//         console.error('Failed to fetch products:', error);
		//     }
		// },
		// async fetchProductById(id) {
		//     try {
		//         this.product = await productService.getProductById(id);
		//     } catch (error) {
		//         console.error(`Failed to fetch product with ID ${id}:`, error);
		//     }
		// },
	},
})
=======
  state: () => ({
    floorTitle: ''
  }),
  actions: {
    checkFloorTitle() {
        return this.floorTitle
    },
    setFloorTitle(newTitle) {
        this.floorTitle = newTitle
    }  
  }
})
>>>>>>> 7afb3a58728b3e243fad078faa5a2e1bac8a57cd
