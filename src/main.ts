import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { Icon } from '@iconify/vue';

const pinia = createPinia()

createApp(App)
.use(pinia)
.component('Icon', Icon)
.use(router)
.mount('#app')
