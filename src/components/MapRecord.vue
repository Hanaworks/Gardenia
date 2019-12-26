<template>
  <table class="list">
    <thead>
      <tr>
        <td class="list-cell rank">#</td>
        <td class="list-cell map">地图</td>
        <td class="list-cell player">玩家</td>
        <td class="list-cell auth">SteamID</td>
        <td class="list-cell time">耗时</td>
        <td class="list-cell date">日期</td>
      </tr>
    </thead>
    <tbody>
      <tr class="record" v-for="(rec, index) in records" :key="rec.recordid">
        <td v-if="index < 3" class="list-cell rank rank-icon"></td>
        <td v-else class="list-cell rank">{{ index + 1 }}</td>

        <td class="list-cell map">
          <router-link
            :to="{ name: 'MapRecord', params: { mapname: rec.mapname }}"
          >{{ rec.mapname }}</router-link>
        </td>
        <td class="list-cell player">
          <router-link :to="{ name: 'PlayerInfo', params: { steamid: rec.authid }}">{{ rec.name }}</router-link>
        </td>
        <td class="list-cell auth">{{ rec.authid }}</td>
        <td class="list-cell time">{{ rec.time }}</td>
        <td class="list-cell date">{{ rec.date }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Promise from "promise-polyfill";
import { fetch as fetchPolyfill } from "whatwg-fetch";

export default {
  name: "Servers",
  data: function() {
    return {
      mapname: null,
      records: null
    };
  },
  methods: {
    refreshMapRecord: function(mapname) {
      this.mapname = mapname;

        fetch(this.AppConfig.ApiConfig.baseUrl + "/rank/map/" + mapname)
        .then(response => response.json())
        .then(data => (this.records = data));
    }
  },
  created: function() {
    var mapname = this.$route.params.mapname;
    this.refreshMapRecord(mapname);
  },
  updated: function () {
      this.$route.meta.title = (this.mapname + " 地图排行榜");
  }
};
</script>