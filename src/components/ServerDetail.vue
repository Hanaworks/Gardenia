<template>
    <div class="server-detail">
      <div class="server-info">
        <table class="info-item info-table">
          <tr>
            <td>名称</td>
            <td>{{ server.info.name }}</td>
          </tr>
          <tr>
            <td>状态</td>
            <td>在线</td>
          </tr>
          <tr>
            <td>游戏</td>
            <td>{{ server.info.game || 'Unknown' }}</td>
          </tr>
          <tr>
            <td>地图</td>
            <td>{{ server.info.map }}</td>
          </tr>
          <tr>
            <td>玩家</td>
            <td>{{ server.info.players }} / {{ server.info.maxPlayers }}</td>
          </tr>
          <tr>
            <td>服务器地址</td>
            <td class="control">
              <span
                class="btn btn-join orange"
                title="点击进入服务器"
                @click="join(server)"
              >{{ server.info.address }}</span>
            </td>
          </tr>
        </table>
        <div class="info-item map-preview">
          <img
            :src="`http://s1-static.hanaworks.cc/images/small/${server.info.map}.jpg`"
            :alt="server.info.map"
          >
        </div>
      </div>
      <!-- <hr class="detail-split" /> -->
      <div class="server-player">
        <table class="player-info list">
          <thead>
            <tr>
              <td class="list-cell rank">玩家昵称</td>
              <td class="list-cell auth">游戏分数</td>
              <td class="list-cell time">游戏时长</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in server.players" :key="player.name">
              <td class="list-cell rank">{{ player.name }}</td>
              <td class="list-cell auth">{{ player.score }}</td>
              <td class="list-cell time">{{ player.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
import Promise from "promise-polyfill/src/polyfill";
import { fetch as fetchPolyfill } from "whatwg-fetch";

export default {
  name: "ServerDetail",
  data: function() {
    return {
      server: {
        info: {}
      }
    };
  },
  methods: {
    refreshDetail: function(server) {
      fetch("http://api.hanaworks.cc/server/detail/?address=" + server)
        .then(response => response.json())
        .then(data => (this.server = data));
    },
    join: function(server) {
      console.log(server);
      window.location.href = "steam://connect/" + server.info.address;
    }
  },
  created: function() {
    this.refreshDetail(this.$route.params.address);
  }
};
</script>

<style>
div.debug {
  border: 1px solid red;
  box-sizing: border-box;
}

.server-detail,
.server-player {
  margin: 0px auto;
  text-align: center;
}

.server-info .info-item {
  display: inline-block;
}

.info-table {
  border-collapse: separate;
  border-spacing: 15px 2px;
  margin-right: 30px;
}

.map-preview {
  vertical-align: top;
  margin-top: 20px;
}

.detail-split {
  border: none;
  height: 1px;
  background-color: #ccc;
  margin: 30px 0px;
}

.player-info {
  display: table;
  margin: 0px auto;
  margin-top: 50px;
  width: 60%;
}

.player-info thead {
  border-top: 1px solid #ccc;
}
</style>