//频次同步
<style lang="less" scoped>
.header-right-style {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.flex-line-canter {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>


<template>
    <div>
        <div class="title-content-block">
            <div>
                <h1 style="font-size:15px;">频次同步</h1>
            </div>
        </div>
        <div style="padding: 20px 0 5px 0">
            <Button @click="syncBtnClick()">同步频次</Button>
            <div style="float: right;">
                <SearchInput placeholder="搜索" v-on:listen-search-change="changeResultByKeyword" @listen-search-click="searchClick"></SearchInput>
            </div>
        </div>
        <div>
            <Pager style="padding-top:10px;" ref="initPager" v-on:on-get-data="changePage">
                <Table :height="tableHeight" border :columns="dataColumns" :data="dataList"></Table>
            </Pager>
        </div>
        <!-- v-model监听弹框的开启与关闭 -->
        <Modal v-model="modifyModalShow">
            <p slot="header">
                <span>修改频次</span>
            </p>
            <Form :model="modFormItem" :label-width="150">
                <FormItem label="每日次数：">
                    <Input v-model="modFormItem.dayTimes" class="myInput" style="width:250px;" :maxlength="64"></Input>
                </FormItem>
                <input type="hidden" v-model="modFormItem.pcCode" />
            </Form>
            <div slot="footer" style="text-align:center">
                <Button type="success" @click="okInModify">确定</Button>
                <Button type="ghost" @click="cancelInModify">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import util from "../../libs/util";
export default {
    data() {
        return {
            param: {
                perPage: 20,
                currentPage: 1,
                content: ""
            },
            modifyModalShow: false,
            modFormItem: {
                pcCode: '',
                dayTimes: ''
            },
            dataList: [],
            dataColumns: [
                {
                    title: '频次编号',
                    key: 'pcCode',
                    align: 'center'
                },
                {
                    title: '频次名称',
                    key: 'pcName',
                    align: 'center'
                },
                {
                    title: '每日次数',
                    key: 'dayTimes',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'operation',
                    align: 'center',
                    width: 200,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    icon: 'edit'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.modifyfrequency(params.row);
                                    }
                                }
                            })
                        ]);
                    }
                }
            ]
        };
    },
    computed: {
        tableHeight() {
            return util.getHeight();
        }
    },

    //定义方法
    methods: {
        //点击搜索框搜索按钮事件
        searchClick() {
            this.param.currentPage = 1; //初始化搜索页面到第一页
            this.getPcList();
        },
        changeResultByKeyword(value) {
            this.param.currentPage = 1; //初始化搜索页面到第一页
            this.param.content = value;
        },
        syncBtnClick() {
            var config = {
                title: "同步频次",
                content: "从HIS中同步频次",
                onOk: this.addok
            };
            this.$Modal.confirm(config);
        },
        //获取频次列表 接口
        getPcList(param) {
            let _this = this;
            util.request(global.API_PREFIX + "/drugKnowledge/frequency/getList", _this.param
            ).then(function(response) {
                if (response.data.code === 1) {
                    //处理数据
                    _this.dataList = response.data.data.list;
                    let pageData = {
                        "currentPage": response.data.data.currentPage,
                        "perPage": response.data.data.perPage,
                        "total": response.data.data.totalNum,
                        "totalNum": response.data.data.totalNum
                    };
                    _this.$refs.initPager.setPageParam(pageData);
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },
        addok() {
            let _this = this;
            util.request(global.API_PREFIX + "/drugKnowledge/frequency/synchronization"//频次同步接口
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.$Message.info("同步成功");
                    _this.getPcList();
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },
        cancel() {
            this.$Message.info('点击了取消');
        },
        modifyfrequency(obj) {
            this.modifyModalShow = true;
            this.modFormItem.pcCode = obj.pcCode;
            this.modFormItem.dayTimes = obj.dayTimes;
        },
        okInModify() {
            let _this = this;
            _this.modifyModalShow = false;
            let params = {
                "pcCode": _this.modFormItem.pcCode,
                "dayTimes": _this.modFormItem.dayTimes
            };
            util.request(global.API_PREFIX + "/drugKnowledge/frequency/updateFreq",
                params//修改频次接口
            ).then(function(response) {
                if (response.data.code === "1" || response.data.code === 1) {
                    _this.$Message.success(response.data.mess);
                    _this.getPcList();
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
            _this.modFormItem.pcCode = "";
            _this.modFormItem.dayTimes = "";
        },
        cancelInModify() {
            this.modifyModalShow = false;
            this.modFormItem.pcCode = "";
            this.modFormItem.dayTimes = "";
        },
        changePage(data) {
            this.param.currentPage = data.currentPage;
            this.param.perPage = data.perPage;
            this.getPcList();
        }
    },

    //初始化调用
    created() {
        this.getPcList();
    }
};
</script>
