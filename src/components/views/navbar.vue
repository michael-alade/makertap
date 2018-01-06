<template>
    <div uk-sticky class="uk-dark cs-navbar-container">
        <div class="uk-container uk-container-expand">
            <nav uk-navbar class="uk-navbar-container uk-navbar-transparent">
                <div class="uk-navbar-left">
                    <a class="uk-navbar-item uk-logo" href="/">
                        <img alt="Makertap Logo" style="width: 35px" src="/static/images/logo.png"/>
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
                        <li>
                            <a href="">LOGIN</a>
                        </li>
                    </ul>
                    <div class="uk-navbar-item">
                        <button class="uk-button uk-button-round gradient-green-btn text-white">SIGNUP</button>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style>

</style>
