<style scoped lang="less">
// 页面样式 css less
.addBtnClass {
    width: 100px;
    line-height: 30px;
    span {
        font-size: 16px;
    }
}
</style>

<template>
    <div>
        <div class="title-content-block">
            <div>
                <h1 style="font-size:15px;">药品分类</h1>
            </div>
        </div>
        <div style="padding: 20px 0 5px 0">
            <Button @click="addModalShow = true">新增</Button>
            <div style="float: right;">
                <SearchInput placeholder="搜索" v-on:listen-search-change="changeResultByKeyword" @listen-search-click="searchClick"></SearchInput>
            </div>
        </div>
        <Pager style="padding-top:10px;" ref="initPager" v-on:on-get-data="changePage">
            <Table :height="tableHeight" border :columns="dataColumns" :data="dataList"></Table>
        </Pager>
        <Modal v-model="addModalShow">
            <p slot="header">
                <span>新增</span>
            </p>
            <Form :model="addFormItem" :label-width="150">
                <FormItem label="药品分类名：">
                    <Input v-model="addFormItem.classifyName" class="myInput" style="width:250px;" :maxlength="64"></Input>
                </FormItem>
            </Form>
            <div slot="footer" style="text-align:center">
                <Button type="success" @click="okInAdd">确定</Button>
                <Button type="ghost" @click="cancelInAdd">取消</Button>
            </div>
        </Modal>

        <Modal v-model="modifyModalShow">
            <p slot="header">
                <span>修改</span>
            </p>
            <Form :model="modFormItem" :label-width="150">
                <FormItem label="药品分类名：">
                    <Input v-model="modFormItem.classifyName" class="myInput" style="width:250px;" :maxlength="64"></Input>
                </FormItem>
                <input type="hidden" v-model="modFormItem.id" />
            </Form>
            <div slot="footer" style="text-align:center">
                <Button type="success" @click="okInModify">确定</Button>
                <Button type="ghost" @click="cancelInModify">取消</Button>
            </div>
        </Modal>
    </div>
    </div>
</template>

<script>
import util from "../../libs/util";
export default {
    //定义变量
    data() {
        return {
            param: {
                perPage: 20,
                currentPage: 1,
                content: ""
            },
            id: "",
            classifyName: "",
            addModalShow: false,
            modifyModalShow: false,
            dataColumns: [
                {
                    title: '编号',
                    key: 'id',
                    align: 'center',
                    width: '10%'
                },
                {
                    title: '药品分类名',
                    key: 'classifyName',
                    align: 'center',
                    width: '70%'
                },
                {
                    title: '操作',
                    key: 'action',
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
                                        this.modifyDrugClassify(params.row);
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
                                        this.deleteDrugClassify(params.row.id);
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            dataList: [],
            addFormItem: {
                classifyName: ''
            },
            modFormItem: {
                id: '',
                classifyName: ''
            }
        };
    },

    computed: {
        tableHeight() {
            return util.getHeight();
        }
    },
    //定义方法
    methods:
    {
        changeResultByKeyword(value) {
            this.param.currentPage = 1; //初始化搜索页面到第一页
            this.param.content = value;
        },
        searchClick() {
            this.param.currentPage = 1; //初始化搜索页面到第一页
            this.getDrugClassifyList();
        },
        okInAdd() {
            let _this = this;
            let params = {
                "classifyName": _this.addFormItem.classifyName
            };
            util.request(global.API_PREFIX + "/drugKnowledge/drugClassify/addDrugClassify",
                params
            ).then(function(response) {
                if (response.data.code === "1" || response.data.code === 1) {
                    _this.addModalShow = false;
                    _this.$Message.success(response.data.mess);
                    _this.getDrugClassifyList();
                    _this.addFormItem.classifyName = "";
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },
        cancelInAdd() {
            this.addModalShow = false;
            this.addFormItem.classifyName = "";
        },
        okInModify() {
            let _this = this;
            let params = {
                "id": _this.modFormItem.id,
                "classifyName": _this.modFormItem.classifyName
            };
            util.request(global.API_PREFIX + "/drugKnowledge/drugClassify/updateDrug",
                params
            ).then(function(response) {
                if (response.data.code === "1" || response.data.code === 1) {
                    _this.modifyModalShow = false;
                    _this.$Message.success(response.data.mess);
                    _this.getDrugClassifyList();
                    _this.modFormItem.id = "";
                    _this.modFormItem.classifyName = "";
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },
        cancelInModify() {
            this.modifyModalShow = false;
            this.modFormItem.id = "";
            this.modFormItem.classifyName = "";
        },
        modifyDrugClassify(obj) {
            this.modifyModalShow = true;
            this.modFormItem.id = obj.id;
            this.modFormItem.classifyName = obj.classifyName;
        },
        deleteDrugClassify(id) {
            let deleteGroup = () => {
                let _this = this;
                let param = {
                    "id": id
                };
                util.request(global.API_PREFIX + "/drugKnowledge/drugClassify/deleteDrug", param
                ).then(function(response) {
                    if (response.data.code === 1) {
                        _this.getDrugClassifyList();
                        _this.$Message.success(response.data.mess);
                    } else {
                        _this.$Message.error(response.data.mess);
                    }
                });
            };
            //模态框配置
            let config = {
                'title': '删除药品分类',
                'content': '是否删除该药品分类?',
                'okText': '确认',
                'cancelText': '取消',
                'onOk': deleteGroup
            };

            this.$Modal.confirm(config);
        },

        changePage(data) {
            this.param.currentPage = data.currentPage;
            this.param.perPage = data.perPage;
            this.getDrugClassifyList();
        },
        //获取频次列表 接口
        getDrugClassifyList() {
            let _this = this;
            util.request(global.API_PREFIX + "/drugKnowledge/drugClassify/getDrugList", _this.param
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
        }
    },

    //初始化调用
    created() {
        this.getDrugClassifyList();
    }
};
</script>
