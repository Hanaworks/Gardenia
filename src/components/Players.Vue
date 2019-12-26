<template>
  <div class="record-list">
    <table class="list">
      <thead>
        <tr>
          <td class="list-cell rank">#</td>
          <td class="list-cell player">玩家</td>
          <td class="list-cell auth">SteamID</td>
          <td class="list-cell region">地区</td>
          <td class="list-cell">记录保持</td>
          <td class="list-cell">地图完成</td>
          <td class="list-cell">积分</td>
          <td class="list-cell date">最近在线</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, index) in players" :key="index">
          <td v-if="index < 3" class="list-cell rank rank-icon"></td>
          <td v-else class="list-cell rank">{{ index + 1 }}</td>
          <td class="list-cell player">
            <router-link :to="{ name: 'PlayerInfo', params: { steamid: player.steamID }}">
                {{ player.name }}
            </router-link>
          </td>
          <td class="list-cell auth">{{ player.steamID }}</td>
          <td class="list-cell region">
              <img :src="`${AppConfig.StaticUrl}/flags/${(player.country || 'hk').toLowerCase()}.gif`" :alt="player.country">
              {{ player.country || '香港特别行政区' }}
          </td>
          <td class="list-cell">{{ player.holdRecords }}</td>
          <td class="list-cell">{{ player.records }}</td>
          <td class="list-cell">{{ player.points }}</td>
          <td class="list-cell date">{{ player.lastLogin }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Promise from "promise-polyfill";
import { fetch as fetchPolyfill } from "whatwg-fetch";

export default {
  name: "Rank",
  data: function() {
    return {
      players: null
    };
  },
  methods: {
    refreshRecordList: function() {
      fetch(this.AppConfig.ApiConfig.baseUrl + "/rank/players")
        .then(response => response.json())
        .then(data => (this.players = data));
    }
  },
  created: function() {
    this.refreshRecordList();
  }
};
</script>