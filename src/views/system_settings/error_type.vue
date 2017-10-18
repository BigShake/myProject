<style scoped lang="less">
// 页面样式 css less
</style>

<template>
    <div>
        <div class="title-content-block">
            <div>
                <h1 style="font-size:15px;">错误类型</h1>
            </div>
        </div>

        <!-- 按钮 -->
        <div style="padding: 20px 0 15px 0">
            <Button @click="addModalShow = true">新增</Button>
        </div>
        <!-- 列表展示 -->
        <Table :height="tableHeight" border :columns="dataColumns" :data="dataList"></Table>

        <!-- 新增弹框 -->
        <!-- v-model监听弹框的开启与关闭 -->
        <Modal v-model="addModalShow">
            <p slot="header">
                <span>新增</span>
            </p>
            <Form :model="addFormItem" :label-width="150">
                <FormItem label="名称：">
                    <Input v-model="addFormItem.errorName" style="width:250px;" :maxlength="64"></Input>
                </FormItem>
                <FormItem label="优先级：">
                    <Input v-model="addFormItem.priority" style="width:250px;" :maxlength="64"></Input>
                </FormItem>
                <FormItem label="颜色：">
                    <Col span="12">
                    <ColorPicker v-model="addFormItem.colors" recommend @on-change="colorChangeInAdd" />
                    </Col>
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
                <FormItem label="名称：">
                    <Input v-model="modFormItem.errorName" style="width:250px;" :maxlength="64"></Input>
                </FormItem>
                <FormItem label="优先级：">
                    <Input v-model="modFormItem.priority" style="width:250px;" :maxlength="64"></Input>
                </FormItem>
                <FormItem label="颜色：">
                    <Col span="12">
                    <ColorPicker v-model="modFormItem.colors" recommend @on-change="colorChangeInAdd" />
                    </Col>
                </FormItem>
                <input type="hidden" v-model="modFormItem.id" />
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
    //定义变量
    data() {
        return {
            addModalShow: false,
            modifyModalShow: false,

            dataColumns: [
                {
                    title: '编号',
                    key: 'id',
                    align: 'center'
                },
                {
                    title: '名称',
                    key: 'errorName',
                    align: 'center'
                },
                {
                    title: '优先级',
                    key: 'priority',
                    align: 'center'
                },
                {
                    title: '颜色',
                    key: 'colors',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('div', {
                                style: {
                                    background: (params.row.colors),
                                    width: '16px',
                                    height: '16px',
                                    margin: '0 auto',
                                    borderRadius: '8px'
                                }
                            }, '')
                        ]);
                    }
                },
                {/*  */
                    title: '操作',
                    key: 'action',
                    width: 200,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: "text",
                                    icon: 'edit'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.modifyErrorType(params.row);
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
                                        this.deleteErrorType(params.row.id);
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            //列表展示的数组
            dataList: [],
            addFormItem: {
                errorName: '',
                priority: '',
                colors: '#ffffff'
            },
            modFormItem: {
                id: '',
                errorName: '',
                priority: '',
                colors: ''
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
        okInAdd() {
            let _this = this;
            if (_this.addFormItem.errorName === '') {
                _this.$Message.error('请填写错误名称');
            } else if (_this.addFormItem.priority === '') {
                _this.$Message.error('请填写优先级');
            } else if (_this.addFormItem.colors === '') {
                _this.$Message.error('请选择颜色');
            } else {
                let params = {
                    "errorName": _this.addFormItem.errorName,
                    "priority": _this.addFormItem.priority,
                    "colors": _this.addFormItem.colors
                };
                util.request(global.API_PREFIX + "/drugKnowledge/errorType/addErrorType",
                    params
                ).then(function(response) {
                    if (response.data.code === "1" || response.data.code === 1) {
                        _this.$Message.success(response.data.mess);
                        _this.addModalShow = false;
                        _this.getErrorTypeList();
                        _this.clearAddFormItem();
                    } else {
                        _this.$Message.error(response.data.mess);
                    }
                });
            }
        },

        cancelInAdd() {
            let _this = this;
            _this.addModalShow = false;
            _this.clearAddFormItem();
        },
        okInModify() {
            let _this = this;
            if (_this.modFormItem.errorName === '') {
                _this.$Message.error('请填写错误名称');
            } else if (_this.modFormItem.priority === '') {
                _this.$Message.error('请填写优先级');
            } else if (_this.modFormItem.colors === '') {
                _this.$Message.error('请选择颜色');
            } else {
                let params = {
                    "id": _this.modFormItem.id,
                    "errorName": _this.modFormItem.errorName,
                    "priority": _this.modFormItem.priority,
                    "colors": _this.modFormItem.colors
                };
                util.request(global.API_PREFIX + "/drugKnowledge/errorType/updateErrorType",
                    params
                ).then(function(response) {
                    if (response.data.code === "1" || response.data.code === 1) {
                        _this.$Message.success(response.data.mess);
                        _this.modifyModalShow = false;
                        _this.getErrorTypeList();
                        _this.clearModFormItem();
                    } else {
                        _this.$Message.error(response.data.mess);
                    }
                });
            }
        },

        cancelInModify() {
            let _this = this;
            _this.modifyModalShow = false;
            _this.clearModFormItem();
        },
        modifyErrorType(obj) {
            let _this = this;
            _this.modifyModalShow = true;
            _this.modFormItem.id = obj.id;
            _this.modFormItem.errorName = obj.errorName;
            _this.modFormItem.priority = obj.priority;
            _this.modFormItem.colors = obj.colors;
        },
        deleteErrorType(id) {
            let deleteGroup = () => {
                let _this = this;
                let param = {
                    "id": id
                };
                util.request(global.API_PREFIX + "/drugKnowledge/errorType/deleteErrorType", param
                ).then(function(response) {
                    if (response.data.code === 1) {
                        _this.getErrorTypeList();
                        _this.$Message.success(response.data.mess);
                    } else {
                        _this.$Message.error(response.data.mess);
                    }
                });
            };
            //模态框配置
            let config = {
                'title': '删除错误类型',
                'content': '是否删除该错误类型?',
                'okText': '确认',
                'cancelText': '取消',
                'onOk': deleteGroup
            };

            this.$Modal.confirm(config);
        },
        getErrorTypeList() {
            let _this = this;
            util.request(global.API_PREFIX + "/drugKnowledge/errorType/getErrorType"
            ).then(function(response) {
                let dataList = response.data.data;
                _this.dataList = dataList;
            });
        },
        clearAddFormItem() {
            let _this = this;
            _this.addFormItem.errorName = "";
            _this.addFormItem.priority = "";
            _this.addFormItem.colors = "";
        },
        clearModFormItem() {
            let _this = this;
            _this.modFormItem.id = "";
            _this.modFormItem.errorName = "";
            _this.modFormItem.priority = "";
            _this.modFormItem.colors = "";
        },
        colorChangeInAdd(color) {
            let _this = this;
            _this.addFormItem.colors = color;
        },
        colorChangeInModify(color) {
            let _this = this;
            _this.modFormItem.colors = color;
        }
    },
    //初始化调用方法
    created() {
        this.getErrorTypeList();
    }
};
</script>
