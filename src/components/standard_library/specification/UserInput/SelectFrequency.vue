<style lang="less">
@import "../../../../styles/difinitions";

    .SelectFrequency {
        //混合-标签大小
        .Tag-size(@width: 90%) {
            width: @width;
            height: 100%;
            min-width: 70px;
            min-height: 30px;
            margin-right: 10px;
        }


        //内容
        .content-container {
            width: 100%;

            .add-tag {
                display: inline-flex;
                justify-content: space-between;
                align-items: center;
                .Tag-size();
                max-height: 30px;
                .ivu-tag-text {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            .add-btn {
                .Tag-size();
                
            }
            .ivu-btn.ivu-btn-icon-only {
                min-height: 30px;
                width: 100%;
            }
        }
        //模态框
        .select-modal {

            .modal-content-header {
                display: flex;
                justify-content: flex-end;
            }
        }

        //完成编辑后
        .item {
            width: 24%;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 30px;
            border: 1px solid @c-main;
            border-radius: 3px;
            padding: 0 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            margin-right: 1%;
            margin-bottom: 5px;
        }
    }
</style>

<template>
    <div class="SelectFrequency">
        <!-- 可编辑状态 -->
        <div v-if="isEdit">
            <Row class-name="content-container" type="flex" justify="start" v-if="isEdit">
                <Col span="6" v-for="showItem in showList" :key="showItem">
                    <Tag class="add-tag" :name="showItem" closable @on-close="deleteItem" :title="showItem">
                        {{ showItem }}
                    </Tag>
                </Col>
                <Col span="6">
                    <Button class="add-btn" icon="add" type="info" size="small" @click="addItem"> </Button>
                </Col>
            </Row>
            <Modal
                v-model="selectModal"
                title="选择频次"
                :scrollable="true"
                :width="768"
                class-name="select-modal"
                @on-ok="submitSelect"
                @on-cancel="cancelSelect">
                <div class="modal-content-header">
                    <SearchInput placeholder="输入频次" @listen-search-click="searchClick"></SearchInput>
                </div>
                <Table :height="modalTableHeight" :data="frequencyDataList" :columns="frequencyColumns" :stripe="true" @on-selection-change="frequencySelectChange"></Table>
            </Modal>
        </div>
        <!-- 不可编辑状态 -->
        <div v-else>
            <Row>
                <Col class="item" span="6" v-for="showItem in showList" :key="showItem" :title="showItem">
                    {{ showItem }}
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import util from "../../../../libs/util";
export default {
    props: {
        //是否为编辑状态 默认不可编辑
        isEdit: {
            type: Boolean,
            default: false
        },

        //已选list
        selectedList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            //展示的list
            showList: [],

            //模态框
            selectModal: false,
            //已填/选的list
            list: this.selectedList,
            frequencyDataList: [],
            frequencyColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '频次编号',
                    align: 'center',
                    key: 'pcCode'
                },
                {
                    title: '频次名称',
                    align: 'center',
                    key: 'pcName'
                },
                {
                    title: '每日次数',
                    align: 'center',
                    key: 'dayTimes'
                }
            ],
            modalSearchVal: ''
        };
    },
    computed: {
        modalTableHeight () {
            let h = window.innerHeight;
            return h - 300;
        }
    },
    methods: {

        //添加
        addItem () {
            //获取频次
            this.getList();
            //打开模态框
            this.selectModal = true;
        },

        //删除
        deleteItem (event, name) {
            const index = this.list.indexOf(name);
            this.list.splice(index, 1);
        },


        /**
         * 获取搜索框关键字
         * 
         * @event SearchInput#click
         * @param {String} value 返回的值
         */
        searchClick (value) {
            this.modalSearchVal = value;
            //调用搜索接口
            this.getList();
        },

        //获取已选频次
        frequencySelectChange (selection) {
            let arr = [];
            selection.forEach(function (el) {
                arr.push(
                    el.pcName
                );
            });
            this.list = arr;
        },

        //提交选择
        submitSelect () {
            this.showList = this.list;
            this.$emit('get-list', this.showList);
        },

        //取消选择 关闭模态框
        cancelSelect () {
            this.selectModal = false;
        },

       
        //获取频次列表 接口
        getList () {
            let _this = this;
            //parm
            util.request(global.API_PREFIX + "/frequency/getList"
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.frequencyDataList = response.data.data.list;
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        }
    }
};
</script>
