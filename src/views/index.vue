<style scoped lang="less">
.index {
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    h1{
        height: 150px;
        img{
            height: 100%;
        }
    }
    h2{
        color: #666;
        p{
            margin: 0 0 50px;
        }
    }
    .ivu-row-flex{
        height: 100%;
    }
}
</style>

<template>
    <div>
        <Input v-model="timeLowerModel" placeholder="下限" title="使用时间下限" @on-keyup="test"></Input>
    </div>
</template>

<script>
export default {
    data() {
        return {
            timeLowerModel: ''
        };
    },
    methods: {
        test () {
            // console.log(this.$el);
            // console.log('event: ', event);
        }
    }
};
</script>
