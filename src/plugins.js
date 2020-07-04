import Vue from 'vue'
import ElementUI from 'element-ui'
import 'normalize.css'
import '@/assets/scss/element-custom.scss'
import axios from './http'
import Layout from './layout'
import CommonMenu from './components/CommonMenu'

Vue.use(ElementUI)
Vue.prototype.$http = axios

Vue.component('layout', Layout)
Vue.component('commonmenu', CommonMenu)
