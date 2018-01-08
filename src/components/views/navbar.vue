<template>
    <div uk-sticky class="uk-dark cs-navbar-container">
        <div class="uk-container uk-container-expand">
            <nav uk-navbar class="uk-navbar-container uk-navbar-transparent">
                <div class="uk-navbar-left">
                    <a class="uk-navbar-item uk-logo" href="/">
                        <img alt="Makertap Logo" style="width: 35px" src="/static/images/logo-makertap.png"/>
                        <div style="margin-left: 9px;">Maker</div>
                        <span>Tap</span>
                    </a>
                </div>
                <div class="uk-navbar-right uk-hidden@m">
                    <button uk-navbar-toggle-icon uk-toggle="target: #mobile-menu" class="uk-icon uk-navbar-toggle"></button>
                </div>
                <div class="uk-navbar-right uk-visible@m">
                    <ul class="uk-navbar-nav">
                        <li class="uk-active">
                            <a href="/">HOME</a>
                        </li>
                        <li>
                            <a href="/browse">BROWSE VIDEOS</a>
                        </li>
                        <li v-if="!isAuthenticated">
                            <a href="/login">LOGIN</a>
                        </li>
                    </ul>
                    <div v-if="!isAuthenticated" class="uk-navbar-item">
                        <a href="/signup" class="uk-button uk-button-round gradient-green-btn text-white">SIGNUP</a>
                    </div>
                    <div v-if="isAuthenticated" class="uk-navbar-item">
                        <button class="user-avatar">
                            <img src="https://avatar.tobi.sh/241.svg?text=MK"/>
                            <span>{{ currentUser.username }}</span>
                        </button>
                        <div uk-dropdown="mode: click">
                            <ul class="uk-nav uk-dropdown-nav user-avatar-dropdown">
                                <li>
                                    <a :href="`/user/${currentUser.username}`">
                                        <span uk-icon="icon: user"></span>
                                        <span class="text">Channel</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/user/settings">
                                        <span uk-icon="icon: settings"></span>
                                        <span class="text">Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/logout">
                                        <span uk-icon="icon: sign-out"></span>
                                        <span class="text">Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <!-- <div class="user-avatar">
                            <img src="https://avatar.tobi.sh/241.svg?text=MK"/>
                            <span> kolafas</span>
                        </div> -->
                        <!-- <button class="uk-button uk-button-round gradient-green-btn text-white">SIGNUP</button> -->
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    isAuthenticated () {
      return this.$store.state.isAuthenticated
    }
  }
}
</script>

<style>

</style>
