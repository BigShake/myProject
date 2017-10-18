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
        height: 100%;
        width: 100%;
        display: inline-flex;
        justify-content: space-between; //表格容器
        .content-table-container {
            height: 100%;
            width: 50%;
        } //选项卡容器
        .content-main-container {
            height: 100%;
            width: 50%;
        }
    }
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
            <div class="content-table-container">
                <Pager ref="initPager" v-on:on-get-data="">
                    <Table :height="tableHeight" border :columns="dataColumns" :data="dataList" :stripe="true" :border="true"></Table>
                </Pager>
            </div>
            <div class="content-main-container">
                <ContentAndExaminePrescription></ContentAndExaminePrescription>
            </div>
        </div>
    </div>
</template>

<script>
import util from "../../libs/util";
export default {
    data() {
        return {
            searchInput: "",
            dataList: [],
            dataColumns: [
                {
                    title: '药品编号',
                    key: 'tradeCode',
                    width: 100,
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
                    width: 120,
                    align: 'left'
                }
            ],
            //药品分类
            drugClassifyModel: '',
            drugClassifyList: [],

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
    computed: {
        tableHeight() {
            return util.getHeight();
        }
    },
    methods: {
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
                "classificationId": _this.drugClassifyModel
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
                "confState": _this.optionStatusModel
            };
            //console(_this.optionStatusModel);
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
                "content": value
            };
            util.request(global.API_PREFIX + "/superSpecification/getList",
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
        //获取药品列表 接口
        getList(param) {
            let _this = this;
            let params = param;
            util.request(global.API_PREFIX + "/superSpecification/getList",
                params
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.dataList = response.data.data.list;
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

        //初始化数据
        this.getDrugList();
        this.getList();

    }
};
</script>
