import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Icon from './components/Icon'
import { router } from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { optimize } from './utils/optimize'

const app = createApp(App)
app
.use(router)
.use(createPinia())
.use(ElementPlus)
.component("Icon",Icon)
.directive("optimize",optimize)
.mount('#app')