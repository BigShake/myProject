<style scoped lang="less">

    .specification {
        // height: 100%;
        //头部
        .header-container {
            width: 100%;
            margin-top: 20px;
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
            }
            // .header-right {
            //     // display: relative;
            //     // float: left;
            // }
        }
        //内容
        .content-container {
            height: 100%;
            width: 100%;
            display: inline-flex;
            justify-content: space-between;
            
            //混合
            @container-width: 40%;
            //表格容器
            .content-table-container {
                height: 100%;
                width: @container-width;
            }
            //选项卡容器
            .content-main-container {
                height: 100% - @container-width;
                width: 60%;
            }
        }
    }

    //新增 模态框
    .specification-add-modal {
        //混合-垂直居中
        .center () {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .modal-content-row {
            margin: 10px 20px;

            .modal-content-col {
                min-height: 30px;
                .center();
            }
        }
        .footer-container {
            .center();
        }
    }
</style>

<template>
    <div class="specification">
        <div class="header-container">
            <div class="header-left">
                <Button class="left-item" @click="add">新增</Button>
                <Button class="left-item" @click="synchronizeDrugLibrary">同步药品库</Button>
                <Select class="left-item left-select" 
                    v-model="drugClassifyModel" 
                    @on-change="drugClassifyChange" 
                    placeholder="药品分类" 
                    :clearable="true">
                    <Option 
                        v-for="drugClassifyItem in drugClassifyList" 
                        :value="drugClassifyItem.value" 
                        :key="drugClassifyItem.value">
                        {{ drugClassifyItem.label }}
                    </Option>
                </Select>
                <Select class="left-select" 
                    v-model="optionStatusModel" 
                    @on-change="optionStatusChange" 
                    placeholder="配置状态" 
                    :clearable="true" >
                    <Option 
                        v-for="optionStatusItem in optionStatusList" 
                        :value="optionStatusItem" 
                        :key="optionStatusItem">
                        {{ optionStatusItem }}
                    </Option>
                </Select>
            </div>
            <div class="header-right">
                <SearchInput placeholder="搜索" @listen-search-click="searchClick"></SearchInput>
            </div>
        </div>

        <Modal
            v-model="addModal"
            title="新增药品"
            :scrollable="true"
            :closable="false"
            :mask-closable="false"
            class-name="specification-add-modal">
            <Row class-name="modal-content-row" align="middle" justify="center">
                <Col class-name="modal-content-col" span="8">药品名称</Col>
                <Col class-name="modal-content-col" span="16">
                    <Input v-model="drugNameModel" maxlength="64"></Input>
                </Col>
            </Row>
            <Row class-name="modal-content-row" align="middle" justify="center">
                <Col class-name="modal-content-col" span="8">是否为溶媒</Col>
                <Col class-name="modal-content-col" span="16">
                    <RadioGroup v-model="isMenstruumModel">
                        <Radio label="是"></Radio>
                        <Radio label="否"></Radio>
                    </RadioGroup>
                </Col>
            </Row>
          
            <div class="footer-container" slot="footer">
                <Button @click="submitAdd">确定</Button>
                <Button type="ghost" @click="cancelAdd">取消</Button>
            </div>
        </Modal>

        <div class="content-container">
            <div class="content-table-container">
                <!-- <Pager ref="initPager" v-on:on-get-data="getPageData"> -->
                <Pager ref="initPager">
                    <Table :height="tableHeight" :columns="dataColumns" :data="dataList" :stripe="true" :border="true"></Table>
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
    data () {
        return {
            //新增药品模态框
            addModal: false,
            drugNameModel: '',
            isMenstruumModel: '',

            //药品分类
            drugClassifyModel: '',
            drugClassifyList: [],
            
            //配置状态
            optionStatusModel: '',
            optionStatusList: ['已配置', '未配置', '内容未配置', '审方未配置'],
            
            //搜索
            searchVal: '',

            dataColumns: [
                {
                    title: '药品编号',
                    key: 'tradeCode',
                    width: 120,
                    align: 'left'
                },
                {
                    title: '通用名',
                    key: 'tradeName',
                    // width: 139,
                    align: 'left'
                },
                {
                    title: '配置状态',
                    key: 'confState',
                    width: 120,
                    align: 'left'
                },
                {
                    title: '操作',
                    key: 'operation',
                    width: 80,
                    align: 'center',
                    render: (h, p) => {
                        return h('SpecificationOpeartion', {
                            props: {
                                drugCode: p.row.tradeCode,
                                drugName: p.row.tradeName,
                                isMenstruum: p.row.isMenstruum
                            },
                            on: {
                                'refresh-data': (data) => {
                                    //刷新数据
                                    this.getList();
                                }
                            }
                        });
                    }
                }
            ],
            dataList: []            
        };
    },
    computed: {
        tableHeight () {
            return util.getHeight();
        }
    },
    methods: {
        //打开新增模态框
        add () {
            this.addModal = true;
        },

        //新增确认
        submitAdd () {
            let _this = this;
            if (this.drugNameModel.trim() === '') {
                _this.$Message.error('请填写药品名称');
            } else if (this.isMenstruumModel === '') {
                _this.$Message.error('请选择是否为溶媒');
            } else {
                let param = {
                    drugName: this.drugNameModel,
                    isMenstruum: this.isMenstruumModel === '是' ? 0 : 1
                };
                //新增药品 接口
                util.request(global.API_PREFIX + "/standardSpecification/addDrug", param
                ).then(function(response) {
                    if (response.data.code === 1) {
                        _this.$Message.success(response.data.mess);

                        _this.addModal = false;
                    } else {
                        _this.$Message.error(response.data.mess);
                    }
                });
            }
        },
        //关闭新增模态框
        cancelAdd () {
            this.addModal = false;
        },

        //同步药品库
        synchronizeDrugLibrary () {
            //同步药品库(模态框确认的回调)
            let synchronize = () => {
                let _this = this; 
                _this.spinShow = true;
                util.request(global.API_PREFIX + "/drugMatching/synchronization"
                ).then(function(response) {
                    if (response.data.code === 1) {
                        _this.$Message.success(response.data.mess);
                        _this.getList();
                    } else {
                        _this.$Message.error(response.data.mess);
                    }
                });
            };

            //模态框配置
            let config = {
                'title': '同步药品库',
                'content': '从HIS同步药品库',
                'okText': '确定',
                'cancelText': '取消',
                'onOk': synchronize
            };
            
            this.$Modal.confirm(config);
        },

        setParam () {
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
        drugClassifyChange () {
            this.getList();
            // console.log('this.drugClassifyModel: ', this.drugClassifyModel);
            // this.dataColumns.splice(this.dataColumns.length - 1, 1);
        },

        /**
         * [配置状态]改变时
         * 
         * @event Select#on-change
         */
        optionStatusChange () {
            //根据配置状态分类筛选
        },

        /**
         * 获取搜索框关键字
         * 
         * @event SearchInput#click
         * @param {String} value 返回的值
         */
        searchClick (value) {
            this.searchVal = value;
            //调用搜索接口
        },

        //获取药品分类 接口
        getDrugList () {
            let _this = this;
            util.request(global.API_PREFIX + "/drugClassify/getDrugList"
            ).then(function(response) {
                if (response.data.code === 1) {
                    //处理数据
                    let drugList = [];
                    response.data.data.list.forEach(function (el) {
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

        //获取药品列表 接口
        getList (param) {
            let _this = this;
            util.request(global.API_PREFIX + "/standardDrug/getList", param
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.dataList = response.data.data.list;
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },

        //获取页码数据
        getPageData (data) {

        }
    },
    created () {
        //[操作]鉴权处理
        // if ( ) {
        //     this.dataColumns.splice(this.dataColumns.length - 1, 1);
        // }
        
        //初始化数据
        this.getDrugList();
        this.getList();

        // let pageData = {  
        //     "currentPage": 1,
        //     "perPage": 20,
        //     "total": 6,
        //     "totalNum": 6
        // };
        // this.$refs.initPager.setPageParam(pageData);
    }
};
</script>
