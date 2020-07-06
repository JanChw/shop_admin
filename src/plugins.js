import Vue from 'vue'
import ElementUI from 'element-ui'
import 'normalize.css'
import '@/assets/scss/element-custom.scss'
import axios from './http'

Vue.use(ElementUI)
Vue.prototype.$http = axios
