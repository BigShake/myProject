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

                //选择溶媒 (未选)
                .select-menstruum.ivu-btn {
                    .btn-style(80px);
                }
                //选择溶媒 (已选)
                .selected-menstruum {
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
                    .select-width (@width: 110px) {
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
    <div class="TableFour">
        <div class="header switch-container" v-if="isEdit">
            <i-switch v-model="switchStatus"></i-switch>
        </div>
        <div class="table-container" v-if="isEdit">
            <Row class-name="table-row table-header" align="middle" justify="center">
                <Col class-name="table-col" span="5">
                    溶媒
                </Col>
                <Col class-name="table-col" span="5">
                    溶媒规格
                </Col>
                <Col class-name="table-col" span="4">
                    溶媒量下限
                </Col>
                <Col class-name="table-col" span="4">
                    溶媒量上限
                </Col>
                <Col class-name="table-col" span="4">
                    错误类型
                </Col>
                <Col class-name="table-col" span="2">
                    
                </Col>
            </Row>
            <Row class-name="table-row" align="middle" justify="center" v-for="(item, index) in list" :key="item.menstruumCode">
                <Col class-name="table-col" span="5">
                    {{ item.menstruumName }}
                </Col>
                <Col class-name="table-col" span="5">
                    {{ item.standanrd }}
                </Col>
                <Col class-name="table-col" span="4">
                    {{ item.valueLower }}
                </Col>
                <Col class-name="table-col" span="4">
                    {{ item.valueUpper }}
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
                <Col class-name="table-col" span="5">
                    <Button class="select-menstruum" v-if="showSelectedMenstruum.name === null" @click="selectMenstruum" title="点击选择溶媒"> 选择溶媒 </Button>
                    <div class="center clickable selected-menstruum" @click="selectMenstruum" v-else> {{ showSelectedMenstruum.name }} </div>
                </Col>
                <Col class-name="table-col" span="5">
                    <Input v-model="standanrdModel" placeholder="溶媒规格" :maxlength="6" title="溶媒规格"></Input>
                </Col>
                <Col class-name="table-col" span="4">
                    <Input v-model="valueLowerModel" placeholder="溶媒量下限" :maxlength="6" :number="true" title="溶媒量下限"></Input>
                </Col>
                <Col class-name="table-col" span="4">
                    <Input v-model="valueUpperModel" placeholder="溶媒量上限" :maxlength="6" :number="true" title="溶媒量上限"></Input>
                </Col>
                <Col class-name="table-col" span="4">
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
        <Modal
            v-model="menstruumModal"
            title="选择溶媒"
            :scrollable="true"
            :closable="false"
            :mask-closable="false"
            :width="768"
            class-name="select-modal">
            <div class="modal-content-header">
                <SearchInput placeholder="输入药品或成份" @listen-search-click="searchClick"></SearchInput>
            </div>
            <Table :height="modalTableHeight" :data="menstruumDataList" :columns="menstruumColumns" :stripe="true" :highlight-row="true" @on-current-change="menstruumSelectChange"></Table>
            <div class="footer-show-container" slot="footer">
                <span>当前选择溶媒:</span>
                <strong> {{ showCurrentMenstruum }} </strong>
                <Button @click="submitSelect">确定</Button>
                <Button type="dashed" @click="cancelSelect">取消</Button>
            </div>
        </Modal>
        <div class="table-container" v-if="(!isEdit && switchStatus)">
            <Row class-name="table-row table-header" align="middle" justify="center">
                <Col class-name="table-col" span="5">
                    溶媒
                </Col>
                <Col class-name="table-col" span="5">
                    溶媒规格
                </Col>
                <Col class-name="table-col" span="5">
                    溶媒量下限
                </Col>
                <Col class-name="table-col" span="5">
                    溶媒量上限
                </Col>
                <Col class-name="table-col" span="4">
                    错误类型
                </Col>
            </Row>
            <Row class-name="table-row" align="middle" justify="center" v-for="(item, index) in list" :key="item.menstruumCode">
                <Col class-name="table-col" span="5">
                    {{ item.menstruumName }}
                </Col>
                 <Col class-name="table-col" span="5">
                    {{ item.standanrd }}
                </Col>
                <Col class-name="table-col" span="5">
                    {{ item.valueLower }}
                </Col>
                <Col class-name="table-col" span="5">
                    {{ item.valueUpper }}
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
            //已选溶媒(展示)
            showSelectedMenstruum: {
                name: null,
                code: null
            },
            //溶媒规格
            standanrdModel: null,
            //溶媒量下 上限
            valueUpperModel: null,
            valueLowerModel: null,
            //错误类型
            errorTypeModel: null, //id
            errorName: null, //(展示)
            errorTypeList: [],

            list: [],
            //是否可继续添加
            ableAdd: true,

            //模态框
            menstruumModal: false,
            menstruumDataList: [],
            menstruumColumns: [
                {
                    title: '溶媒编号',
                    align: 'center',
                    key: 'code'
                },
                {
                    title: '溶媒名称',
                    align: 'center',
                    key: 'name'
                }
            ],
            //当前已选溶媒
            currentSelectedMenstruum: {}
        };
    },
    computed: {
        showCurrentMenstruum () {
            return this.currentSelectedMenstruum.name === undefined ? '暂无' : this.currentSelectedMenstruum.name;
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
            this.showSelectedMenstruum.name = null;
            this.showSelectedMenstruum.code = null;
            this.standanrdModel = null;
            this.valueLowerModel = null;
            this.valueUpperModel = null;
            this.errorTypeModel = null;
            this.errorName = null,
            
            this.ableAdd = false;
        },
        //确认添加
        confirmAddItem () {
            let obj = {
                state: this.state,
                menstruumCode: this.showSelectedMenstruum.code,
                menstruumName: this.showSelectedMenstruum.name,
                standanrd: this.standanrdModel,
                valueLower: this.valueLowerModel,
                valueUpper: this.valueUpperModel,
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

        //获取[选择溶媒] 接口
        getMenstruum() {
            let _this = this; 
            util.request(global.API_PREFIX + "/standardSpecification/getMenstruum"
            ).then(function(response) {
                if (response.data.code === 1) {
                    //处理数据
                    let newArr = [];
                    response.data.data.list.forEach(function (el) {
                        if (el.isMenstruum === 0) {
                            newArr.push({
                                code: el.drugCode,
                                name: el.drugName
                            });
                        }
                    });
                    _this.menstruumDataList = newArr;
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },
        //点击[选择溶媒] 打开模态框
        selectMenstruum () {
            this.getMenstruum();
            this.menstruumModal = true;
        },
        //提交[选择溶媒]
        submitSelect () {
            //当前选择赋给已选择
            this.showSelectedMenstruum = this.currentSelectedMenstruum;
            //关闭模态框
            this.menstruumModal = false;
        },
        //关闭[选择溶媒]
        cancelSelect () {
            //清除当前选择
            this.currentSelectedMenstruum = {};
            //关闭模态框
            this.menstruumModal = false;
        },
        //[选择溶媒]改变时
        menstruumSelectChange (currentRow) {
            //获取当前选择
            this.currentSelectedMenstruum = currentRow;
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
