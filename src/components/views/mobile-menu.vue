<template>
    <div id="mobile-menu" uk-offcanvas="mode: push;overlay:true">
        <div class="uk-offcanvas-bar">
            <button class="uk-offcanvas-close" type="button" uk-close></button>
            <ul class="uk-nav uk-nav-default">
                <li :class="{ 'uk-active': route.path === '/' }">
                    <a href="/">HOME</a>
                </li>
                <li :class="{ 'uk-active': route.path === '/explore' }">
                    <a href="/explore">EXPLORE</a>
                </li>
                <li class="">
                    <a href="/login">LOGIN</a>
                </li>
                <li class="">
                    <a href="/signup">SIGNUP</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  mounted () {
    console.log(this.route, 'router')
  },
  computed: {
    route () {
      return this.$route
    }
  }
}
</script>

<style>

</style>
