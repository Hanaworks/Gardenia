<template>
  <div>
    <div class="title">Hanaworks 服务器列表</div>
    <table class="list">
      <tr class="server list-item" v-for="info in server">
        <td class="list-cell cell-left name">{{ info.name }}</td>
        <td class="list-cell cell-left address">{{ info.address }}</td>
        <td class="list-cell map">
          <span class="map-name">{{ info.map }}</span>

          <!-- <span class="map-detail"></span> -->
        </td>
        <td class="list-cell players">
          <span class="red">{{ info.players }}</span>
          <span>/</span>
          <span>{{ info.maxPlayers }}</span>
        </td>
        <td class="list-cell control">
          <span class="btn btn-detail">
            <router-link class="btn btn-detail gary" :to="{ name: 'ServerDetail', params: { address: info.address }}">详细信息</router-link>
          </span>
          <span class="btn btn-join orange" @click="join(info)">加入游戏</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Servers",
  data: function() {
    return {
      server: null
    };
  },
  methods: {
    refreshServerList: function() {
      fetch("http://111.73.45.28:8089/server/list")
        .then(response => response.json())
        .then(data => (this.server = data));
    },
    join: function(server) {
      window.location.href = "steam://connect/" + server.address;
	},
	detail: function(server) {

	}
  },
  created: function() {
    this.refreshServerList();
  }
};
</script>

<style>
.btn-detail {
	margin-right: 10px;
}
</style>
