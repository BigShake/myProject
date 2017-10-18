<style lang="less">
@import "../../styles/difinitions";

.page-div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10px;
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
    // content: "\e62f";
    color: @c-text-font;
}

.self-page .ivu-icon-ios-arrow-right:before {
    // content: "\e630";
    color: @c-text-font;
}

.self-page-btn {
    width: 32px;
    height: 32px;
    border: 1px solid #dedede;
    background-color: #fff;
    margin-right: 6px;
    color: @c-text-font;
}

.default-theme .self-page-btn.ivu-btn.ivu-btn-icon-only {
    width: 32px;
    height: 32px;
    border: 1px solid #dedede;
    background-color: #fff;
    color: @c-text-font;
}

.default-theme .self-page-disabled-btn.ivu-btn.ivu-btn-icon-only {
    width: 32px;
    height: 32px;
    border: 1px solid #dedede;
    background-color: #fff;
    margin-right: 6px;
    color: @c-text-font;
}

.default-theme .ivu-page-item-jump-prev:hover {
    i:after {
        content: "\e667";
        margin-left: -10px;
    }
}

.default-theme .ivu-page-item-jump-next:hover {
    i:after {
        content: "\e841";
        margin-left: -10px;
    }
}

</style>
<template>
    <div>
        <slot></slot>
        <div class="page-div" style="overflow: hidden">
                <div>共有</div>
                <div><p class="red-font">{{counts}}</p></div>
                <div>条，每页</div>
                <div style="padding: 0 6px;height: 100%;">
                    <Select v-model="perPage" class="select-perpage" size="small" style="width:70px;height: 100%;"
                        @on-change="changePerPage">
                        <Option v-for="item in pageList" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                </div>
                <div>条</div>
                <div style="margin-left: 20px;display: flex;justify-content: flex-start;">
                    <Button type="text" icon="arrow-double-left"
                        class="self-page-btn"
                        style="color: #6d768c;"
                        :disabled="pageNow === 1" 
                        @click="gotoOnepage"></Button>
                    <Page :total="counts"
                        :page-size="perPage"
                        :current="pageNow" 
                        class="self-cust-page" 
                        @on-change="onPageChange"></Page>
                    <Button type="text" icon="arrow-double-right"
                        class="self-page-btn"
                        style="color: #6d768c;"
                        :disabled="pageNow === pageTotal"
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
    props: {
        extendParam: {
            default: {}
        }
    },
    created() {
    },
    data() {
        return {
            //每页显示条数
            perPage: 20,
            //当前页数
            pageNow: 1,
            //总条数
            // total: 0,
            //总条数
            counts: 0,
            //总页数
            pageTotal: 1,
            //输入框舔砖
            jumpPageNum: 1,
            //没有条数下拉
            pageList: [20, 40, 60, 80, 100]
        };
    },
    methods: {
        broadcastPageChange() {
            let _this = this;
            _this.$emit("on-request-data", Object.assign({
                pageNow: _this.pageNow,
                perPage: _this.perPage
            }, _this.extendParam), _this.requestCallback);
        },
        requestData() {
            this.broadcastPageChange();
        },
        requestCallback(data) {
            this.perPage = data.perPage;
            this.pageNow = data.pageNow;
            this.counts = data.counts;
        },
        /**
         * 设置分页数据
         * @param {Object} data
         * data:
         * {
         *  perPage
         *  pageNow
         *  pageTotal
         *  total
         *  counts
         * }
         */
        setPageParam(data) {
            if (this.perPage !== data.perPage) {
                this.perPage = data.perPage;
            }
            this.pageNow = data.pageNow;
            this.pageTotal = data.pageTotal;
            // this.total = data.total;
            this.counts = data.counts;
            this.jumpPageNum = this.pageNow;
        },
        //page按钮变化
        onPageChange(page) {
            if (this.pageNow !== page) {
                this.pageNow = page;
                this.jumpPageNum = page;
                this.requestData();
            }
        },
        //每页显示条数变化
        changePerPage() {
            this.requestData();
        },
        //回到第一页
        gotoOnepage() {
            this.pageNow = 1;
            this.requestData();
        },
        //去到末页
        gotoLastpage() {
            this.pageNow = this.pageTotal;
            this.requestData();
        },
        //GO按钮跳转
        gotoJump() {
            if (this.jumpPageNum > this.pageTotal) {
                this.pageNow = this.pageTotal;
                this.jumpPageNum = this.pageTotal.toString();
            } else {
                this.pageNow = parseInt(this.jumpPageNum);
            }
            this.requestData();
        }
    }
};
</script>

