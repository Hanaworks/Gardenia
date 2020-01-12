<template>
  <section>
    <div class="rank-profile">
      <img class="profile-item profile-avatar" :src="avatar" />
      <div class="profile-item profile-infomation">
        <div class="profile-name">{{ player.info.name }}</div>
        <div class="profile-authid">{{ player.info.auth }}</div>
        <div class="profile-rank">第 ? 名({{ player.records.length }} 积分)</div>
        <div class="profile-preview">
          <div class="preview-item" title="第一记录的保持数">
            <div class="preview-data">?</div>
            <div class="preview-title">记录保持</div>
          </div>
          <div class="preview-item" title>
            <div class="preview-data">{{ player.records.length }}</div>
            <div class="preview-title">地图完成</div>
          </div>
        </div>
      </div>
    </div>
    <div class="record-list">
      <table class="list">
        <thead>
          <tr>
            <td class="list-cell rank">#</td>
            <td class="list-cell map">地图</td>
            <td class="list-cell player">玩家</td>
            <td class="list-cell auth">SteamID</td>
            <td class="list-cell type">记录类型</td>
            <td class="list-cell value">存点数</td>
            <td class="list-cell value">读点数</td>
            <td class="list-cell time">耗时</td>
            <td class="list-cell date">日期</td>
          </tr>
        </thead>
        <tbody>
          <tr class="record" v-for="rec in player.records" :key="rec.recordid">
            <td class="list-cell rank">?</td>
            <td class="list-cell map">
              <router-link
                :to="{ name: 'MapRecord', params: { mapname: rec.mapname }}"
              >{{ rec.mapname }}</router-link>
            </td>
            <td class="list-cell player">
              <router-link
                :to="{ name: 'PlayerInfo', params: { steamid: rec.authid }}"
              >{{ rec.name }}</router-link>
            </td>
            <td class="list-cell auth">{{rec.authid}}</td>
            <td class="list-cell type">{{ rec.type == null ? 'N/A' : (rec.type == 'Pro' ? '裸跳' : '存点') }}</td>
            <td class="list-cell value">{{rec.checkpoint}}</td>
            <td class="list-cell value">{{rec.gocheck}}</td>
            <td class="list-cell time">{{rec.time}}</td>
            <td class="list-cell date">{{rec.date}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import Promise from "promise-polyfill";
import { fetch as fetchPolyfill } from "whatwg-fetch";

export default {
  name: "Servers",
  data: function() {
    return {
      player: {
        info: {
          name: "N/A",
          auth: "N/A",
          auth64: null
        },
        records: []
      },
      avatar:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg"
    };
  },
  methods: {
    getPlayerAvatar: function() {
      console.log("request avatar");
      if (this.player.info.auth == null || this.player.info.auth == "N/A")
        return;

      var url = this.AppConfig.ApiConfig.baseUrl + "/steam/GetPlayerSummaries/" + this.player.info.auth;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          var _avatar = data.avatarFull;
          if (_avatar == null) return;

          this.avatar = _avatar;
        });
    },
    refreshMapRecord: function(steamid) {
      fetch(this.AppConfig.ApiConfig.baseUrl + "/rank/player/" + steamid)
        .then(response => response.json())
        .then(data => (this.player = data))
        .then(this.getPlayerAvatar());
    }
  },
  created: function() {
    this.refreshMapRecord(this.$route.params.steamid);
  },
  updated: function() {
    this.getPlayerAvatar();
  }
};
</script>