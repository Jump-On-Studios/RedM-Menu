import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import API from './API'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(store)
app.config.globalProperties.$API = API
app.mount('#app')