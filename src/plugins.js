import Vue from 'vue'
import ElementUI from 'element-ui'
import 'normalize.css'
import '@/assets/scss/element-custom.scss'
import axios from './http'
import filters from './filters'

Vue.use(ElementUI)
Vue.prototype.$http = axios

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
