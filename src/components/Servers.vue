<template>
    <table class="list">
      <tr class="server list-item" v-for="info in server" :key="info.address">
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
            <router-link
              class="btn btn-detail gary"
              :to="{ name: 'ServerDetail', params: { address: info.address }}"
            >详细信息</router-link>
          </span>
          <span class="btn btn-join orange" @click="join(info)">加入游戏</span>
        </td>
      </tr>
    </table>
</template>

<script>
import Promise from "promise-polyfill";
import { fetch as fetchPolyfill } from "whatwg-fetch";

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
    },
    detail: function(server) {}
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
