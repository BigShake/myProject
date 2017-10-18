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
    position: absolute;
    left: 300px;
    top: 20px;
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
    display: inline-flex; //justify-content: space-between; 
    .patient-name-container {
        height: 500px;
        overflow: auto;
        z-index: 1;
    } //表格容器
    .content-table-container {
        height: 100%;
        width: 35%;
    }
    .content-mid-container {
        justify-content: space-between;
        height: 100%;
        width: 20%;
    }
}
</style>


<template>
    <div>
        <div class="title-content-block">
            <div>
                <h2>分类绑定</h2>
            </div>
        </div>
        <div style="padding: 25px" class="addBtnDiv">
            <div style="float: right;padding: 0 0 15px 0px;">
                <SearchInput placeholder="搜索" v-on:listen-search-change="changeResultByKeyword" @listen-search-click="searchClick"></SearchInput>
            </div>
        </div>
        <div class="content-container">
            <div class="content-table-container">
                <Table @on-selection-change="selectlist" :height="tableHeight" border :columns="dataColumns" :data="dataList"></Table>
            </div>
            <div class="content-mid-container">
                <div slot="footer" style="text-align:center; position: relative; top: 120px;">
                    <Button type="ghost" icon="two-right" @click="okInModify">&nbsp</Button>
                </div>
                <div slot="footer" style="text-align:center; position: relative; top: 220px;">
                    <Button type="ghost" icon="two-left" @click="cancelInModify">&nbsp</Button>
                </div>
            </div>
            <div style="width: 150px;">
                <div class="ContentOption" :style="{height: this.comHeight + 'px' , overflow: 'auto'}">
                    <div style="width: 150px;border: 1px solid #dddee1;">
                        <div class="show-content div-border">
                            <Menu @on-select="checkdept" :active-name="drugDefultChoose" style="width: 100%;">
                                <Menu-group class="classifyName" title="药品分类">
                                    <MenuItem v-for="(value, index) in classList" :key="index" :name="value.id">
                                    <Row style="line-height: 2.0;">
                                        <Col>{{value.classifyName}}</Col>
                                    </Row>
                                    </MenuItem>
                                </Menu-group>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-table-container">
                <Table @on-selection-change="selectunlist" :height="tableHeight" border :columns="dataColumns2" :data="bindDrugList"></Table>
            </div>
        </div>
    </div>
</template>

<script>
import util from "../../libs/util";
export default {
    data() {
        return {
            bindIdList: [],
            unbindIdList: [],
            drugDefultChoose: "",
            bindDrugParam: {
                idList: [],
                classifyId: null,
                bindingStatus: ""
            },
            getBindDrugParam: {
                perPage: 20,
                currentPage: 1,
                //默认已绑定药品列展示数据为第一个分类下的药品
                classifyId: "",
                content: ""
            },
            calssId: null,
            addpatient: false,
            dataList: [],
            classList: [],
            dataColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '药品编号',
                    key: 'drugCode',
                    align: 'center'
                },
                {
                    title: '通用名',
                    key: 'drugName',
                    align: 'center'
                }
            ],
            bindDrugList: [],
            dataColumns2: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '药品编号',
                    key: 'drugCode',
                    align: 'center'
                    // width: 200
                },
                {
                    title: '通用名',
                    key: 'drugName',
                    align: 'center'
                    // width: 200
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
        selectlist(value) {
            let _this = this;
            _this.bindIdList = [];
            value.forEach(function(element) {
                _this.bindIdList.push(element.id);
            }, this);
        },
        selectunlist(value) {
            let _this = this;
            _this.unbindIdList = [];
            value.forEach(function(element) {
                _this.unbindIdList.push(element.id);
            }, this);
        },
        //点击药品分类
        checkdept(value) {
            this.calssId = value;
            this.bindDrugParam.classifyId = value;
            this.getBindDrugParam.classifyId = value;
            this.searchDrugBinding();
        },
        //获取已绑定药品名称
        searchDrugBinding() {
            let _this = this;
            util.request(global.API_PREFIX + "/drugKnowledge/drugClassifyBinding/searchDrugBinding", _this.getBindDrugParam
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.bindDrugList = response.data.data;
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },

        //获取未绑定药品名称
        searchDrugUnBinding() {
            let _this = this;
            util.request(global.API_PREFIX + "/drugKnowledge/drugClassifyBinding/searchDrugUnBinding", _this.getBindDrugParam
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.dataList = response.data.data;
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },

        //绑定和解绑的方法
        updateBinding() {
            let _this = this;
            util.request(global.API_PREFIX + "/drugKnowledge/drugClassifyBinding/updateBinding", _this.bindDrugParam
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.$Message.info("操作成功");
                    _this.searchDrugBinding();
                    _this.searchDrugUnBinding();
                    _this.bindIdList = [];
                    _this.unbindIdList = [];
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },

        //获取药品分类名称
        getClassList() {
            let _this = this;
            util.request(global.API_PREFIX + "/drugKnowledge/drugClassify/getDrugList"
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.classList = response.data.data.list;
                    _this.drugDefultChoose = response.data.data.list[0].id;
                    // console.log(_this.drugDefultChoose);
                    _this.getBindDrugParam.classifyId = response.data.data.list[0].id;
                    _this.searchDrugBinding();
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },
        //搜索框内容改变事件  
        changeResultByKeyword(value) {
            this.getBindDrugParam.currentPage = 1; //初始化搜索页面到第一页
            this.getBindDrugParam.content = value;
        },

        // 点击搜索框搜索按钮事件
        searchClick() {
            this.getBindDrugParam.currentPage = 1; //初始化搜索页面到第一页
            this.searchDrugBinding();
            this.searchDrugUnBinding();
        },
        //绑定
        okInModify() {
            let _this = this;
            if (_this.bindIdList.length === 0) {
                _this.$Message.error("请选择待绑定药品");
            } else if (_this.bindDrugParam.classifyId === null) {
                _this.$Message.error("请选择药品分类");
            } else {
                _this.bindDrugParam.idList = this.bindIdList;
                _this.bindDrugParam.bindingStatus = "true";
                _this.updateBinding();
            }
        },
        //解绑
        cancelInModify() {
            if (this.unbindIdList.length === 0) {
                this.$Message.error("请选择解绑药品");
            } else if (this.bindDrugParam.classifyId === null) {
                this.$Message.error("请选择药品分类");
            } else {
                this.bindDrugParam.idList = this.unbindIdList;
                this.bindDrugParam.bindingStatus = "false";
                this.updateBinding();
            }
        }


    },
    //初始化调用
    created() {
        // 查询未绑定药品名称/查看未绑定药品/drugClassifyBinding/searchDrugUnBinding
        this.searchDrugUnBinding();
        //获取所有分类名称（不分页处理）/drugClassify/getDrugList
        this.getClassList();
        // 查询已绑定药品名称/查看已绑定药品/drugClassifyBinding/searchDrugBinding
        // this.searchDrugBinding();
    }
};
</script>
