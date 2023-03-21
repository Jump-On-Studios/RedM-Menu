import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import API from './API'

const app = createApp(App)
app.use(store)
app.config.globalProperties.$API = API
app.mount('#app')