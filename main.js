import Vue from 'vue'
import App from './App'
import store from './store'

import home from './pages/home/home.vue'
Vue.component('home',home)

import bids from './pages/bids/bids.vue'
Vue.component('bids',bids)

import friends from './pages/friends/friends.vue'
Vue.component('friends',friends)


import account from './pages/account/account.vue'
Vue.component('account',account)

import recharge from './pages/recharge/recharge.vue'
Vue.component('recharge',recharge)

import login from './pages/login/login.vue'
Vue.component('login',login)

import article from './pages/article/article.vue'
Vue.component('article',article)

import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import components from './pages/component/home.vue'
Vue.component('components',components)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin',plugin)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

 



