<style scoped lang="less">
// 页面样式 css less

</style>

<template>
    <div>
        <div class="title-content-block">
            <div>
                <h1 style="font-size:15px;">人群划分</h1>
            </div>
        </div>
        <!-- 按钮 -->
        <div style="padding: 20px 0 5px 0">
            <Button @click="addCrowdClick">新增</Button>
        </div>
        <!-- 列表展示 -->
            <Table :height="tableHeight" border :columns="dataColumns" :data="dataList"></Table>
        <!-- 新增弹框 -->
        <!-- v-model监听弹框的开启与关闭 -->
        <Modal  
            v-model="addCrowdModel"
            title="新增">
            <div style="margin: auto;">
                <Form :model="addParam" :label-width="80" style="width: 80%;">
                    <FormItem label="人群名称">
                        <Input v-model="addParam.crowdname" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="年龄上限(天)">
                        <Input v-model="addParam.dayup" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="年龄下限(天)">
                        <Input v-model="addParam.daydown" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="年龄上限(年)">
                        <Input v-model="addParam.yearup" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="年龄下限(年)">
                        <Input v-model="addParam.yeardown" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="性别">
                        <RadioGroup v-model="addParam.sex">
                            <Radio label="1">男</Radio>
                            <Radio label="0">女</Radio>
                            <Radio label="3">不限</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="特殊人群">
                        <CheckboxGroup v-model="addParam.checkbox" @on-change="addParamCheckboxChange">
                            <Checkbox label="孕妇"></Checkbox>
                            <Checkbox label="哺乳人群"></Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" style="width:100px;" @click="addCrowdConfirmClick">确定</Button>
                        <Button type="primary" style="width:100px;" @click="addcancel">取消</Button>
                    </FormItem>
                </Form>
            </div>
            <template slot="footer"></template>
        </Modal>
        <!-- 修改弹框 -->
        <Modal  
            v-model="updateCrowdModel"
            title="修改">
                <div style="margin: auto;">
                    <Form :model="updateParam" :label-width="80" style="width: 80%;">
                    <FormItem label="人群名称">
                        <Input v-model="updateParam.crowdname" :value="updateParam.crowdname"  placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="年龄上限(天)">
                        <Input v-model="updateParam.dayup" :value="updateParam.dayup" :maxlength="5" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="年龄下限(天)">
                        <Input v-model="updateParam.daydown" :value="updateParam.daydown" :maxlength="5" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="年龄上限(年)">
                        <Input v-model="updateParam.yearup" :value="updateParam.yearup"  :maxlength="5" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="年龄下限(年)">
                        <Input v-model="updateParam.yeardown" :value="updateParam.yeardown"  :maxlength="5" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="性别">
                        <RadioGroup v-model="updateParam.sex">
                            <Radio label="1">男</Radio>
                            <Radio label="0">女</Radio>
                            <Radio label="3">不限</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="特殊人群">
                        <CheckboxGroup v-model="updateParam.checkbox" @on-change="updateParamCheckboxChange">
                            <Checkbox label="孕妇"></Checkbox>
                            <Checkbox label="哺乳人群"></Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" style="width:100px;" @click="updateCrowdConfirmClick">确定</Button>
                        <Button type="primary" style="width:100px;"  @click="updatecancel">取消</Button>
                    </FormItem>
                    </Form>
                </div>
                <template slot="footer"></template>
        </Modal>
    </div>
</template>

