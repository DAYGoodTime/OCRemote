import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Icon from './components/Icon'
import { router } from './router'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)
app
.use(router)
.use(createPinia())
.use(VueApexCharts)
.component("Icon",Icon)
.mount('#app')