<style lang="less">
@import "../../styles/difinitions";

    .addincompatibility {

        //步骤条容器
        .header-step-container {
            display: flex;
            justify-content: center;
            align-items: center;
            
            .ivu-steps.ivu-steps-horizontal {
                width: 60%;

                .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner {
                    background-color: @c-main;
                        border-color: @c-main; 
                }
            }
        }
        .ivu-table-header .ivu-checkbox-wrapper {
            display: none;
        }
       
    }
</style>

<template>
<div class="addincompatibility">
    <div class="title-content-block">
        <div>
            <h2>配伍禁忌</h2>
        </div>
    </div>
    <div class="header-step-container" style="padding: 30px">
        <Steps :current="current">
            <Step title="新增"></Step>
            <Step title="选择药品/成分"></Step>
            <Step title="选择药品/成分"></Step>
        </Steps>
    </div>
    <div v-if="current === 0">
        <div style="text-align:center; padding: 10px 0;">
            <div style="padding: 10px;">
                <p>配伍类型</p>
                <Select v-model="formParam.errorType" style="width:300px" placeholder="配伍类型">
                    <Option v-for="item in typeList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                </Select>
            </div>
            <div style="padding: 10px;">
                <p>配伍结果</p>
                <Select v-model="formParam.errorId" style="width:300px" placeholder="配伍结果">
                    <Option v-for="item in errorList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                </Select>
            </div>
            <div style="padding: 10px;">
                <p>说明</p>
                <Input v-model="formParam.explain" style="width:300px" :value="formParam.explain"></Input>
            </div>

             <div style="padding: 10px;">
             <Button style="width: 100px" type="primary" @click="next">下一步</Button> 
             <Button style="width: 100px" type="primary" @click="last()">取消</Button>
             </div>
        </div>
    </div>
    <!--选择药品界面 -->
    <div v-if="((current === 1) && (formParam.errorType === 1)) || ((formParam.errorType === 0) && (current !== 0))">
        <div style="text-align:right;padding: 30px;">
                <SearchInput placeholder="搜索" 
                        v-on:listen-search-change="changeContentByKeyword"
                        v-on:listen-search-click="searchContentByKeyword"></SearchInput>
            <div class="content-container">
                <div class="content-table-container">
                    <Pager style="padding: 10px 0;" ref="initPager" v-on:on-get-data="changePage">
                        <Table :columns="drugColumns" :data="drugList" :stripe="true" :border="true" @on-selection-change="changDrugOption"></Table>
                    </Pager>
                </div>
                 <div style="text-align:center;">
                    <Button style="width: 100px" type="primary" @click="last()">上一步</Button>
                    <Button v-if="current === 1" style="width: 100px" type="primary" @click="next()">下一步</Button>
                    <Button v-if="current === 2" style="width: 100px" type="primary" @click="over()">完成</Button> 
                </div>
            </div>
            <div>
            </div>
        </div>
    </div>
     <!--选择药品成分 -->
    <div v-if="((current === 2) && (formParam.errorType === 1)) || ((formParam.errorType === 2) && (current !== 0))">
        <div style="text-align:right; padding: 30px;">
            <div class="header-right">
                <SearchInput placeholder="搜索" 
                        v-on:listen-search-change="changeContentByKeyword"
                        v-on:listen-search-click="searchContentByKeyword"></SearchInput>
            </div>
            <div class="content-container">
                <div class="content-table-container">
                    <Pager style="padding: 10px 0;" ref="initPager" v-on:on-get-data="changePage">
                        <Table :columns="compColumns" :data="compList" :stripe="true" :border="true" @on-selection-change="changCompOption"></Table>
                    </Pager>
                </div>
                <div style="text-align:center;">
                    <Button style="width: 100px" type="primary" @click="last()">上一步</Button>
                    <Button v-if="current === 1" style="width: 100px" type="primary" @click="next()">下一步</Button>
                    <Button v-if="current === 2" style="width: 100px" type="primary" @click="over()">完成</Button> 
                </div>
            </div>
            <div>
            </div>
        </div>
    </div>

