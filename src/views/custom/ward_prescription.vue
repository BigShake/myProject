<style scoped lang="less">
.specification {
    //height: 100%;
    //头部
    .header-container {
        padding: 30px 0 0 0;
        width: 100%;
        margin-bottom: 20px;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;

        .header-left {
            .left-item {
                margin-right: 10px;
            }
            .left-select {
                width: 100px;
            }
        } // .header-right {
        //     // display: relative;
        //     // float: left;
        // }
    } //内容
    .content-container {
        //height: 100%;
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        border-style: solid;
        border-width: 1px;
        border-style: solid;
        border-color: #dddee1;
        .patient-name-container {
            height: 500px;
            overflow: auto;
            z-index: 1;
        } //表格容器
        .content-table-container {
            height: 100%;
            width: 100%;
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
    <div class="specification">
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
                <SearchInput placeholder="搜索" v-on:listen-search-change="changeSearchParam" v-on:listen-search-click="searchClick"></SearchInput>
            </div>
        </div>
        <div class="content-container">
            <div class="patient-name-container" style="width: 150px;">
                <Menu :active-name="activeName" @on-select="checkdept" style="width: 100%;">
                    <Menu-group class="patient-name" title="病区">
                        <Menu-item v-for="(value, index) in deptList" :key="index" :name="value.deptCode" :class="{'menu-item-bg': (index % 2 === 1), 
                            'orange-bg': (index === 0 && isZero)}">
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
            <div class="content-table-container">
                <div style="float: right;">
                    <Button @click="DrugChoiceModal = true">药品选择</Button>
                    <Button @click="DrugReuseModal = true">药品复用</Button>
                </div>
                <Pager style="padding: 40px 0" ref="initPager" v-on:on-get-data="">
                    <Table @on-selection-change="drugSelectedMultiplexingMemberChange" :columns="dataColumns" :data="dataList" :stripe="true" :border="true"></Table>
                </Pager>
            </div>
        </div>
        <Modal class-name="add-patient-modal" v-model="DrugChoiceModal" title="药品选择" width="700">
            <div>
                <div style="position: absolute; right: 15px;">
                    <SearchInput placeholder="输入药品名称查询" @listen-search-click=""></SearchInput>
                </div>
                <div style="padding-top: 45px">
                    <Pager style="padding: 40px 0" ref="initPager" v-on:on-get-data="">
                        <Table @on-selection-change="drugSelectedMemberChange" :columns="drugdataColumns" :data="drugdataList" :stripe="true" :border="true"></Table>
                    </Pager>
                </div>
                <div style="text-align:center; padding: 10px">
                    <Button @click="addDurg()">确定</Button>
                </div>
            </div>
            <template slot="footer"></template>
        </Modal>
        <Modal class-name="add-patient-modal" v-model="DrugReuseModal" title="药品复用" width="700">
            <div>
                <div>
                    <CheckboxGroup v-model="fromDeptCodeList" @on-change="deptSelectedMemberChange">
                        <div>
                            <Checkbox v-for="value in deptList" :key="value.deptCode" :label="value.deptCode" style="width: 40%; padding: 7px  0 7px 100px">
                                <span>{{value.deptName}}</span>
                            </Checkbox>
                        </div>
                    </CheckboxGroup>
                </div>
                <div style="text-align:center;">
                    <Button @click="addReuse()">确定</Button>
                </div>
            </div>
            <template slot="footer"></template>
        </Modal>
        <Modal v-model="isdelete" title="删除药品" @on-ok="ok" @on-cancel="cancel">
            <p>是否删除该药品</p>
            <div style="text-align:center;">
                <Button @click="ok()">确定</Button>
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
            deleteModelConfig: { //模态框
                title: "药品匹配",
                content: "从HIS中同步药品进行匹配",
                onOk: this.deletePopulation
            },
            populationId: null,
            activeName: '',
            isZero: true,
            DrugChoiceModal: false,
            DrugReuseModal: false,
            isdelete: false,
            dataList: [],
            drugdataList: [],
            dataColumns: [
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
                },
                {
                    title: '配置状态',
                    key: 'confState',
                    //width: 100,
                    align: 'left'
                },
                {
                    title: '内容/审方设置',
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
                    //width: 150,
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
                                        this.deleteCompatibility(params.row.id);
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            drugdataColumns: [
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

            //模态框选择复制的药品
            drugCodeList: [],

            //选择复制的药品
            drugCodeMultiplexingList: [],

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
            searchVal: '',
            deptCode: ''
        };

    },
    computed: {
        tableHeight() {
            return util.getHeight();
        }
    },
    methods: {
        //添加药品
        addDurg() {
            let _this = this;
            let param = {
                "deptCode": _this.deptCode,
                "drugCodeList": _this.drugCodeList
            };
            let params = {
                "deptCode": _this.deptCode
            };
            util.request(global.API_PREFIX + "/deptPharmacyReview/addDurgTodept",
                param
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.$Message.success(response.data.mess);
                    _this.$emit('drug-delete', true);
                    _this.getList(params);

                } else {
                    _this.$Message.error(response.data.mess);
                    _this.$emit('drug-delete', false);
                }
            });
            this.DrugChoiceModal = false;
        },

        //模态框选中项改变时触发
        drugSelectedMemberChange(selection) {
            let _this = this;
            _this.drugCodeList = [];
            selection.forEach(function(value) {
                _this.drugCodeList.push(value.tradeCode);
            });
        },

        //模态框选中项改变时触发
        drugSelectedMultiplexingMemberChange(selection) {
            let _this = this;
            _this.drugCodeList = [];
            selection.forEach(function(value) {
                _this.drugCodeMultiplexingList.push(value.tradeCode);
            });
        },

        deptSelectedMemberChange(selection) {
            //console.log(selection);
            let _this = this;
            _this.drugCodeList = selection;
            // selection.forEach(function (value) {
            //     _this.fromDeptCodeList.push(selection);
            // });
        },
        //模态框选中项改变时触发
        // deptSelectedMemberChange(selection) {
        //     let _this = this;
        //     _this.drugCodeList = [];
        //     selection.forEach(function (value) {
        //         _this.drugCodeMultiplexingList.push(value.tradeCode);
        //     });
        // },
        addReuse() {
            let _this = this;
            let param = {
                "deptCode": _this.deptCode,
                "drugCodeList": _this.drugCodeMultiplexingList,
                "fromDeptCodeList": _this.fromDeptCodeList
            };
            //console.log(param);
            util.request(global.API_PREFIX + "/deptPharmacyReview/copyDurgTodept",
                param
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.$Message.success(response.data.mess);
                    _this.$emit('drug-delete', true);
                    //_this.getList(params);

                } else {
                    _this.$Message.error(response.data.mess);
                    _this.$emit('drug-delete', false);
                }
            });
            this.DrugReuseModal = false;
        },
        ok() {
            let _this = this;
            let param = {
                "id": 0
            };
            util.request(global.API_PREFIX + "/deptPharmacyReview/deleteDurgFromdept",
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
        deleteCompatibility(id) {
            this.isdelete = true;
        },
        checkdept(id) {
            //let _this = this;
            this.deptCode = id;
            let params = {
                "deptCode": id
            };
            this.getList(params);
        },
        checkSetting() {
            this.$router.push("/ward_trial_party_setting");
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
                "confState": _this.optionStatusModel
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
            let _this = this;
            // _this.optionStatusModel = optionStatusModel;
            let params = {
                "deptCode": _this.deptCode,
                "confState": _this.optionStatusModel,
                "classificationId": _this.drugClassifyModel
            };
            _this.getList(params);
            //根据配置状态分类筛选
        },

        changeSearchParam(val) {
            this.searchInput = val;
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
            let _this = this;
            let params = {
                "deptCode": _this.deptCode,
                "content": this.searchVal
            };
            util.request(global.API_PREFIX + "/deptPharmacyReview/getDrugList",
                params
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.dataList = response.data.data.list;
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
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
            util.request(global.API_PREFIX + "/deptPharmacyReview/getOutDeptDrugList",
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
            util.request(global.API_PREFIX + "/deptPharmacyReview/getDrugList",
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
                    _this.activeName = response.data.data[0].deptCode;
                    _this.checkdept(response.data.data[0].deptCode);
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
            "deptCode": "",
            "content": ""
            // "currentPage": 1,
            // "perpage": 10
        };
        //初始化数据
        this.getdeptList();
        this.getdrugList(params);
        this.getList(params);
        this.getDrugList();

    }
};
</script>
