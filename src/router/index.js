import Vue from 'vue'
import Router from 'vue-router'
import Servers from '@/components/Servers'
import ServerDetail from '@/components/ServerDetail'
import Rank from '@/components/Rank'
import Last from '@/components/Last'
import MapRecord from '@/components/MapRecord'
import PlayerInfo from '@/components/PlayerInfo'

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
		},
		{
			path: '/Rank',
			name: 'Rank',
			component: Rank,
			meta: {
				title: 'Hanaworks 计时排行榜'
			}
		},
		{
			path: '/Rank/Last',
			name: 'Last',
			component: Last,
			meta: {
				title: '最新完成记录'
			}
		},
		{
			path: '/Rank/Map/:mapname',
			name: 'MapRecord',
			component: MapRecord,
			meta: {
				title: '地图排行榜'
			}
		},
		{
			path: '/Rank/Player/:steamid',
			name: 'PlayerInfo',
			component: PlayerInfo,
			meta: {
				title: '个人信息'
			}
		}
	]
})
