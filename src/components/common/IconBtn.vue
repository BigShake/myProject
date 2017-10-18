<style>
@import "../../styles/common";

</style>

<template>
    <div class="clickable" :title="title" @click="onIconClick">
        <Icon :type="iconName" color="#45c8bc"></Icon>
    </div>
</template>

<script>
export default {
    props: ["iconName", "title", "onBtnClick"],
    methods: {
        onIconClick() {
            this.onBtnClick();
        }
    }
};
</script>