<script>
import util from "../../libs/util";
export default {
    //定义变量
    data () {
        return {
            deleteParam: {
                id: null
            },
            addParam: {
                crowdname: "",
                sex: 3,
                checkbox: [],
                yearup: "",
                yeardown: "",
                dayup: "",
                daydown: "",
                pregnancy: 0,
                lactation: 0,
                personType: ""
            },
            updateParam: {
                id: "",
                crowdname: "",
                sex: "",
                checkbox: [],
                yearup: "",
                yeardown: "",
                dayup: "",
                daydown: "",
                pregnancy: "",
                lactation: "",
                personType: ""
            },
            deleteModelConfig: { //模态框
                title: "警告",
                content: "确认要删除该人群？",
                onOk: this.deleteCrowdPost
            },
            addCrowdModel: false,
            updateCrowdModel: false,
            dataColumns: [
                {
                    title: '人群名称',
                    key: 'crowdname'
                },
                {
                    title: '年龄上限(天)',
                    key: 'dayup'
                },
                {
                    title: '年龄下限(天)',
                    key: 'daydown'
                },
                {
                    title: '年龄上限(年)',
                    key: 'yearup'
                },
                {
                    title: '年龄下限(年)',
                    key: 'yeardown'
                },
                {
                    title: '性别',
                    key: "sex"
                },
                {
                    title: '特殊人群',
                    key: "pregnancy"
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
                                    type: "text",
                                    icon: 'edit'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.updateInit(params.row);
                                        this.updateCrowdModel = true;

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
                                        this.deleteCrowdClick(params.row.id);
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            //列表展示的数组
            dataList: []
        };
    },
    computed: {
        tableHeight () {
            return util.getHeight();
        }
    },
    //定义方法
    methods: {
        addCrowdClick() {
            this.addCrowdModel = true;
            this.addParam = {
                crowdname: "",
                sex: 3,
                checkbox: [],
                yearup: "",
                yeardown: "",
                dayup: "",
                daydown: "",
                pregnancy: 0,
                lactation: 0,
                personType: ""
            };
        },
        deleteCrowdPost() {
            let _this = this;
            util.request(global.API_PREFIX + "/crowdKind/deleteCrowd",
                _this.deleteParam
            ).then(function(response) {
                if (response.data.code === "1" || response.data.code === 1) {
                    _this.$Message.success("删除成功");
                    _this.getListPost();
                } else {
                    _this.$Message.error(response.data.mess);
                    _this.getListPost();
                }
            });
        },
        addCrowdPost() {
            let _this = this;
            util.request(global.API_PREFIX + "/crowdKind/addCrowd",
                _this.addParam
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.$Message.success("新增成功");
                    _this.addCrowdModel = false;
                    _this.getListPost();
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },
        updateCrowdPost() {
            let _this = this;
            util.request(global.API_PREFIX + "/crowdKind/updateCrowd",
                _this.updateParam
            ).then(function(response) {
                if (response.data.code === 1) {
                    _this.$Message.success("修改成功");
                    _this.updateCrowdModel = false;
                    _this.getListPost();
                } else {
                    _this.$Message.error(response.data.mess);
                }
            });
        },
        updateInit(value) {
            this.updateParam = this.copyCrowd(value);           
        },
        copyCrowd(value) {
            let crowdDate = {};
            crowdDate.crowdname = value.crowdname;
            crowdDate.id = value.id;
            if (value.sex === "-") {
                crowdDate.sex = 3;
            } else if (value.sex === "男") {
                crowdDate.sex = 1;
            } else if (value.sex === "女") {
                crowdDate.sex = 0;
            }

            if (value.pregnancy === "-") {
                crowdDate.pregnancy = 0;
                crowdDate.lactation = 0;
                crowdDate.checkbox = [];
            } else if (value.pregnancy === "孕妇") {
                crowdDate.pregnancy = 1;
                crowdDate.lactation = 0;
                crowdDate.checkbox = ["孕妇"];
            } else if (value.pregnancy === "哺乳人群") {
                crowdDate.pregnancy = 0;
                crowdDate.lactation = 1;
                crowdDate.checkbox = ["哺乳人群"];
            }

            if (value.daydown === "-") {
                crowdDate.daydown = "";
            } else {
                crowdDate.daydown = value.daydown;
            }
            if (value.dayup === "-") {
                crowdDate.dayup = "";
            } else {
                crowdDate.dayup = value.dayup;
            }
            if (value.yeardown === "-") {
                crowdDate.yeardown = "";
            } else {
                crowdDate.yeardown = value.yeardown;
            }
            if (value.yearup === "-") {
                crowdDate.yearup = "";
            } else {
                crowdDate.yearup = value.yearup;
            }
            return crowdDate;

        },
        addParamCheckboxChange() {
            let length = this.addParam.checkbox.length - 1;
            if (this.addParam.checkbox.length > 1) {
                this.addParam.checkbox[0] = this.addParam.checkbox[length];
                this.addParam.checkbox.splice(1, length); 
            }
            length = this.addParam.checkbox.length;
            if (length === 0) {
                this.addParam.pregnancy = 0;
                this.addParam.lactation = 0;
            } else if (this.addParam.checkbox[0] === "孕妇") {
                this.addParam.pregnancy = 1;
                this.addParam.lactation = 0;
            } else if (this.addParam.checkbox[0] === "哺乳人群") {
                this.addParam.pregnancy = 0;
                this.addParam.lactation = 1;
            }
        },
        updateParamCheckboxChange() {
            let length = this.updateParam.checkbox.length - 1;
            if (this.updateParam.checkbox.length > 1) {
                this.updateParam.checkbox[0] = this.updateParam.checkbox[length];
                this.updateParam.checkbox.splice(1, length); 
            }
            length = this.updateParam.checkbox.length;
            if (length === 0) {
                this.updateParam.pregnancy = 0;
                this.updateParam.lactation = 0;
            } else if (this.updateParam.checkbox[0] === "孕妇") {
                this.updateParam.pregnancy = 1;
                this.updateParam.lactation = 0;
            } else if (this.updateParam.checkbox[0] === "哺乳人群") {
                this.updateParam.pregnancy = 0;
                this.updateParam.lactation = 1;
            }
        },
        deleteCrowdClick(id) {
            this.deleteParam.id = id;
            this.$Modal.confirm(this.deleteModelConfig);//调用模态框
        },
        addCrowdConfirmClick() {
            this.addCrowdPost();
           
        },
        addcancel() {
            this.addCrowdModel = false;

        },
        updateCrowdConfirmClick() {
            this.updateCrowdPost();
        },
        updatecancel() {
            this.updateCrowdModel = false;

        },
        AddCrowdModal(data) {
            let _this = this;
            _this.addCrowd = false;
        },
        cancleAddCrowdModal(data) {
            let _this = this;
            _this.addCrowd = false;
        },
        cancelAddModal (data) {
            if (data === false) {
                this.addCrowd = data;
            }
        },
        UpdateCrowdModal(data) {
            let _this = this;
            _this.UpdateCrowd = false;
        },
        cancleUpdateCrowdModal(data) {
            let _this = this;
            _this.UpdateCrowd = false;
        },
        cancelUpdateModal (data) {
            if (data === false) {
                this.UpdateCrowd = data;
            }
        },
        getListPost() {
            let _this = this;
            util.request(global.API_PREFIX + "/crowdKind/getList"
            ).then(function(response) {
                let dataList = response.data.data;
                dataList.forEach(function (el) {
                    if (el.dayup === null) {
                        el.dayup = "-";
                    }
                    if (el.daydown === null) {
                        el.daydown = "-";
                    }
                    if (el.yearup === null) {
                        el.yearup = "-";
                    }
                    if (el.yeardown === null) {
                        el.yeardown = "-";
                    }
                    if (el.pregnancy === 1) {
                        el.pregnancy = "孕妇";
                    } else if (el.lactation === 1) {
                        el.pregnancy = "哺乳人群";
                    } else {
                        el.pregnancy = "-";
                    }
                    if (el.sex === 1) {
                        el.sex = "男";
                    } else if (el.sex === 0) {
                        el.sex = "女";
                    } else {
                        el.sex = "-";
                    }
                });
                _this.dataList = dataList;
            });

        }
    },
    //初始化调用方法
    created () {
        this.getListPost();
    }
};
</script>
