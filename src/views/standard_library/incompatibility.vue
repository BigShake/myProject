<style scoped lang="less">
// 页面样式 css less
.ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner {
    border-color: #0bf3ac;
    background-color: #44e6d5;
}

.ivu-steps .ivu-steps-head-inner {
    display: block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin-right: 8px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 50%;
    font-size: 14px;
    transition: background-color .2s ease-in-out;
}
</style>

<template>
    <div>
        <div class="title-content-block">
            <div>
                <h2>配伍禁忌</h2>n
            </div>
        </div>
        <div style="padding: 18px 0;">
            <Button style="width: 100px;margin-right: 20px;" type="primary" @click="adderror()">新增</Button>
            <Select v-model="param.errorType" @on-change="errorTypeChange" style="width:100px;margin-right: 20px;" :clearable="true" placeholder="配伍类型">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="param.errorId" @on-change="errorIdChange" style="width:100px;margin-right: 20px;" :clearable="true" placeholder="配伍结果">
                <Option v-for="item in errorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <div style="float: right;margin-right: 10px;">
                <SearchInput placeholder="搜索" v-on:listen-search-change="changeSearchParam" v-on:listen-search-click="searchResultByKeyword"></SearchInput>
            </div>
        </div>
        <Modal v-model="isdelete" title="删除配伍禁忌" @on-ok="ok" @on-cancel="cancel">
            <p>是否删除该配伍禁忌</p>
            <div style="text-align:center;">
                <Button @click="ok()">确定</Button>
                <Button @click="cancel()">取消</Button>
            </div>
            <template slot="footer"></template>
        </Modal>
        <Pager ref="initPager" v-on:on-get-data="changePage">
            <Table :height="tableHeight" border :columns="dataColumns" :data="dataList"></Table>
        </Pager>
    </div>
</template>
<script>
import util from "../../libs/util";
export default {
    //定义变量
    data() {
        return {
            param: {
                errorId: null,
                errorType: null,
                keyWord: "",
                perPage: 20,
                currentPage: 1
            },
            typeList: [
                {
                    value: '0',
                    label: '药品对药品'
                },
                {
                    value: '1',
                    label: '药品对成分'
                },
                {
                    value: '2',
                    label: '成分对成分'
                }
            ],
            errorList: [
            ],
            isdelete: false,
            typemodel: '',
            resultmodel: '',
            dataColumns: [
                {
                    title: '编号',
                    key: 'id'
                },
                {
                    title: '药品/成分',
                    key: 'mainName'
                },
                {
                    title: '配伍药品/成分',
                    key: 'subName'
                },
                {
                    title: '配伍类型',
                    key: 'errorTypeName'
                },
                {
                    title: '配伍结果',
                    key: 'errorName'
                },
                {
                    title: '说明',
                    key: 'explain'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
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
                                        this.modifyincompatibility();
                                    }
                                }
                            }),
                            h('Button', {
                                props: {
                                    type: "text",
                                    icon: 'delete'
                                },
                                on: {
                                    click: () => {
                                        this.deleteClick(params.row);
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            dataList: [],
            option: {

            },
            deleteModelConfig: { //模态框
                title: "警告",
                content: "确认删除?",
                onOk: this.delete
            }
        };
    },
    computed: {
        tableHeight() {
            return util.getHeight();
        }
    },
    //定义方法
    methods: {
        delete() {
            let _this = this;
            let param = {
                "id": 0
            };
            util.request(global.API_PREFIX + "/incompatibility/deleteIngredients",
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
        modifyincompatibility() {
            this.$router.push("/modify_incompatibility");
        },
        //配伍结果改变事件
        errorIdChange() {
            this.param.currentPage = 1; //初始化搜索页面到第一页
            this.getDataList(); //获取药品列表
        },
        //配伍类型改变事件
        errorTypeChange() {
            this.param.currentPage = 1; //初始化搜索页面到第一页
            this.getDataList(); //获取药品列表

        },
        deleteCompatibility() {
            this.isdelete = true;
        },
        //改变页数事件
        changePage(data) {
            this.param.currentPage = data.currentPage; //获取当前页数
            this.param.perPage = data.perPage; //获取每页条数
            this.getDataList(); //获取药品列表
        },
        //改变搜索框
        changeSearchParam(val) {
            this.param.keyWord = val;
        },
        //点击搜索事件
        searchResultByKeyword() {
            this.param.currentPage = 1; //初始化搜索页面到第一页
            this.getDataList(); //获取药品列表
        },
        //获取配伍结果列表
        getErrorList() {
            let _this = this;
            util.request(global.API_PREFIX + "/errorType/getErrorType", {}
            ).then(function(response) {
                if (response.data.code === 1) {
                    //处理数据
                    _this.errorList = [];
                    response.data.data.forEach(function(el) {
                        _this.errorList.push({
                            value: el.id,
                            label: el.errorName
                        });
                    });
                } else {
                    _this.$Message.error(response.data.mess);
                }

            });
        },
        //获取配伍禁忌列表
        getDataList() {
            let _this = this;
            util.request(global.API_PREFIX + "/incompatibility/searchIncompatibility",
                _this.param
            ).then(function(response) {
                if (response.data.code === 1) {
                    //处理数据
                    _this.dataList = response.data.data.list;
                    let i = 0;
                    for (i = 0; i < _this.dataList.length; i++) {
                        _this.dataList[i].errorTypeName = _this.dataList[i].errorType === 0 ? "药品对药品" : (_this.dataList[i].errorType === 1 ? "药品对成分" : "成分对成分");
                    }
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
        adderror() {
            this.$router.push("/add_incompatibility");
        },
        //点击删除按钮
        deleteClick(val) {
            this.option = val;
            this.$Modal.confirm(this.deleteModelConfig);//调用模态框

        }
    },
    //初始化调用
    created() {
        this.getErrorList();
        this.getDataList();
    }
};
</script>
