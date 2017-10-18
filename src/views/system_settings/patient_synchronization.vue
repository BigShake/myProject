//病人同步
<style lang="less" scoped>
.step-container {
    display: block;
    margin: 30px auto;
    width: 60%;
}

.step-content-panel {
    width: 400px;
    display: block;
    margin: 0 auto;
}

.header-style {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-bottom: 4px solid #dedede;
}

.header-img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    border: 1px solid #dedede;
}

.header-right-style {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.flex-line-canter {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.ivu-input {
    display: inline-block;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out, background .2s ease-in-out, box-shadow .2s ease-in-out;
    border-radius: 50px;
}

.content-container {
    height: 100%;
    width: 100%;
    display: inline-flex;
    justify-content: space-between; //表格容器
    .content-table-container {
        height: 100%;
        width: 15%;
    } //选项卡容器
    .content-main-container {
        height: 100%;
        width: 85%;
    }
}
</style>


<template>
    <div>
        <div class="title-content-block">
            <div>
                <h2>病人同步</h2>
            </div>
        </div>
        <div style="padding: 20px 0 15px 0">
            <Button @click="syncBtnClick()">同步病人</Button>
            <div style="float: right;">
                <SearchInput placeholder="搜索" v-on:listen-search-change="changeResultByKeyword" @listen-search-click="searchClick"></SearchInput>
            </div>
        </div>
        <div class="content-container">
            <div class="ContentOption" :style="{height: this.comHeight + 'px' , overflow: 'auto'}">
                <div style="width: 200px;border: 1px solid #dddee1;overflow-y: auto;">
                    <div class="show-content div-border">
                        <Menu :active-name="activeName" @on-select="checkdept" style="width: 100%;">
                            <Menu-group class="patient" title="病区">
                                <Menu-item v-for="(value, index) in deptList" :key="index" :name="value.deptName">
                                    <Row style="line-height: 2.0;">
                                        <Col>{{value.deptName}}</Col>
                                    </Row>
                                </Menu-item>
                            </Menu-group>
                        </Menu>
                    </div>
                </div>
            </div>
            <div class="content-main-container">
                <Pager style="padding-top:0px;" ref="initPager" v-on:on-get-data="changePage">
                    <Table :height="tableHeight" border :columns="dataColumns2" :data="dataList2"></Table>
                </Pager>
            </div>
        </div>
    </div>
</template>

<script>
import util from "../../libs/util";
export default {
    data() {
        return {
            param: {
                perPage: 20,
                currentPage: 1,
                content: ""
            },
            addpatient: false,
            deptList: [],
            activeName: "",
            dataList2: [],
            dataColumns2: [
                {
                    title: '病人住院号',
                    key: 'inhospNo',
                    align: 'center'
                },
                {
                    title: '病人姓名',
                    key: 'patName',
                    align: 'center'
                }
            ]
        };
    },
    computed: {
        tableHeight() {
            return util.getHeight();
        },
        comHeight() {
            return window.innerHeight - 60 - 160;
        }
    },

    //定义方法
    methods: {
        //搜索

        //获取病区列表 接口
        getDeptList(param) {
            let _this = this;
            util.request(global.API_PREFIX + "/drugKnowledge/deptSync/getList", _this.param
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.deptList = response.data.data.list;
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },


        //获取病人列表 接口
        getPatientList(param) {
            let _this = this;
            util.request(global.API_PREFIX + "/drugKnowledge/patient/getList", _this.param
            ).then(function(response) {
                if (response.data.code === 1) {
                    //处理数据
                    _this.dataList2 = response.data.data.list;
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

        //点击搜索框搜索按钮事件
        searchClick() {
            this.param.currentPage = 1; //初始化搜索页面到第一页
            this.getPatientList();
        },
        changeResultByKeyword(value) {
            this.param.currentPage = 1; //初始化搜索页面到第一页
            this.param.content = value;
        },

        syncBtnClick() {
            var config = {
                title: "同步病人",
                content: "从HIS中同步病人",
                onOk: this.addok
            };
            this.$Modal.confirm(config);
        },
        addok() {
            let _this = this;
            util.request(global.API_PREFIX + "/drugKnowledge/patient/synchronization"//病人同步接口
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.$Message.info("同步成功");
                    _this.getPatientList();
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },
        cancel() {
            this.$Message.info('点击了取消');
        },

        changePage(data) {
            this.param.currentPage = data.currentPage;
            this.param.perPage = data.perPage;
            this.getPatientList();
        },
        //点击病区
        checkdept() {

        }
    },

    //初始化调用
    created() {
        this.getDeptList();
        this.getPatientList();
    }
};
</script>
