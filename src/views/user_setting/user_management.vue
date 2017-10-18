<style scoped lang="less">

    .user_management {
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
           
            .btn-container {
                display: inline-flex;
                justify-content: flex-end;
                align-items: center ;

                .btn:not(:first-child) {
                    margin-left: 15px;
                }
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
    <div class="user_management">
        <div class="header-container">
            <div class="header-left">
                <Button class="left-item" @click="$router.push('/user_management/create_user')">创建用户</Button>
            </div>
            <div class="header-right">
                <SearchInput placeholder="搜索" @listen-search-click="searchClick"></SearchInput>
            </div>
        </div>
        <div class="content-container">
            <Pager ref="initPager">
                <Table :height="tableHeight" :columns="dataColumns" :data="dataList" :stripe="true" :border="true"></Table>
            </Pager>

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
                        <Input v-model="drugNameModel" :maxlength="64"></Input>
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
                    title: '编号',
                    key: 'id',
                    width: 120,
                    align: 'center'
                },
                {
                    title: '用户名',
                    key: 'account',
                    align: 'center'
                },
                {
                    title: '权限',
                    key: 'userType',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'operation',
                    width: 300,
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

        //展示所有用户 接口
        // "id": "1",
        // "account": "admin",
        // "retryCount": 0,
        // "userType": 1,
        // "delState": 0
        query (param) {
            let _this = this;
            util.request(global.API_PREFIX + "/user/query", param
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
        this.query();

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
