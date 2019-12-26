<template>
  <div class="record-list">
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
        <tr v-for="(rec, index) in records" :key="rec.recordid">
          <td class="list-cell rank">{{ index + 1 }}</td>
          <td class="list-cell map">
            <router-link :to="{ name: 'MapRecord', params: { mapname: rec.mapname }}">{{ rec.mapname }}</router-link>
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
  </div>
</template>

<script>
import Promise from "promise-polyfill";
import { fetch as fetchPolyfill } from "whatwg-fetch";

export default {
  name: "Rank",
  data: function() {
    return {
      records: null
    };
  },
  methods: {
    refreshRecordList: function() {
        fetch(this.AppConfig.ApiConfig.baseUrl + "/rank/last")
        .then(response => response.json())
        .then(data => (this.records = data));
    }
  },
  created: function() {
    this.refreshRecordList();
  }
};
</script>