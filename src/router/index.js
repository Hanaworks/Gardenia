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
			component: Servers,
			meta: {
				title: 'Hanaworks 服务器列表'
			}
		},
		{
			path: '/Server',
			name: 'Server',
			component: Servers,
			meta: {
				title: 'Hanaworks 服务器列表'
			}
		},
		{
			path: '/Server/:address',
			name: 'ServerDetail',
			component: ServerDetail,
			meta: {
				title: '服务器详情'
			}
		}
	]
})
