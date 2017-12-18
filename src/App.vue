<template>
  <div id="app" class="ui basic segment">
    <h1 class="ui header">App Component</h1>
    <a href="/" class="ui button">Home</a>
    <a href="/about" class="ui button">About</a>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  metaInfo: {
    title: 'MakerTap',
    titleTemplate: '%s - Watch and learn from makers and founders'
  }
}
</script>

