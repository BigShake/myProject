<style lang="less">
@import "../../../styles/difinitions";
@import "../../../styles/common";

    .TableFour {
        margin-bottom: 10px;

        .switch-container {
            display: flex;
            justify-content: flex-end;
            min-height: 25px;
            margin-bottom: 5px;

            .ivu-switch-checked {
                border-color: @c-main;
                background-color: @c-main;
            }
        }
        
        //表格
        .table-container {
            
            .table-row:not(:last-child) {
                min-height: 30px;
                border-left: 1px solid @input-border;
                border-right: 1px solid @input-border;
                border-top: 1px solid @input-border;
            }
            .table-row:last-child {
                min-height: 30px;
                border: 1px solid @input-border;
            }
        
            .table-header {
                background-color: #ebf5f4;
                color: #96dcd2;
                font-weight: 700 ;
            }
        
            .table-col {
                display: flex;
                justify-content: center;
                align-items: center;
                // background-color: #fff;
                min-height: 30px;
            }

            //添加按钮
            .add-btn {
                // margin-top: 10px;
                margin-bottom: 10px;
                width: 100%;
                height: 30px;
            }

            .ivu-btn.ivu-btn-icon-only {
                min-height: 30px;
                width: 100%;
            }

            

            //添加
            .add-row-container {
                //混合-按钮
                .btn-style (@width: 45px) {
                    padding: 6px 5px;
                    min-width: @width;
                    width: @width;
                }

                //选择用法 (未选)
                .select-usage.ivu-btn {
                    .btn-style(80px);
                }
                //选择用法 (已选)
                .selected-usage {
                    min-height: 30px;
                    min-width: 80px;
                    border: 1px solid @input-border;
                    border-radius: 3px;
                }

                //输入框
                .ivu-input-wrapper.ivu-input-type {
                    .center();
                    .ivu-input {
                        padding-left: 2px;
                        padding-right: 2px;
                        min-width: 70px;
                        width: 70px;
                    }

                    //混合-input placeholder样式
                    .input-placeholder-style () {
                        text-align: center;
                    }
                    /* 使用webkit内核的浏览器 */
                    input::-webkit-input-placeholder {
                        .input-placeholder-style();
                    }    
                    /* Firefox版本4-18 */
                    input:-moz-placeholder {
                        .input-placeholder-style();
                    }                  
                    /* Firefox版本19+ */
                    input::-moz-placeholder {
                        .input-placeholder-style();
                    }                  
                    /* IE浏览器 */
                    input:-ms-input-placeholder {
                        .input-placeholder-style();
                    }           
                }
                //下拉选择框
                .ivu-select {
                    //混合-选择框宽度
                    .select-width (@width: 120px) {
                        min-width: @width;
                        width: @width;
                    }

                    .select-width();
                    .center();

                    .ivu-select-selection {
                        .select-width();
                        border-color: @input-border;

                        &.hover {
                            border-color: @input-border;
                        }
                    }
                    .ivu-select-dropdown {
                        .select-width();

                        .ivu-select-dropdown-list {
                            .select-width();

                            .ivu-select-item-selected {
                                background-color: @c-main;
                                &.hover {
                                    border-color: @input-border;
                                }
                            }
                        }
                    }
                }
                
                //确认按钮
                .confirm-btn.ivu-btn {
                    .btn-style();
                }
            }

            .center {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        
    }
</style>

<template>
    <div class="TableFour">
        <div class="header switch-container" v-if="isEdit">
            <i-switch v-model="switchStatus"></i-switch>
        </div>
        <div class="table-container" v-if="isEdit">
            <Row class-name="table-row table-header" align="middle" justify="center">
                <Col class-name="table-col" span="11">
                    不符合人群
                </Col>
                <Col class-name="table-col" span="11">
                    错误类型
                </Col>
                <Col class-name="table-col" span="2">
                    
                </Col>
            </Row>
            <Row class-name="table-row" align="middle" justify="center" v-for="(item, index) in list" :key="item.usagecode">
               <Col class-name="table-col" span="11">
                    {{ item.crowdName }}
                </Col>
                <Col class-name="table-col" span="11">
                    {{ item.errorName }}
                </Col>
                <Col class-name="table-col" span="2">
                    <div class="clickable" title="删除该条数据" @click="deleteItem">
                        <Icon type="delete"></Icon>
                    </div>
                </Col>
            </Row>
            <div>
                <Button class="add-btn" icon="add" type="info" @click="addItem"> </Button>
            </div>

            <Row class-name="add-row-container" align="middle" justify="center" v-show="!ableAdd">
                <Col class-name="table-col" span="11">
                    <Select
                        title="不符合人群"
                        v-model="crowdModel" 
                        @on-change="crowdChange" 
                        placeholder="不符合人群" 
                        :clearable="true">
                        <Option 
                            v-for="crowdItem in crowdList" 
                            :value="crowdItem.value" 
                            :key="crowdItem.value">
                            {{ crowdItem.label }}
                        </Option>
                    </Select>
                </Col>
                <Col class-name="table-col" span="11">
                   <Select
                        title="错误类型"
                        v-model="errorTypeModel" 
                        @on-change="errorTypeChange" 
                        placeholder="错误类型" 
                        :clearable="true">
                        <Option 
                            v-for="errorTypeItem in errorTypeList" 
                            :value="errorTypeItem.value" 
                            :key="errorTypeItem.value">
                            {{ errorTypeItem.label }}
                        </Option>
                    </Select>
                </Col>
                <Col class-name="table-col" span="2">
                    <Button class="confirm-btn" @click="confirmAddItem" title="确认添加">确认</Button>
                </Col>
            </Row>
        </div>

        <div class="table-container" v-if="(!isEdit && switchStatus)">
            <Row class-name="table-row table-header" align="middle" justify="center">
               <Col class-name="table-col" span="12">
                    不符合人群
                </Col>
                <Col class-name="table-col" span="12">
                    错误类型
                </Col>
            </Row>
            <Row class-name="table-row" align="middle" justify="center" v-for="(item, index) in list" :key="item.usagecode">
                <Col class-name="table-col" span="12">
                    {{ item.crowdName }}
                </Col>
                <Col class-name="table-col" span="12">
                    {{ item.errorName }}
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import util from "../../../libs/util";
export default {
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            switchStatus: true,
            //不符合人群
            crowdModel: null, //id
            crowdName: null, //(展示)
            crowdList: [],
            
            //错误类型
            errorTypeModel: null, //id
            errorName: null, //(展示)
            errorTypeList: [],

            list: [],
            //是否可继续添加
            ableAdd: true
        };
    },
    computed: {
        state () {
            return this.switchStatus === true ? 1 : 0;
        }
    },
    methods: {
        //添加
        addItem () {
            //重置填写项
            this.crowdModel = null;
            this.crowdName = null;
            this.errorTypeModel = null;
            this.errorName = null;
            
            this.ableAdd = false;
        },
        //确认添加
        confirmAddItem () {
            let obj = {
                state: this.state,
                crowd: this.crowdModel,
                crowdName: this.crowdName, //展示
                errorId: this.errorTypeModel,
                errorName: this.errorName //展示
            };
            //检查必填项
            let canSubmit = false;
            for (let prop in obj) {
                let value = obj[prop];
                if (value === null || value === '' || value === undefined) {
                    canSubmit = false;
                    this.$Message.error('请完整填写数据!');
                    break;
                } else {
                    canSubmit = true;
                }
            }
            if (canSubmit) {
                this.list.push(obj);
                this.ableAdd = true;
            }
        },
        //删除项
        deleteItem (event, name) {
            const index = this.list.indexOf(name);
            this.list.splice(index, 1);
        },

        //获取[不符合人群] 接口
        getList () {
            let _this = this;
            util.request(global.API_PREFIX + "/crowdKind/getList"
            ).then(function(response) {
                if (response.data.code === 1) {
                    response.data.data.forEach(function (el) {
                        _this.crowdList.push({
                            value: el.id,
                            label: el.crowdname
                        });
                    });
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },

        //[不符合人群]改变时
        crowdChange (value) {
            let _this = this;
            _this.crowdList.forEach(function (el) {
                if (el.value === value) {
                    _this.crowdName = el.label;
                }
            });
        },

        //获取[错误类型] 接口
        getErrorType () {
            let _this = this;
            util.request(global.API_PREFIX + "/errorType/getErrorType"
            ).then(function(response) {
                if (response.data.code === 1) {
                    response.data.data.forEach(function (el) {
                        _this.errorTypeList.push({
                            value: el.id,
                            label: el.errorName
                        });
                    });
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },

        //[错误类型]改变时
        errorTypeChange (value) {
            let _this = this;
            _this.errorTypeList.forEach(function (el) {
                if (el.value === value) {
                    _this.errorName = el.label;
                }
            });
        }

    },
    created () {
        //初始化数据
        this.getList();
        this.getErrorType();
    }
};
</script>
