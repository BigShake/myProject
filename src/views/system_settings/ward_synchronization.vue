/*病区同步页面*/
<style scoped lang="less">
// 页面样式 css less
</style>



<template>
    <div>
        <div class="title-content-block">
            <div>
                <h1 style="font-size:15px;">同步病区</h1>
            </div>
        </div>
        <div>
            <div style="padding: 20px 0 5px 0">
                <Button @click="syncBtnClick()">同步病区</Button>
                <div style="float: right;">
                    <SearchInput placeholder="搜索" v-on:listen-search-change="changeResultByKeyword" v-on:listen-search-click="searchResultByKeyword"></SearchInput>
                </div>
            </div>
            <div>
                <Pager style="padding-top:10px;" ref="initPager" v-on:on-get-data="changePage">
                    <Table :height="tableHeight" border :columns="deptColumns" :data="deptData"></Table>
                </Pager>
            </div>
        </div>
        <Spin size="large" fix v-if="spinShow">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </div>
</template>


<script>
import util from "../../libs/util";
export default {
    data() {
        return {
            spinShow: false,
            param: {
                perPage: 20,
                currentPage: 1
            },
            deptColumns: [
                {
                    title: '病区编号',
                    align: 'center',
                    width: '10%',
                    key: 'deptCode'
                },
                {
                    title: '病区名称',
                    align: 'center',
                    key: 'deptName'
                },
                {
                    title: '病区别名',
                    align: 'center',
                    width: '25%',
                    key: 'deptAliasName'
                }
            ],
            deptData: [
            ],
            modelConfig: {
                title: "同步病区",
                content: "从HIS中同步病区",
                onOk: this.syncDept
            }
        };
    },
    created() {
        this.getDataList();
    },
    computed: {
        tableHeight() {
            return util.getHeight();
        }
    },
    methods: {
        //点击搜索框搜索按钮事件
        searchResultByKeyword() {
            this.param.currentPage = 1;
            this.getDataList();
        },
        //搜索框内容改变事件
        changeResultByKeyword(value) {
            this.param.content = value;
        },
        //获取数据列表
        getDataList() {
            let _this = this;
            util.request(global.API_PREFIX + "/deptSync/getList",
                _this.param
            ).then(function(response) {
                if (response.data.code === 1) {
                    //处理数据
                    _this.deptData = response.data.data.list;
                    let pageData = {
                        "currentPage": response.data.data.currentPage,
                        "perPage": response.data.data.perPage,
                        "total": response.data.data.totalNum,
                        "totalNum": response.data.data.totalNum
                    };
                    _this.$refs.initPager.setPageParam(pageData);
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },
        //点击同步按钮事件
        syncBtnClick() {
            this.$Modal.confirm(this.modelConfig);//调用模态框
        },
        //同步药品
        syncDept() {
            let _this = this;
            _this.spinShow = true;
            util.request(global.API_PREFIX + "/deptSync/synchronization"
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.$Message.info("同步成功");
                    _this.param.currentPage = 1;
                    _this.getDataList();
                    _this.spinShow = false;
                } else {
                    _this.$Message.error(response.data.mess);
                    _this.spinShow = false;
                }
            });
        },
        changePage(data) {
            this.param.currentPage = data.currentPage;
            this.param.perPage = data.perPage;
            this.getDataList();
        }

    }
};
</script>