</div>
</template>
<script>
import util from "../../libs/util";
export default {
    data () {
        return {
            formParam: {

                errorId: null,
                errorType: null,
                explain: "",
                subId: "",
                mainId: ""
            },
            getDrugOrCompParam: {
                perPage: 20,
                currentPage: 1,
                content: ""
            },
            current: 0,
            typeList: [
                {
                    value: 0,
                    label: '药品对药品'
                },
                {
                    value: 1,
                    label: '药品对成分'
                },
                {
                    value: 2,
                    label: '成分对成分'
                }
            ],
            errorList: [],
            drugColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '编号',
                    key: 'drugCode',
                    //width: 100,
                    align: 'left'
                },
                {
                    title: '药品分类',
                    key: 'classifyName',
                    //width: 100,
                    align: 'left'
                },
                {
                    title: '通用名',
                    key: 'drugName',
                    // width: 139,
                    align: 'tradeName'
                }
            ],
            drugList: [],
            compColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '成分',
                    key: 'ingredientsName',
                    //width: 100,
                    align: 'ingredientsName'
                }
            ],
            compList: []
        };
    },
    methods: {
        //改变药品列表搜索框事件
        changeContentByKeyword(value) {
            this.getDrugOrCompParam.content = value;
        },
        searchContentByKeyword() {
            this.getDrugOrCompParam.currentPage = 1; //初始化搜索页面到第一页
            this.getDataList(); //获取药品列表
        },
        changePage(data) {
            this.getDrugOrCompParam.currentPage = data.currentPage; //获取当前页数
            this.getDrugOrCompParam.perPage = data.perPage; //获取每页条数
            this.getDataList(); //获取药品列表
        },
        getDataList() {
            if (((this.current === 1) && (this.formParam.errorType === 1)) || (this.formParam.errorType === 0)) {
                this.getDrugList();
            } else if (((this.current === 2) && (this.formParam.errorType === 1)) || (this.formParam.errorType === 2)) {
                this.getcompList();
            }
        },

        //下一步
        next () {
            if ((this.formParam.errorId === null) || (this.formParam.errorType === null)) {
                this.$Message.error("请选择配伍类型和配伍结果");
            } else if ((this.current === 1) && (this.formParam.mainId === null)) {
                this.$Message.error("请选择药品or成分");
            } else {
                this.current = this.current + 1;
                this.changeStep();
            }
        },
        changCompOption(value) {
            let newData = [];
            let _this = this;
            let newValue = [];
            let id = null;
            if (this.current === 1) {
                id = _this.formParam.mainId; 
            } else if (this.current === 2) {
                id = _this.formParam.subId;
            }
            if (id === null) {
                value.forEach(function(element) {
                    newValue.push(element);
                });

            } else {
                value.forEach(function(element) {
                    if (element.id !== id) {
                        newValue.push(element);
                    }
                });
            }
                
            if (newValue.length > 0) {
                id = newValue[0].id;
            } else if (value.length === 0) {
                id = null;
            }
            _this.compList.forEach(function(element, index) {
                newData.push(element);
                if (newValue.length > 0) {
                    if (element.id === id) {
                        element._checked = true;
                        newData[index]._check = true;
                    } else {
                        element._checked = false;
                        newData[index]._check = false;
                        
                    }
                } else {
                    element._checked = false;
                    newData[index]._check = false;
                }          
            });
            _this.compList = newData;
            if (this.current === 1) {
                _this.formParam.mainId = id; 
            } else if (this.current === 2) {
                _this.formParam.subId = id;
            }

        },
        changDrugOption(value) {
            let newData = [];
            let _this = this;
            let newValue = [];
            let drugCode = "";
            if (this.current === 1) {
                drugCode = _this.formParam.mainId; 
            } else if (this.current === 2) {
                drugCode = _this.formParam.subId;
            }
            if (drugCode + "" === "") {
                value.forEach(function(element) {
                    newValue.push(element);
                });

            } else {
                value.forEach(function(element) {
                    if (element.drugCode !== drugCode) {
                        newValue.push(element);
                    }
                });
            }
                
            if (newValue.length > 0) {
                drugCode = newValue[0].drugCode;
            } else if (value.length === 0) {
                drugCode = null;
            }
            _this.drugList.forEach(function(element, index) {
                newData.push(element);
                if (newValue.length > 0) {
                    if (element.drugCode === drugCode) {
                        element._checked = true;
                        newData[index]._check = true;
                    } else {
                        element._checked = false;
                        newData[index]._check = false;
                        
                    }
                } else {
                    element._checked = false;
                    newData[index]._check = false;
                }          
            });
            _this.drugList = newData;
            if (this.current === 1) {
                _this.formParam.mainId = drugCode; 
            } else if (this.current === 2) {
                _this.formParam.subId = drugCode;
            }
        },

        changeStep() {
            if (this.current === 0) {
                this.formParam.errorId = null;
                this.formParam.errorType = null;
            }
            this.getDrugOrCompParam = {
                perPage: 20,
                currentPage: 1,
                content: ""
            };
            this.getDataList();

        },
        //上一步
        last () {
            if (this.current === 0) {
                this.$router.push("/incompatibility");
            } else {
                this.current -= 1;
                this.changeStep();
            }
        },
        //完成
        over () {
            if ((this.current === 2) && (this.formParam.subId === null)) {
                this.$Message.error("请选择药品or成分");
            } else {
                this.$router.push("/incompatibility");
                this.$Message.info("新增成功");
            }
        },

        //获取配伍结果列表
        getErrorList() {
            let _this = this;
            util.request(global.API_PREFIX + "/errorType/getErrorType", {}
            ).then(function(response) {
                if (response.data.code === 1) {
                    //处理数据
                    _this.errorList = [];
                    response.data.data.forEach(function (el) {
                        _this.errorList.push({
                            value: el.id,
                            label: el.errorName
                        });
                    });
                } else {
                    _this.$Message.error(response.data.mess);
                }
               
            });
        },

        //获取药品列表
        getDrugList () {
            let _this = this;
            util.request(global.API_PREFIX + "/incompatibility/getDrugList", 
                _this.getDrugOrCompParam
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.drugList = response.data.data.list;
                    _this.drugList.forEach(function(element) {
                        element._checked = false;
                    });
                    if (_this.current === 1) {
                        _this.formParam.mainId = null; 
                    } else if (_this.current === 2) {
                        _this.formParam.subId = null;
                    }
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

        //获取成分列表
        getcompList () {
            let _this = this;
            util.request(global.API_PREFIX + "/incompatibility/getCompList", 
                _this.getDrugOrCompParam
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.compList = response.data.data.list;
                    _this.compList.forEach(function(element) {
                        element._checked = false;
                    });
                    let pageData = {  
                        "currentPage": response.data.data.currentPage,
                        "perPage": response.data.data.perPage,
                        "total": response.data.data.totalNum,
                        "totalNum": response.data.data.totalNum
                    };
                    if (_this.current === 1) {
                        _this.formParam.mainId = null; 
                    } else if (_this.current === 2) {
                        _this.formParam.subId = null;
                    }
                    _this.$refs.initPager.setPageParam(pageData);
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        }
    },
    created () {
        this.getErrorList();
    }
};
</script>
