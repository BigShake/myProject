<style lang="less">
@import "../../../styles/difinitions";
@import "../../../styles/common";

    .TableOne {
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
                        min-width: 50px;
                        width: 50px;
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
                    .select-width (@width: 80px) {
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
  
    //模态框
    .select-modal { 
        .modal-content-header {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
        }
    }
</style>

<template>
    <div class="TableOne">
        <div class="header switch-container" v-if="isEdit">
            <i-switch v-model="switchStatus"></i-switch>
        </div>
        <div class="table-container" v-if="isEdit">
            <Row class-name="table-row table-header" align="middle" justify="center">
                <Col class-name="table-col" span="4">
                    用法
                </Col>
                <Col class-name="table-col" span="4">
                    使用时间下限
                </Col>
                <Col class-name="table-col" span="4">
                    使用时间上限
                </Col>
                <Col class-name="table-col" span="3">
                    滴速
                </Col>
                <Col class-name="table-col" span="3">
                    滴速单位
                </Col>
                <Col class-name="table-col" span="4">
                    错误类型
                </Col>
                <Col class-name="table-col" span="2">
                    
                </Col>
            </Row>
            <Row class-name="table-row" align="middle" justify="center" v-for="(item, index) in list" :key="item.usagecode">
                <Col class-name="table-col" span="4">
                    {{ item.usageName }}
                </Col>
                <Col class-name="table-col" span="4">
                    {{ item.timeLower }}
                </Col>
                <Col class-name="table-col" span="4">
                    {{ item.timeUpper }}
                </Col>
                <Col class-name="table-col" span="3">
                    {{ item.speed }}
                </Col>
                <Col class-name="table-col" span="3">
                    {{ item.unit }}
                </Col>
                <Col class-name="table-col" span="4">
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
                <Col class-name="table-col" span="4">
                    <Button class="select-usage" v-if="showSelectedUsage.name === ''" @click="selectUsage" title="点击选择用法"> 选择用法 </Button>
                    <!-- <div class="center clickable select-usage" @click="selectUsage" v-if="showSelectedUsage.name === ''"> 选择用法 </div> -->
                    <div class="center clickable selected-usage" @click="selectUsage" v-else> {{ showSelectedUsage.name }} </div>
                </Col>
                <Col class-name="table-col" span="4">
                    <Input v-model="timeLowerModel" placeholder="下限" :maxlength="6" :number="true" title="使用时间下限"></Input>
                </Col>
                <Col class-name="table-col" span="4">
                    <Input v-model="timeUpperModel" placeholder="上限" :maxlength="6" :number="true" title="使用时间上限"></Input>
                </Col>
                <Col class-name="table-col" span="3">
                    <Input v-model="speedModel" placeholder="滴速" :maxlength="6" :number="true" title="滴速"></Input>
                </Col>
                <Col class-name="table-col" span="3">
                    <Input v-model="unitModel" placeholder="单位" :maxlength="6" :number="true" title="滴速单位"></Input>
                </Col>
                <Col class-name="table-col" span="4">
                    <Select
                        title="错误类型"
                        v-model="errorTypeModel" 
                        @on-change="errorTypeChange" 
                        placeholder="类型" 
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
        <Modal
            v-model="selectUsageModal"
            title="选择用法"
            :scrollable="true"
            :closable="false"
            :mask-closable="false"
            :width="768"
            class-name="select-modal"
            @on-ok="submitSelect"
            @on-cancel="cancelSelect">
            <div class="modal-content-header">
                <SearchInput placeholder="输入药品或成份" @listen-search-click="searchClick"></SearchInput>
            </div>
            <Table :height="modalTableHeight" :data="usageDataList" :columns="usageColumns" :stripe="true" :highlight-row="true" @on-current-change="usageSelectChange"></Table>
            <div class="footer-show-container" slot="footer">
                <span>当前选择用法:</span>
                <strong> {{ showCurrentUsage }} </strong>
                <Button @click="submitSelect">确定</Button>
                <Button type="dashed" @click="cancelSelect">取消</Button>
            </div>
        </Modal>
        <div class="table-container" v-if="(!isEdit && switchStatus)">
            <Row class-name="table-row table-header" align="middle" justify="center">
                <Col class-name="table-col" span="4">
                    用法
                </Col>
                <Col class-name="table-col" span="4">
                    使用时间下限
                </Col>
                <Col class-name="table-col" span="4">
                    使用时间上限
                </Col>
                <Col class-name="table-col" span="4">
                    滴速
                </Col>
                <Col class-name="table-col" span="4">
                    滴速单位
                </Col>
                <Col class-name="table-col" span="4">
                    错误类型
                </Col>
            </Row>
            <Row class-name="table-row" align="middle" justify="center" v-for="(item, index) in list" :key="item.usagecode">
                <Col class-name="table-col" span="4">
                    {{ item.usageName }}
                </Col>
                <Col class-name="table-col" span="4">
                    {{ item.timeLower }}
                </Col>
                <Col class-name="table-col" span="4">
                    {{ item.timeUpper }}
                </Col>
                <Col class-name="table-col" span="4">
                    {{ item.speed }}
                </Col>
                <Col class-name="table-col" span="4">
                    {{ item.unit }}
                </Col>
                <Col class-name="table-col" span="4">
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
            timeUpperModel: null,
            timeLowerModel: null,
            //滴速
            speedModel: null,
            //滴速单位
            unitModel: '',
            //错误类型
            errorTypeModel: null, //id
            errorName: '', //(展示)
            errorTypeList: [],

            list: [],
            //是否可继续添加
            ableAdd: true,
            //已选用法(展示)
            showSelectedUsage: {
                name: '',
                code: ''
            },
            //模态框
            selectUsageModal: false,
            usageDataList: [],
            usageColumns: [
                {
                    title: '编号',
                    align: 'center',
                    key: 'id'
                },
                {
                    title: '用法编号',
                    align: 'center',
                    key: 'code'
                },
                {
                    title: '用法名称',
                    align: 'center',
                    key: 'name'
                }
            ],
            //当前已选用法
            currentSelectedUsage: {}
        };
    },
    computed: {
        showCurrentUsage () {
            return this.currentSelectedUsage.name === undefined ? '暂无' : this.currentSelectedUsage.name;
        },
        state () {
            return this.switchStatus === true ? 1 : 0;
        },
        modalTableHeight () {
            let h = window.innerHeight;
            return h - 300;
        }
    },
    methods: {
        //添加
        addItem () {
            //重置填写项
            this.showSelectedUsage.name = '';
            this.showSelectedUsage.code = '';
            this.timeLowerModel = null;
            this.timeUpperModel = null;
            this.speedModel = null;
            this.unitModel = '';
            this.errorTypeModel = null;
            this.errorName = '',
            
            this.ableAdd = false;
        },
        //确认添加
        confirmAddItem () {
            let obj = {
                state: this.state,
                usagecode: this.showSelectedUsage.code,
                usageName: this.showSelectedUsage.name,
                timeLower: this.timeLowerModel,
                timeUpper: this.timeUpperModel,
                speed: this.speedModel,
                unit: this.unitModel,
                errorId: this.errorTypeModel,
                errorName: this.errorName
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
        },

        //获取[选择用法] 接口
        getDataList() {
            let _this = this; 
            util.request(global.API_PREFIX + "/useageSync/getList"
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.usageDataList = response.data.data.list;
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },
        //点击[选择用法] 打开模态框
        selectUsage () {
            this.selectUsageModal = true;
            this.getDataList();
            
        },
        //提交[选择用法]
        submitSelect () {
            //当前选择赋给已选择
            this.showSelectedUsage = this.currentSelectedUsage;
            //关闭模态框
            this.selectUsageModal = false;
        },
        //关闭[选择用法]
        cancelSelect () {
            //清除当前选择
            this.currentSelectedUsage = {};
            //关闭模态框
            this.selectUsageModal = false;
        },
        //[选择用法]改变时
        usageSelectChange (currentRow) {
            //获取当前选择
            this.currentSelectedUsage = currentRow;
        },
        //获取搜索关键字
        searchClick (value) {

        }

    },
    created () {
        //初始化数据
        this.getErrorType();
    }
};
</script>
