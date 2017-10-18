<style scoped lang="less">
.patient_prescription {
    //height: 100%;
    //头部
    .header-container {
        padding: 30px 0 0 0;
        width: 100%;
        margin-bottom: 20px;
        display: inline-flex;
        justify-content: space-between;
        align-items: center; // z-index: 999;
        .header-left {
            .left-item {
                margin-right: 10px;
            }
            .left-select {
                width: 100px;
            }
        }
    } //内容
    .content-container {
        height: 100%;
        width: 100%;
        display: inline-flex;
        justify-content: space-between;

        .patient-name-container {
            z-index: 1;
            height: 500px;
            overflow: auto
        }

        @container-width: 33%; //表格容器
        .content-table-container-short {
            height: 100%;
            width: @container-width;
        }
        .content-table-container-long {
            height: 100%;
            width: 100% - @container-width;
        } //选项卡容器
        .content-main-container {
            height: 100%;
            width: 50%;
        }
    }
}

.ivu-menu-vertical .ivu-menu-item,
.ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 10px 0px;
    position: relative;
    cursor: pointer;
    z-index: 1;
    transition: all .2s ease-in-out;
}
</style>

<template>
    <div class="patient_prescription">
        <div class="header-container">
            <div class="header-left">
                <Select class="left-item left-select" v-model="drugClassifyModel" @on-change="drugClassifyChange" placeholder="药品分类" :clearable="true">
                    <Option v-for="drugClassifyItem in drugClassifyList" :value="drugClassifyItem.value" :key="drugClassifyItem.value">
                        {{ drugClassifyItem.label }}
                    </Option>
                </Select>
                <Select class="left-select" v-model="optionStatusModel" @on-change="optionStatusChange" placeholder="配置状态" :clearable="true">
                    <Option v-for="optionStatusItem in optionStatusList" :value="optionStatusItem.value" :key="optionStatusItem.value">
                        {{ optionStatusItem.label }}
                    </Option>
                </Select>
            </div>
            <div class="header-right">
                <SearchInput placeholder="搜索" @listen-search-click="searchClick()"></SearchInput>
            </div>
        </div>
        <div class="content-container">
            <div class="patient-name-container" style="width: 150px;">
                <div class="show-content div-border">
                    <Menu :active-name="activeName" @on-select="checkdept" style="width: 100%;">
                        <Menu-group class="patient" title="病区">
                            <Menu-item v-for="(value, index) in deptList" :key="index" :name="value.deptName" :class="{'menu-item-bg': (index % 2 === 1), 'orange-bg': (index === 0 && isZero)}">
                                <Row style="line-height: 2.0;">
                                    <Col span="4">
                                    <div v-if="index < 10">{{'0'+(index+1)}}</div>
                                    <div v-else>{{(index+1)}}</div>
                                    </Col>
                                    <Col>{{value.deptName}}</Col>
                                </Row>
                            </Menu-item>
                        </Menu-group>
                    </Menu>
                </div>
            </div>
            <div class="content-table-container-short">
                <div style="float: right;">
                    <Button @click="inhospChoiceModal = true">病人选择</Button>
                </div>
                <div style="padding: 40px 0;">
                    <Table :columns="inhospdataColumns" :data="inPatientList" :stripe="true" :border="true"></Table>
                </div>

            </div>
            <div class="content-table-container-long">
                <div style="float: right;">
                    <Button @click="drugChoiceModal = true">药品选择</Button>
                </div>

                <div style="padding: 40px 0;">
                    <Table :columns=" drugdataColumns" :data="dataList" :stripe="true" :border="true"></Table>
                </div>

            </div>
        </div>

        <Modal class-name="add-patient-modal" v-model="inhospChoiceModal" title="病人选择" width="700">
            <div>
                <div>
                    <SearchInput style="float: right;" placeholder="输入病人姓名查询" @listen-search-click=""></SearchInput>
                </div>
                <div>
                    <Pager style="padding: 40px 0" ref="initPager" v-on:on-get-data="">
                        <Table :columns="inhospChoiceColumns" :data="inhospChoicedataList" :stripe="true" :border="true"></Table>
                    </Pager>
                </div>
                <div style="text-align:center;">
                    <Button @click="addDurg()">确定</Button>
                    <Button @click="cal()">取消</Button>
                </div>
            </div>
            <template slot="footer"></template>
        </Modal>
        <Modal class-name="add-patient-modal" v-model="drugChoiceModal" title="药品选择" width="700">
            <div>
                <div>
                    <SearchInput style="float: right;" placeholder="输入药品名称查询" @listen-search-click=""></SearchInput>
                </div>
                <div>
                    <Pager style="padding: 40px 0" ref="initPager" v-on:on-get-data="">
                        <Table :columns="DrugChoiceColumns" :data="drugChoicedataList" :stripe="true" :border="true"></Table>
                    </Pager>
                </div>
                <div style="text-align:center;">
                    <Button @click="addinhosp()">确定</Button>
                    <Button @click="cala()">取消</Button>
                </div>
            </div>
            <template slot="footer"></template>
        </Modal>
        <Modal v-model="isDeletePatient" title="删除病人">
            <p>是否删除该病人</p>
            <div style="text-align:center;">
                <Button @click="okDeletePatient()">确定</Button>
                <Button @click="cancel()">取消</Button>
            </div>
            <template slot="footer"></template>
        </Modal>
        <Modal v-model="isDeleteDrug" title="删除药品">
            <p>是否删除该药品</p>
            <div style="text-align:center;">
                <Button @click="okDeleteDrug()">确定</Button>
                <Button @click="cancel()">取消</Button>
            </div>
            <template slot="footer"></template>
        </Modal>
    </div>
