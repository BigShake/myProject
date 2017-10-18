<style lang="less">
@import "../../../styles/difinitions";

    .AddSelect {
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
        }
    }
</style>

<template>
    <div class="AddSelect">
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
                title="选择药品/成份"
                :scrollable="true"
                :width="768"
                class-name="select-modal"
                @on-ok="submitSelect"
                @on-cancel="cancelSelect">
                <div class="modal-content-header">
                    <SearchInput placeholder="输入药品或成份" @listen-search-click="searchClick"></SearchInput>
                </div>
                <Tabs value="name1">
                    <TabPane label="药品" name="drugTab">
                        <Table :data="drugDataList" :columns="drugColumns" :stripe="true" @on-selection-change="drugSelectChange"></Table>
                    </TabPane>
                    <TabPane label="成份" name="ingredientTab">
                        <Table :data="ingredientDataList" :columns="ingredientColumns" :stripe="true" @on-selection-change="ingredientSelectChange"></Table>
                    </TabPane>
                </Tabs>
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
import util from "../../../libs/util";
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
            drugDataList: [],
            drugColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '药品编号',
                    align: 'center',
                    key: 'drugCode'
                },
                {
                    title: '药品分类',
                    align: 'center',
                    key: 'classifyName'
                },
                {
                    title: '药品名称',
                    align: 'center',
                    key: 'drugName'
                }
            ],
            ingredientDataList: [],
            ingredientColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '成份',
                    align: 'center',
                    key: 'ingredientsName'
                }
            ],
            modalSearchVal: ''
        };
    },
    computed: {

    },
    methods: {

        //添加
        addItem () {
            //获取药品和成份
            this.addIncompatibilitySecond(1);
            this.addIncompatibilitySecond(2);
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
            this.searchFirst(1);
            this.searchFirst(2);
        },

        //获取已选药品
        drugSelectChange (selection) {
            let arr = [];
            selection.forEach(function (el) {
                arr.push(
                    el.drugName
                );
            });
            this.list = arr;
        },

        //获取已选成份
        ingredientSelectChange (selection) {
            let arr = [];
            selection.forEach(function (el) {
                arr.push(
                    el.ingredientsName
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

        //获取药品或成份 接口 1是药品 2是成份
        addIncompatibilitySecond (type) {
            let _this = this;
            let param = {
                type: type
            };
            util.request(global.API_PREFIX + "/incompatibility/addIncompatibilitySecond", param
            ).then(function(response) {
                if (response.data.code === 1) {
                    if (type === 1) {
                        _this.drugDataList = response.data.data;
                    } else {
                        _this.ingredientDataList = response.data.data;
                    }
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },

        //搜索药品或成份 接口 1是药品 2是成份
        searchFirst (type) {
            let _this = this;
            let param = {
                keyWord: this.modalSearchVal,
                type: type
            };
            util.request(global.API_PREFIX + "/incompatibility/searchFirst", param
            ).then(function(response) {
                if (response.data.code === 1) {
                    if (type === 1) {
                        _this.drugDataList = response.data.data.list;
                    } else {
                        _this.ingredientDataList = response.data.data.list;
                    }
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        }
    }
};
</script>
