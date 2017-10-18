<style lang="less" scoped>
@import "../../../styles/difinitions";

    .ExaminePrescriptionOption {
        background-color: #fff;
        // height: 300px;
        // overflow: auto;

        // margin-bottom: 300px;
        padding: 10px 0 20px 20px;
        // border: 1px solid @c-table-border;

        .edit-btn {
            font-family: @edit-btn-font;
        }
        
        .header {
            display: flex;
            justify-content: flex-end;
        }

        .block {
            min-height: 35px;
            margin-bottom: 10px;
        }

        .emphasize {
            display: inline-block;
            min-width: 5px;
            color: @c-emphasize;
        }
        
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
    <div class="ExaminePrescriptionOption" :style="{ height: this.comHeight + 'px' , overflow: 'auto'}">
        <div class="header block">
            <Button class="edit-btn" icon="edit" @click="save">{{ editText }}</Button>
        </div>
        <div class="block">
            <Icon type="base-info" color="#45c8bc"></Icon>
            <strong>基础信息</strong>
        </div>
        <div class="block">
            <Row v-if="isSuper">
                <Col span="12">
                    <span style="margin-right: 30px">商品名:</span>
                    <span>力扑素</span>
                </Col>
                <Col span="12">
                    <span style="margin-right: 30px">生产厂家:</span>
                    <span>南京绿叶思科药业有限公司</span>
                </Col>
            </Row>
            <Row v-else>
                <Col span="6">
                    <span>通用名:</span>
                </Col>
                <Col span="18">
                    <span>注射用紫杉醇脂质体</span>
                </Col>
            </Row>
        </div>

        <div class="block">
            <Row>
                <Col span="6">
                    主要成份:
                </Col>
                <Col span="18">
                    <Row>
                        <Col class-name="item" span="6" v-for="mainComponentItem in mainComponentList" :key="mainComponentItem">
                            <span>{{ mainComponentItem }}</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    辅料:
                </Col>
                <Col span="18">
                    <Row>
                        <Col class-name="item" span="6" v-for="minorComponentItem in minorComponentList" :key="minorComponentItem">
                            <span>{{ minorComponentItem }}</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

        <div class="block">
            <Icon type="circle-question-mark" color="#45c8bc"></Icon>
            <strong>配伍禁忌</strong>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    配伍-禁忌:
                </Col>
                <Col span="18">
                    <AddSelect v-if="isSuper" :isEdit="editStatus" @get-list="getProhibitionList"></AddSelect>
                    <Row v-else>
                        <Col class="item" span="6" v-for="item in prohibitionList" :key="item.name" :title="item.name">
                            {{ item.name }}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    配伍-禁止:
                </Col>
                <Col span="18">
                    <AddSelect v-if="isSuper" :isEdit="editStatus" @get-list="getImproperList"></AddSelect>
                    <Row v-else>
                        <Col class="item" span="6" v-for="item in improperList" :key="item.name" :title="item.name">
                            {{ item.name }}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    配伍-不宜:
                </Col>
                <Col span="18">
                    <AddSelect v-if="isSuper" :isEdit="editStatus" @get-list="getForbiddenList"></AddSelect>
                    <Row v-else>
                        <Col class="item" span="6" v-for="item in forbiddenList" :key="item.name" :title="item.name">
                            {{ item.name }}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

        <div class="block">
            <Icon type="needle" color="#45c8bc"></Icon>
            <strong>用法用量</strong>
        </div>
        <div class="block">
            <Row>
                <Col span="6">
                    频次:
                </Col>
                <Col span="18">
                    <SelectFrequency :isEdit="editStatus"></SelectFrequency>
                </Col>
            </Row>
        </div>
        
        <TableOne :isEdit="editStatus"></TableOne>
        <TableTwo :isEdit="editStatus"></TableTwo>
        <TableThree :isEdit="editStatus"></TableThree>
        <TableFour :isEdit="editStatus"></TableFour>
        <TableFive :isEdit="editStatus"></TableFive>

        </div>
    </div>
</template>

<script>
import util from "../../../libs/util";
export default {
    props: {
        //是否为超说明书 默认是
        isSuper: {
            type: Boolean,
            default: true
        },
        option: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            editStatus: false,
            //主要成份
            mainComponentList: ['紫杉醇'],
            // 辅料
            minorComponentList: ['卵磷脂', '胆固醇', '苏氨酸', '葡萄糖'],
            //配伍禁忌
            prohibitionList: [],
            improperList: [],
            forbiddenList: []

        };
    },
    computed: {
        //显示'保存'或'编辑'
        editText () {
            return (this.editStatus === true) ? '保存' : '编辑';
        },
        comHeight () {
            return window.innerHeight - 60 - 140;
        }
    },
    methods: {
        save () {
            this.editStatus = !this.editStatus;
            //调用接口
        },

        //从子组件拿到list
        getProhibitionList (data) {
            // console.log(data);
        },

        getImproperList (data) {
            
        },

        getForbiddenList (data) {
            
        },
        //频次

        //获取审方设置 接口
        getPharmacyReview (param) {
            let _this = this;

            /**
             * 处理配伍禁忌数组
             * 
             * @param {Array} arr
             * @param {String} type
             * @return {Array} 配伍禁忌数组
             */
            function handleIncompatibilityList (arr, type) {
                let newArr = [];
                arr.forEach(function (el) {
                    if (el.errorName === type) {
                        newArr.push({
                            name: el.name,
                            errorGrade: el.errorGrade
                        });
                    }
                });
                return newArr;
            }
            util.request(global.API_PREFIX + "/standardDrug/getPharmacyReview", param
            ).then(function(response) {
                if (response.data.code === 1) {
                    const dataList = response.data.data;
                    //处理配伍禁忌
                    _this.prohibitionList = handleIncompatibilityList(dataList.incompatibilityList, '禁忌');
                    _this.improperList = handleIncompatibilityList(dataList.incompatibilityList, '不宜');
                    _this.forbiddenList = handleIncompatibilityList(dataList.incompatibilityList, '禁止');
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },

        //保存审方设置 接口
        savePharmacyReview (param) {
            let _this = this;
            util.request(global.API_PREFIX + "/standardDrug/savePharmacyReview", param
            ).then(function(response) {
                if (response.data.code === 1) {
                    //保存成功
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        }
    },
    created () {
        //初始化数据
        this.getPharmacyReview();
    }
};
</script>
