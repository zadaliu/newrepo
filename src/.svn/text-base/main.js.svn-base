import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css
import Avue from '@smallwei/avue'
import App from './App'
import router from './router'
import store from './store'
import echarts from "echarts";

import '@smallwei/avue/lib/index.css'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.use(VCharts)
Vue.use(Avue)

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
