<style lang="less">
@import "../../styles/difinitions";

.search-input {
    @searchInputHeight: 33px;
    @iconWidth: 40px;
    height: @searchInputHeight;
    line-height: @searchInputHeight;
    .ivu-input {
        height: 100%;
        border-radius: @searchInputHeight / 2; 

        border-color: @c-table-border !important;
        &:hover {
            border-color: @c-table-border !important;
        }

        padding-left: @searchInputHeight / 2;
        padding-right: @iconWidth;
    }
    .ivu-input-icon {
        height: 100%;
        line-height: @searchInputHeight;
        font-size: 25px;
        width: @iconWidth;
        cursor: pointer;
    }
}
</style>

<template>
    <Input v-model="value" icon="search" class="search-input" :placeholder="placeholder"
        @on-change="getChooseInputValue"
        @on-enter="searchDataEvent" 
        @on-click="searchDataEvent" style="width: 300px"></Input>

</template>

<script>
export default {
    props: {
        placeholder: {
            default: () => "搜索"
        }
    },
    data() {
        return {
            value: ""
        };
    },
    methods: {
        searchDataEvent() {
            this.$emit("listen-search-click", this.value);
        },
        getChooseInputValue() {
            this.$emit("listen-search-change", this.value);
        }
    }
};
</script>