</template>

<script>
import util from "../../libs/util";
export default {
    data() {
        return {
            activeName: '',
            isDeletePatient: false,
            isDeleteDrug: false,
            drugChoiceModal: false,
            inhospChoiceModal: false,
            inPatientList: [],
            inhospChoicedataList: [],
            drugChoicedataList: [],
            dataList: [],
            drugdataList: [],
            isZero: true,
            //病人选择列表
            inhospdataColumns: [
                {
                    title: '病人住院号',
                    key: 'inhospNo',
                    //width: 150,
                    align: 'left'
                },
                {
                    title: '病人姓名',
                    key: 'inhospName',
                    //width: 150,
                    align: 'left'
                },
                {
                    title: '操作',
                    key: 'action',
                    //width: 100,
                    align: 'left',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    icon: "delete"
                                },
                                style: {
                                    color: "#6d768c"
                                },
                                on: {
                                    click: () => {
                                        this.deletePatient();
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            drugdataColumns: [
                {
                    title: '药品编号',
                    key: 'tradeCode',
                    //width: 100,
                    align: 'left'
                },
                {
                    title: '通用名',
                    key: 'baseName',
                    // width: 139,
                    align: 'left'
                },
                {
                    title: '商品名',
                    key: 'tradeName',
                    // width: 139,
                    align: 'left'
                },
                {
                    title: '生产厂家',
                    key: 'factory',
                    // width: 139,
                    align: 'left'
                },
                {
                    title: '配置状态',
                    key: 'baseName',
                    //width: 150,
                    align: 'left'
                },
                {
                    title: '审方设置',
                    key: 'action',
                    //width: 100,
                    align: 'left',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    icon: "party-setting2"
                                },
                                style: {
                                    color: "#6d768c"
                                },
                                on: {
                                    click: () => {
                                        this.checkSetting();
                                    }
                                }
                            })
                        ]);
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    //width: 100,
                    align: 'left',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    icon: "delete"
                                },
                                style: {
                                    color: "#6d768c"
                                },
                                on: {
                                    click: () => {
                                        this.deleteDrug();
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],

            inhospChoiceColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '病人住院号',
                    key: 'inhospNo',
                    //width: 150,
                    align: 'left'
                },
                {
                    title: '病人姓名',
                    key: 'inhospName',
                    //width: 150,
                    align: 'left'
                }
            ],

            DrugChoiceColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '药品编号',
                    key: 'tradeCode',
                    //width: 100,
                    align: 'left'
                },
                {
                    title: '通用名',
                    key: 'baseName',
                    // width: 139,
                    align: 'left'
                },
                {
                    title: '商品名',
                    key: 'tradeName',
                    // width: 139,
                    align: 'left'
                },
                {
                    title: '生产厂家',
                    key: 'factory',
                    // width: 139,
                    align: 'left'
                }
            ],
            //药品分类
            drugClassifyModel: '',
            drugClassifyList: [],

            //选择复制的药品
            drugCodeList: [],

            //复制到的病区
            fromDeptCodeList: [],

            //病区
            deptList: [],
            //配置状态
            optionStatusModel: '',
            optionStatusList: [
                {
                    value: '已配置',
                    label: '已配置'
                },
                {
                    value: '未配置',
                    label: '未配置'
                },
                {
                    value: '内容未配置',
                    label: '内容未配置'
                },
                {
                    value: '审方未配置',
                    label: '审方未配置'
                }
            ],

            //搜索
            searchVal: ''

        };
    },
    methods: {
        cal() {
            this.inhospChoiceModal = false;
        },
        cala() {
            this.drugChoiceModal = false;
        },
        addDurg() {
            this.inhospChoiceModal = false;
            this.$Message.info('添加成功');
        },
        addinhosp() {
            this.drugChoiceModal = false;
            this.$Message.info('添加成功');
        },
        deletePatient() {
            this.isDeletePatient = true;
        },
        deleteDrug() {
            this.isDeleteDrug = true;
        },
        okDeletePatient() {
            let _this = this;
            let param = {
                "deptCode": "1112",
                "inhospNo": "536658"
            };
            util.request(global.API_PREFIX + "/patientPharmacyReview/deletePatientFromDapt",
                param
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.$Message.success(response.data.mess);
                    _this.$emit('drug-delete', true);
                } else {
                    _this.$Message.error(response.data.mess);
                    _this.$emit('drug-delete', false);
                }
            });
        },
        okDeleteDrug() {
            let _this = this;
            let param = {
                "deptCode": "1112",
                "inhospNo": "536658",
                "drugCode": "H000005001"
            };
            util.request(global.API_PREFIX + "/patientPharmacyReview/deleteDurgFromPatient",
                param
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.$Message.success(response.data.mess);
                    _this.$emit('drug-delete', true);
                } else {
                    _this.$Message.error(response.data.mess);
                    _this.$emit('drug-delete', false);
                }
            });
        },
        cancel() {
            this.$Message.info('点击了取消');
        },
        setParam() {
            return {
                "content": "药品名称",
                "classificationId": "1",
                "confState": "已配置",
                "perPage": 10,
                "currentPage": 1
            };
        },
        //转到审方设置
        checkSetting() {
            this.$router.push("/trial_party_setting");
        },
        /**
         * [药品分类]改变时
         * 
         * @event Select#on-change
         */
        drugClassifyChange() {
            // console.log('this.drugClassifyModel: ', this.drugClassifyModel);
            let _this = this;
            let params = {
                "deptCode": _this.deptCode,
                "classificationId": _this.drugClassifyModel,
                "inhospNo": "",
                "configSate": ""
                // "currentPage": 1,
                // "perPage": 10,
                // "totalPage": 1,
                // "totalNum": 2
            };
            _this.getList(params);
            // this.dataColumns.splice(this.dataColumns.length - 1, 1);
        },

        /**
         * [配置状态]改变时
         * 
         * @event Select#on-change
         */
        optionStatusChange() {
            // let _this = this;
            // _this.optionStatusModel = optionStatusModel;
            // let params = {
            //     "confState": _this.optionStatusModel
            // };
            // getList(params);
            //根据配置状态分类筛选
        },

        /**
         * 获取搜索框关键字
         * 
         * @event SearchInput#click
         * @param {String} value 返回的值
         */
        searchClick(value) {
            this.searchVal = value;
            //调用搜索接口
        },

        //点击病区
        checkdept() {

        },

        //获取药品分类 接口
        getDrugList() {
            let _this = this;
            util.request(global.API_PREFIX + "/drugClassify/getDrugListNoPage"
            ).then(function(response) {
                if (response.data.code === 1) {
                    //处理数据
                    let drugList = [];
                    response.data.data.forEach(function(el) {
                        drugList.push({
                            value: el.id,
                            label: el.classifyName
                        });
                    });
                    _this.drugClassifyList = drugList;
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },
        //获取配置状态 接口
        //获取病区不存在下的药品列表 接口
        getdrugList(param) {
            let _this = this;
            let params = param;
            util.request(global.API_PREFIX + "/patientPharmacyReview/getOutDrugList",
                params
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.drugdataList = response.data.data.list;
                } else {
                    _this.$Message.error(response.data.mess);
                }

            });
        },
        //获取药品列表 接口
        getList(param) {
            let _this = this;
            let params = param;
            util.request(global.API_PREFIX + "/patientPharmacyReview/getDrugList",
                params
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.dataList = response.data.data.list;
                } else {
                    _this.$Message.error(response.data.mess);
                }

            });
        },
        //获取病区列表 接口
        getdeptList(param) {
            let _this = this;
            let params = param;
            util.request(global.API_PREFIX + "/deptPharmacyReview/getDeptList",
                params
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.deptList = response.data.data;

                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },

        //获取病区下的病人列表 接口
        getinPatientList(param) {
            let _this = this;
            let params = param;
            util.request(global.API_PREFIX + "/patientPharmacyReview/getPatientList",
                params
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.inPatientList = response.data.data;

                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },
        //获取不在病区下的病人列表 接口
        getPatientList(param) {
            let _this = this;
            let params = param;
            util.request(global.API_PREFIX + "/patientPharmacyReview/getOutPatientList",
                params
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.inhospChoicedataList = response.data.data.list;

                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },
        //获取不在病区下的药品列表 接口
        getOutDrugList(param) {
            let _this = this;
            let params = param;
            util.request(global.API_PREFIX + "/patientPharmacyReview/getOutDrugList",
                params
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.drugChoicedataList = response.data.data.list;

                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        }
    },
    created() {
        //[操作]鉴权处理
        // if ( ) {
        //     this.dataColumns.splice(this.dataColumns.length - 1, 1);
        // }
        let params = {
            "deptCode": "1112",
            "inhospNo": "536658",
            "content": "",
            "classificationId": "",
            "configSate": ""
        };
        let val = {
            "deptCode": "1112",
            "inhospNo": "536658",
            "content": "",
            "classificationId": "",
            "configSate": "已配置",
            "currentPage": 1,
            "perPage": 10,
            "totalPage": 1,
            "totalNum": 2
        };
        //初始化数据
        this.getdeptList();
        this.getdrugList(params);
        //获取药品列表
        this.getList(val);
        this.getPatientList(params);
        this.getinPatientList(params);
        this.getOutDrugList(val);
        //获取药品分类
        this.getDrugList();
    }
};
</script>
