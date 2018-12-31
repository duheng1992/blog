<template>
  <div class="layout-default">
      <dh-header></dh-header>
      <nuxt class="layout-main"/>
      <dh-footer></dh-footer>
      <div class="layout-bg"></div>
  </div>
</template>

<script type="text/javascript">
import dhHeader from "~/components/layout/header.vue";
import dhFooter from "~/components/layout/footer.vue";
export default {
    data () {
        return {};
    },
    mounted () {
        // this.$store.dispatch("initUser");
    },
    components: {
        dhHeader,
        dhFooter
    }
};
</script>

<style lang="less">
    @import "~assets/style/varilables.less";

    html,
    body,
    #__nuxt,
    #__layout,
    .layout-default {
        height: 100%;
        .layout-main {
            min-height: calc(~"100% - " (@layout-header-height + @layout-footer-height));
            max-width: 640px;
            margin: 0 auto;
            padding-bottom: 20px;
        }

        .layout-bg {
            position: fixed;
            left: 0;
            top: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            background: url("~/assets/images/bg1.jpg") no-repeat fixed top;
            background-size: cover;
            opacity: 0.1;
            filter: blur(2px);
        }
    }
</style>
