import Vue from 'vue'
import Router from 'vue-router'
import Servers from '@/components/Servers'
import ServerDetail from '@/components/ServerDetail'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Index',
			component: Servers
		},
		{
			path: '/Server',
			name: 'Server',
			component: Servers
		},
		{
			path: '/Server/:address',
			name: 'ServerDetail',
			component: ServerDetail
		}
	]
})
