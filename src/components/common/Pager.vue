<style lang="less">
@import "../../styles/difinitions";

.page-div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    margin: 10px 0;

    .ivu-page-item-active {
        background-color: #fff;
        border-color: @c-main;
        color: @c-main;
    }
    .ivu-page-item-active:hover a, .ivu-page-item-active a {
        color: @c-main;
    }
}

.red-font {
    color: @c-orange;
}

.select-perpage {
    height: 100%;
}

.select-perpage.ivu-select-small.ivu-select-single .ivu-select-selection {
    height: 100%;
}

.select-perpage.ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
.select-perpage.ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    height: 100%;
    line-height: 2.0;
}

.self-page {
    margin: 0 6px;
}

.self-page .ivu-icon-ios-arrow-left:before {
    content: "\e60d";
    color: @c-support;
}

.self-page .ivu-icon-ios-arrow-right:before {
    content: "\e60e";
    color: @c-support;
}

.self-page-btn-mix () {
    width: 32px;
    height: 32px;
    border: 1px solid #dedede;
    background-color: #fff;
    color: @c-support;
}

.self-page-btn {
    .self-page-btn-mix();
    
}
.self-page-btn:not(:last-child) {
    margin-right: 6px;
    .self-page-btn-mix();
}

.default-theme .self-page-btn.ivu-btn.ivu-btn-icon-only {
    width: 32px;
    height: 32px;
    border: 1px solid #dedede;
    background-color: #fff;
    color: @c-support;
}

.default-theme .self-page-disabled-btn.ivu-btn.ivu-btn-icon-only {
    width: 32px;
    height: 32px;
    border: 1px solid #dedede;
    background-color: #fff;
    margin-right: 6px;
    color: @c-support;
}

</style>
<template>
    <div>
        <slot></slot>
        <div class="page-div" style="overflow: hidden">
                <div>共有</div>
                <div><p class="red-font">{{totalNum}}</p></div>
                <div>条，每页</div>
                <div style="padding: 0 6px;height: 100%;">
                    <Select v-model="perPage" class="select-perpage" size="small" placement="top"
                        style="width:70px;height: 100%;"
                        @on-change="changePerPage">
                        <Option v-for="item in pageList" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                </div>
                <div>条</div>
                <div style="margin-left: 20px;display: flex;justify-content: flex-start;">
                    <Button type="text" icon="arrow-double-left"
                        class="self-page-btn"
                        style="color: #6d768c;"
                        :disabled="currentPage === 1" 
                        @click="gotoOnepage"></Button>
                    <Page :total="total"
                        :page-size="perPage"
                        :current="currentPage" 
                        class="self-page" 
                        @on-change="onPageChange"></Page>
                    <Button type="text" icon="arrow-double-right"
                        class="self-page-btn"
                        style="color: #6d768c;"
                        :disabled="currentPage === totalPage"
                        @click="gotoLastpage"></Button>
                </div>
                <div style="margin-left: 6px;">跳转到</div>
                <div style="margin-left: 6px;">
                    <Input v-model="jumpPageNum" style="width: 60px" @on-enter="gotoJump"></Input>
                </div>
                <div style="margin-left: 6px;">
                    <Button type="text" class="self-page-btn" 
                        style="width: 32px;height: 32px;border: 1px solid #dedede;background-color: #fff;"
                        @click="gotoJump">GO</Button>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    created() {
    },
    data() {
        return {
            //每页显示条数
            perPage: 20,
            //当前页数
            currentPage: 1,
            //总条数
            total: 0,
            //总条数
            totalNum: 0,
            //总页数
            totalPage: 1,
            //输入框舔砖
            jumpPageNum: 1,
            //没有条数下拉
            pageList: [20, 40, 60, 80, 100]
        };
    },
    methods: {
        /**
         * 设置分页数据
         * @param {Object} data
         * data:
         * {
         *  perPage
         *  currentPage
         *  totalPage
         *  total
         *  totalNum
         * }
         */
        setPageParam(data) {
            if (this.perPage !== data.perPage) {
                this.perPage = data.perPage;
            }
            this.currentPage = data.currentPage;
            this.totalPage = data.totalPage;
            this.total = data.total;
            this.totalNum = data.totalNum;
            this.jumpPageNum = this.currentPage;
        },
        handleRequest() {
            let _this = this;
            let param = {
                "perPage": _this.perPage,
                "currentPage": _this.currentPage,
                "totalPage": _this.totalPage,
                "totalNum": _this.totalNum
            };
            _this.$emit("on-get-data", param);
        },
        //page按钮变化
        onPageChange(page) {
            if (this.currentPage !== page) {
                this.currentPage = page;
                this.jumpPageNum = page;
                this.handleRequest();
            }
        },
        //每页显示条数变化
        changePerPage() {
            this.handleRequest();
        },
        //回到第一页
        gotoOnepage() {
            this.currentPage = 1;
            this.handleRequest();
        },
        //去到末页
        gotoLastpage() {
            this.currentPage = this.totalPage;
            this.handleRequest();
        },
        //GO按钮跳转
        gotoJump() {
            if (this.jumpPageNum > this.totalPage) {
                this.currentPage = this.totalPage;
                this.jumpPageNum = this.totalPage.toString();
            } else {
                this.currentPage = parseInt(this.jumpPageNum);
            }
            this.handleRequest();
        }
    }
};
</script>

