<style lang="less" scoped>
.throwable-item {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
}
.over-show-block {
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
}
</style>


<template>
<div class="throwable-item" 
    @mouseover="handleMouseOver($event)" 
    @mouseup="handleMouseUp($event)" 
    @mouseout="handleMouseOut($event)"
    ref="throwableItem">
    <div class="over-hide-block" v-show="!isOverBlockShow">
        <slot></slot>
    </div>
    <div class="over-show-block" v-show="isOverBlockShow">
        <slot name="overReplace"></slot>
    </div>
</div>
</template>

<script>
export default {
    props: {
        params: {
            default: {
                data: "default temp throw block data"
            }
        }
    },
    data() {
        return {
            isCurrentItem: false,
            isOverBlockShow: false
        };
    },
    methods: {
        handleMouseOver($event) {
            this.isCurrentItem = true;
            const tempDragBlockData = localStorage.getItem("tempDragBlockData");
            if (tempDragBlockData) {
                this.isOverBlockShow = true;
            }
        },
        handleMouseUp($event) {
            const tempDragBlockData = localStorage.getItem("tempDragBlockData");
            // if (this.isCurrentItem && tempDragBlockData) {
                
            // }
            if (tempDragBlockData) {
                localStorage.removeItem("tempDragBlockData");
            }
            this.isOverBlockShow = false;
        },
        handleMouseOut($event) {
            this.isCurrentItem = false;
            this.isOverBlockShow = false;
        }
    }
};
</script>
