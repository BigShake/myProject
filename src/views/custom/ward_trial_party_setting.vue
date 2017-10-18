<style scoped lang="less">
    .content-container {
        height: 100%;
        width: 70%;
        margin: auto;
    }
    .header {
        padding: 10px;
    }
</style>

<template>
    <div class="specification">
        <div class="content-container">
            <div class="header">
                <Button @click="checkreturn()">返回列表</Button>
            </div>
            <ContentAndExaminePrescription></ContentAndExaminePrescription>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
            };
        },
        methods: {
            checkreturn () {
                this.$router.push("/ward_prescription");
            }
        },
        created () {
        }
    };
</script>