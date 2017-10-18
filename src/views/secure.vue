<style lang="less" scoped>
@import "../styles/difinitions.less";
.layout-logo-left{
    width: 12.5%;
    background-image: url(../images/logo.png);
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: auto 60%;
    display: inline-block;
    vertical-align: middle;
}
.single-title-content-block:extend(.default-theme .title-height-block) {
    display: inline-block;
    width: 100%;
    height: @l-title-height;
    box-shadow: 0 2px 5px @c-block-border;
}
.title-content-right {
    display: inline-block;
    padding: 15px 30px;
    box-sizing: border-box;
    vertical-align: middle;
}
.single-title-text {
    .font-l();
}
</style>

<template>
    <div>
        <div class="single-title-content-block">
            <div class="layout-logo-left main-color-block title-height-block">
            </div><div class="title-content-right">
                <div class="single-title-text">{{this.title}}</div>
            </div>
        </div>
        <div class="single-main-content-block">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: ""
        };
    },
    created() {
        this.title = this.$route.meta.title;
    }
};
</script>

