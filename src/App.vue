<template>
  <main :class="'list-container container ' + rendermode">
    <div class="game-margin"></div>
    <div class="title">{{ $route.meta.title }}</div>
    <router-view/>
  </main>
</template>

<script>
export default {
  name: "App",
  created: function() {
    var userAgent = navigator.userAgent;
    var isGameBrowser =
      userAgent.indexOf("Value Client") != -1 ||
      userAgent.indexOf("Valve Half-Life") != -1;

      this.rendermode = isGameBrowser ? 'in-game' : 'browser';
      
  }
};
</script>