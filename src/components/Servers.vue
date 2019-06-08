<template>
  <div>
    <div class="title">Hanaworks 服务器列表</div>
    <table class="list">
      <tr class="server list-item" v-for="info in server">
        <td class="list-cell cell-left name">{{ info.name }}</td>
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
          <!-- <span class="btn btn-detail">详细信息</span> -->
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
      fetch("http://api.hanaworks.cc/server/list")
        .then(response => response.json())
        .then(data => (this.server = data));
    },
    join: function(server) {
      window.location.href = "steam://connect/" + server.address;
    }
  },
  created: function() {
    this.refreshServerList();
  }
};
</script>